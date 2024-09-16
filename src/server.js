require("dotenv").config();

const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 4000;
const SERVICE_NAME = process.env.SERVICE_NAME || "MeuServico";

// Inicia o servidor
app.listen(PORT, async () => {
  console.log(`Iniciando serviço ${SERVICE_NAME}...`);

  await connectDB(); // Conecta ao banco de dados

  console.log(`${SERVICE_NAME} rodando na porta ${PORT} e conectado ao MongoDB`);
});

// Listener para eventos da fila (opcional)
const oportunidadesQueue = require("./queues/oportunidadesQueue");
oportunidadesQueue.on("completed", (job, result) => {
  console.log(`Job finalizado: ${job.id} com resultado: ${JSON.stringify(result)}`);
});

oportunidadesQueue.on("failed", (job, err) => {
  console.error(`Job falhou: ${job.id} com erro: ${err.message}`);
});
