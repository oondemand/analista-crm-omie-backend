const axios = require("axios");
const Queue = require("bull");
const { client, connect } = require("../config/redis");

// Criar fila de oportunidades
const oportunidadesQueue = new Queue("oportunidades", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Processa a fila
oportunidadesQueue.process(1, async (job, done) => {
  const start = Date.now(); // Iniciar cronômetro do job
  const { baseOmie, atualizarCache, params } = job.data;
  const url = "https://app.omie.com.br/api/v1/crm/oportunidades/";
  const requestBody = {
    call: "ListarOportunidades",
    app_key: baseOmie.appKey,
    app_secret: baseOmie.appSecret,
    param: params,
  };

  const cacheKey = `oportunidades_cache_${baseOmie._id}_${params[0].pagina}_${params[0].registros_por_pagina}`;

  try {
    console.log("Iniciando processamento do job:", job.id);

    // Verifica se os dados estão no cache, apenas se atualizarCache for false
    if (!atualizarCache) {
      const cachedData = await client.get(cacheKey);
      if (cachedData) {
        console.log("Dados encontrados no cache.");
        return done(null, JSON.parse(cachedData)); // Retorna os dados do cache
      }
    }

    console.log("Requisição para:", url);
    console.log("Corpo da requisição:", JSON.stringify(requestBody, null, 2));

    const response = await axios.post(url, requestBody);

    console.log("Resposta da API recebida");

    // Armazena a resposta em cache por 1 minuto
    await client.setex(cacheKey, 60, JSON.stringify(response.data));
    console.log("Resultado armazenado no cache.");

    console.log(`Job ${job.id} processado com sucesso.`);
    done(null, response.data); // Finaliza o job com sucesso
  } catch (error) {
    console.error(`Erro ao processar o job ${job.id}:`, error.message);
    done(new Error(`Erro ao processar a fila de oportunidades: ${error.message}`));
  }
});

// Eventos de completude e falha
oportunidadesQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} finalizado com sucesso.`);
});

oportunidadesQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} falhou com erro: ${err.message}`);
});

module.exports = oportunidadesQueue;
