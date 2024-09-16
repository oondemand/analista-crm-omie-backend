const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Criar o primeiro token automaticamente se não houver nenhum
exports.gerarToken = async (req, res) => {
  try {
    // Verifica se há tokens no banco de dados
    const tokenExistente = await TokenPermanente.findOne();
    if (tokenExistente) {
      return res.status(400).json({ message: 'Já existe um token registrado.' });
    }

    // Cria o primeiro token automaticamente
    const primeiroToken = new TokenPermanente({
      descricao: 'Primeiro token gerado automaticamente',
    });
    await primeiroToken.save();

    res.status(201).json({
      message: 'Primeiro token criado com sucesso.',
      token: primeiroToken.token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o primeiro token', error });
  }
};

// Autenticar usuário
exports.autenticarUsuario = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ login });

    if (!usuario || usuario.status === 'inativo') {
      return res.status(401).json({ message: 'Usuário inativo ou não encontrado' });
    }

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gera token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao autenticar', error });
  }
};
