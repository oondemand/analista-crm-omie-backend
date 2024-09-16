const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
}, { timestamps: true });

// Antes de salvar, faz o hash da senha
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Verifica se a senha está correta
usuarioSchema.methods.compararSenha = async function (senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
