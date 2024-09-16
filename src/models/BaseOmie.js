const mongoose = require('mongoose');

const baseOmieSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true },
  appKey: { type: String, required: true },
  appSecret: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('BaseOmie', baseOmieSchema);
