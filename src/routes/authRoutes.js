const express = require('express');
const authController = require('../controllers/authController');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post('/login', authController.autenticarUsuario);
router.post('/primeiro-cadastro', authController.registrarPrimeiroUsuario);

module.exports = router;
