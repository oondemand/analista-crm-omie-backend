const express = require("express");
const {
  criarUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario,
} = require("../controllers/usuarioController");

const router = express.Router();

// Rotas de usuário protegidas pelo middleware de autenticação
router.post("/", criarUsuario); // Criar novo usuário
router.get("/", listarUsuarios); // Listar todos os usuários
router.put("/:id", atualizarUsuario); // Atualizar um usuário
router.delete("/:id", deletarUsuario); // Deletar um usuário

module.exports = router;
