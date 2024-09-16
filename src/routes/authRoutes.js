const express = require('express');
const { gerarToken, autenticarUsuario } = require('../controllers/authController');
const router = express.Router();

router.post('/gerar-token', gerarToken);
router.post('/login', autenticarUsuario);

module.exports = router;
