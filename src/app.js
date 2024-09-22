const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const YAML = require("yamljs");
const path = require("path");

const app = express();
const schemaOpenAPI = YAML.load(path.join(__dirname, "./schemaOpenAPI.yaml"));

app.use(cors());
app.use(express.json());
app.use(helmet());

// Middleware morgan com a função de filtro
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rota raiz para verificar o status do serviço
app.use("/", require("./routes/statusRoutes"));

// Usar o schemaOpenAPI.yaml como documentação da API
app.use("/open-api", (req, res) => {
  res.json(schemaOpenAPI);
});

// Rotas de autenticação
app.use("/auth", require("./routes/authRoutes"));

// Middleware
const authMiddleware = require("./middlewares/authMiddleware");
const auditoriaMiddleware = require("./middlewares/auditoriaMiddleware");
const authOmieMiddleware = require("./middlewares/authOmieMiddleware");

app.use(authMiddleware);
app.use(auditoriaMiddleware);

// Rotas de oportunidades, base Omie e tokens permanentes
app.use("/oportunidades", authOmieMiddleware, require("./routes/oportunidadesRoutes"));
app.use("/base-omies", require("./routes/baseOmieRoutes"));
app.use("/usuarios", require("./routes/usuarioRoutes"));
app.use("/licoes-aprendidas", require("./routes/licaoAprendidaRoutes"));
app.use("/logs", require("./routes/logRoutes"));

module.exports = app;
