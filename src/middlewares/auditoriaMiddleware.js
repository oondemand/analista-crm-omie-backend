const Log = require("../models/Log"); // Modelo de log para salvar no MongoDB

const auditoriaMiddleware = async (req, res, next) => {
  try {
    // Ignorar get 200
    if (req.method === "GET" && res.statusCode === 200) return next();

    const log = new Log({
      metodo: req.method,
      url: req.originalUrl,
      ip: req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      dadosRequisicao: req.body || {}, // Captura o corpo da requisição
      usuarioId: req.user ? req.user.id : null, // Se houver autenticação, captura o ID do usuário
    });

    // Registra o status da resposta
    const originalSend = res.send;
    res.send = function (body) {
      log.statusResposta = res.statusCode;
      log.dadosResposta = body;
      log
        .save()
        .then(() => console.log("Log salvo com sucesso."))
        .catch((error) => console.error("Erro ao salvar log:", error));
      originalSend.apply(res, arguments);
    };

    next();
  } catch (error) {
    console.error("Erro no middleware de auditoria:", error);
    next();
  }
};

module.exports = auditoriaMiddleware;
