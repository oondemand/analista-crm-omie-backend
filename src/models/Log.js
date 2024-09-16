const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  metodo: { type: String, required: true },
  url: { type: String, required: true },
  ip: { type: String, required: true },
  dadosRequisicao: { type: Object, required: true },
  dadosResposta: { type: Object },
  statusResposta: { type: Number },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },  // Opcional, se houver autenticação
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
