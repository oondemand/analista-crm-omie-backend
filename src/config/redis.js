require('dotenv').config();
const Redis = require('ioredis');

const client = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.on('error', (err) => {
  console.error('Erro no cliente Redis:', err);
});

const connect = async () => {
  if (client.status === 'ready') {
    console.log('Conectado ao Redis');
    return;
  }

  client.once('connect', () => {
    console.log('Conectado ao Redis');
  });

  client.once('error', (err) => {
    console.error('Erro ao conectar ao Redis:', err);
  });

  await client.connect();
};

module.exports = { client, connect };