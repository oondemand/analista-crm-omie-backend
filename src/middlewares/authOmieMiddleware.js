const BaseOmie = require('../models/baseOmie');

// Middleware para verificar o nome da empresa Omie no header
const authOmieMiddleware = async (req, res, next) => {
  try {
    const empresaNome = req.headers['x-omie-empresa'];  // Nome da empresa enviado no header

    if (!empresaNome) {
      return res.status(400).json({ message: 'Nome da empresa não fornecido no header' });
    }

    // Busca a base Omie pelo nome da empresa
    const baseOmie = await BaseOmie.findOne({ nome: empresaNome });

    if (!baseOmie) {
      return res.status(404).json({ message: 'Base Omie não encontrada para a empresa fornecida' });
    }

    // Adiciona a base Omie encontrada ao objeto req para uso posterior
    req.baseOmie = baseOmie;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar o acesso da empresa', error });
  }
};

module.exports = authOmieMiddleware;
