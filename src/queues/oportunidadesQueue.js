const Queue = require('bull');
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Criar fila de oportunidades
const oportunidadesQueue = new Queue('oportunidades', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Processa a fila, com no máximo 3 chamadas simultâneas
oportunidadesQueue.process(3, async (job, done) => {
  const { baseOmie, params } = job.data;

  try {
    const response = await axios.post('https://app.omie.com.br/api/v1/crm/oportunidades/', {
      call: 'ListarOportunidades',
      app_key: baseOmie.appKey,
      app_secret: baseOmie.appSecret,
      param: params,
    });

    // Armazena a resposta em cache por 1 minuto
    client.setex(`oportunidades_cache_${baseOmie._id}`, 60, JSON.stringify(response.data));

    done(null, response.data);  // Finaliza o job com sucesso
  } catch (error) {
    done(new Error('Erro ao processar a fila de oportunidades.'));
  }
});

module.exports = oportunidadesQueue;
