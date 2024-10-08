const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha, status, permissoes } = req.body;
  try {
    // Verifica se há algum usuário ativo no banco de dados
    const usuarioAtivo = await Usuario.findOne({ status: "ativo" });

    if (usuarioAtivo) {
      return res.status(400).json({ error: "Já existe um usuário ativo no sistema" });
    }

    // Cria um novo usuário se não houver nenhum usuário ativo
    const novoUsuario = new Usuario({ nome, email, senha, status, permissoes });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao registrar usuário" });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(400).json({ error: "Erro ao listar usuários" });
  }
};

exports.obterUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao obter usuário" });
  }
};

exports.atualizarUsuario = async (req, res) => {
  const { nome, email, status, permissoes } = req.body;
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nome, email, status, permissoes },
      { new: true }
    );
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
};

exports.excluirUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir usuário" });
  }
};