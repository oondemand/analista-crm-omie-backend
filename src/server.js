require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { connect: connectRedis } = require("./config/redis");

const PORT = process.env.PORT || 4000;
const SERVICE_NAME = process.env.SERVICE_NAME || "MeuServico";

// Inicia o servidor
app.listen(PORT, async () => {
  console.log("");
  console.log(`******** Iniciando serviço ${SERVICE_NAME} ********`);
  console.log("");

  try {
    await connectDB(); // Conecta ao banco de dados

    await connectRedis(); // Conecta ao Redis

    console.log(`Serviço iniciado`);
    console.log("");
    console.log(`****** ${SERVICE_NAME} rodando na porta ${PORT} ******`);
  } catch (err) {
    console.error("Erro ao iniciar o serviço:", err);
  }
});