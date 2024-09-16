const TokenPermanente = require('../models/TokenPermanente');

// Criar um novo token permanente
exports.criarTokenPermanente = async (req, res) => {
  try {
    const { descricao } = req.body;
    const tokenPermanente = new TokenPermanente({ descricao });
    await tokenPermanente.save();
    res.status(201).json({ token: tokenPermanente.token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar token permanente', error });
  }
};

// Listar todos os tokens
exports.listarTokens = async (req, res) => {
  try {
    const tokens = await TokenPermanente.find();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar tokens', error });
  }
};

// Deletar um token permanente
exports.deletarTokenPermanente = async (req, res) => {
  try {
    const { id } = req.params;
    const token = await TokenPermanente.findByIdAndDelete(id);
    if (!token) {
      return res.status(404).json({ message: 'Token não encontrado' });
    }
    res.status(200).json({ message: 'Token deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar token', error });
  }
};
