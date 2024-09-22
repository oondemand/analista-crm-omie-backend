const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  metodo: String,
  url: String,
  ip: String,
  dadosRequisicao: mongoose.Schema.Types.Mixed,
  usuarioId: mongoose.Schema.Types.ObjectId,
  statusResposta: Number,
  dadosResposta: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now, expires: "30d" }, // Expira após 30 dias
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
