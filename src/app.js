const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swagger");
const app = express();

app.use(cors());
app.use(express.json());

// Rota raiz para verificar o status do serviço
app.use("/", require("./routes/statusRoutes"));

// Rota Swagger para a documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas de autenticação
app.use("/auth", require("./routes/authRoutes"));

// Middleware de autenticação e auditoria
app.use(require("./middlewares/authTokenMiddleware"));
app.use(require("./middlewares/auditoriaMiddleware"));

// Rotas de oportunidades, base Omie e tokens permanentes
app.use("/oportunidades", require("./routes/oportunidadesRoutes"));
app.use("/base-omies", require("./routes/baseOmieRoutes"));
app.use("/tokens", require("./routes/tokenRoutes"));
app.use("/usuarios", require("./routes/usuarioRoutes"));
app.use("/licoes-aprendidas", require("./routes/licaoAprendidaRoutes"));

module.exports = app;
