const express = require('express');

const authOmieMiddleware = require('../middlewares/authOmieMiddleware');
const rateLimiterMiddleware = require('../middlewares/rateLimiterMiddleware');
const { listarOportunidades } = require('../controllers/oportunidadesController');

const router = express.Router();

router.get('/', authOmieMiddleware, rateLimiterMiddleware, listarOportunidades);

module.exports = router;
