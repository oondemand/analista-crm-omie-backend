const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");

router.get("/", logController.listarLogs);
router.delete("/limpar-todos", logController.limparLogs);

module.exports = router;
