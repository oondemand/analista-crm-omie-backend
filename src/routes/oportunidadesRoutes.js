const express = require("express");

const { listarOportunidades } = require("../controllers/oportunidadesController");

const router = express.Router();

router.get("/", listarOportunidades);

module.exports = router;
