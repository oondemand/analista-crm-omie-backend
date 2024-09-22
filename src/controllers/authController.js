const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

// Autenticar usuário
exports.autenticarUsuario = async (req, res) => {
  console.log("Autenticando usuário...");
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) return res.status(401).json({ message: "Usuário não encontrado" });

    if (usuario.status !== "ativo") return res.status(401).json({ message: "Usuário inativo" });

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    // Gera token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao autenticar", error });
  }
};

exports.registrarPrimeiroUsuario = async (req, res) => {
  const { nome, email, senha, status, permissoes } = req.body;
  try {
    // Verificar se existe algum usuário ativo
    const usuarioAtivo = await Usuario.findOne({ status: "ativo" });
    if (usuarioAtivo) {
      return res.status(400).json({ error: "Já existe um usuário ativo" });
    }

    // Criar e salvar o novo usuário
    const novoUsuario = new Usuario({ nome, email, senha, status, permissoes });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao registrar usuário" });
  }
};
