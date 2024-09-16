const mongoose = require('mongoose');
const crypto = require('crypto');

const tokenPermanenteSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  token: { type: String, required: true, unique: true, length: 32 },
}, { timestamps: true });

// Gera um token de 32 caracteres automaticamente antes de salvar
tokenPermanenteSchema.pre('save', function (next) {
  if (!this.token) {
    this.token = crypto.randomBytes(16).toString('hex'); // Gera um token de 32 caracteres
  }
  next();
});

module.exports = mongoose.model('TokenPermanente', tokenPermanenteSchema);
