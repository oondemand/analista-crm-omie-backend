const oportunidadesQueue = require('../queues/oportunidadesQueue');
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

exports.listarOportunidades = async (req, res) => {
  const { baseOmie } = req;
  const cacheKey = `oportunidades_cache_${baseOmie._id}`;

  // Verifica se há cache disponível
  client.get(cacheKey, (err, data) => {
    if (err) throw err;

    if (data) {
      // Retorna a resposta do cache se estiver disponível
      return res.status(200).json(JSON.parse(data));
    } else {
      // Adiciona o trabalho na fila
      const params = [{ pagina: 1, registros_por_pagina: 50 }];

      oportunidadesQueue.add({ baseOmie, params });

      // Retorna uma resposta inicial enquanto o job está na fila
      res.status(202).json({ message: 'A solicitação está sendo processada.' });
    }
  });
};
