const express = require("express");
const {
  criarLicao,
  listarLicoes,
  atualizarLicao,
  deletarLicao,
} = require("../controllers/licaoAprendidaController");

const router = express.Router();

// Rotas protegidas pelo middleware de autenticação
router.post("/", criarLicao); // Criar uma nova lição aprendida
router.get("/", listarLicoes); // Listar todas as lições aprendidas
router.put("/:id", atualizarLicao); // Atualizar uma lição aprendida
router.delete("/:id", deletarLicao); // Deletar uma lição aprendida

module.exports = router;
