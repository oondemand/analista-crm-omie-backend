const BaseOmie = require("../models/BaseOmie");

// Middleware para verificar o ID da baseOmie Omie no header
const authOmieMiddleware = async (req, res, next) => {
  try {
    const baseOmieId = req.query["base_omie"]; // ID da baseOmie enviado na query

    if (!baseOmieId)
      return res.status(400).json({ message: "ID da baseOmie não fornecido na query" });

    // Busca a base Omie pelo ID da baseOmie
    const baseOmie = await BaseOmie.findById(baseOmieId);

    if (!baseOmie)
      return res.status(404).json({ message: "Base Omie não encontrada para o ID fornecido" });

    // Adiciona a base Omie encontrada ao objeto req para uso posterior
    req.baseOmie = baseOmie;
    next();
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar o acesso da baseOmie", error });
  }
};

module.exports = authOmieMiddleware;
