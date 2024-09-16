const express = require('express');
const { criarTokenPermanente, listarTokens, deletarTokenPermanente } = require('../controllers/tokenController');
const router = express.Router();

// Rotas para gerenciar tokens permanentes
router.post('/', criarTokenPermanente);
router.get('/', listarTokens);
router.delete('/:id', deletarTokenPermanente);

module.exports = router;
