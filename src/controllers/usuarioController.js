const Usuario = require('../models/Usuario');

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
  try {
    const { login, senha, status } = req.body;
    
    // Verifica se o login já existe
    const usuarioExistente = await Usuario.findOne({ login });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const novoUsuario = new Usuario({ login, senha, status });
    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários', error });
  }
};

// Atualizar um usuário por ID
exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { login, senha, status } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualiza os campos
    if (login) usuario.login = login;
    if (status) usuario.status = status;
    if (senha) usuario.senha = senha; // O hook 'pre' salvará a senha criptografada

    await usuario.save();
    res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};

// Deletar um usuário por ID
exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
};
