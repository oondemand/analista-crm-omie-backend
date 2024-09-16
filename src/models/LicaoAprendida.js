const mongoose = require('mongoose');

const licaoAprendidaSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  resumo: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Referência ao usuário que adicionou
}, { timestamps: true });

module.exports = mongoose.model('LicaoAprendida', licaoAprendidaSchema);
