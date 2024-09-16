const BaseOmie = require('../models/baseOmie');

// Criar uma nova base Omie
exports.criarBaseOmie = async (req, res) => {
  try {
    const { nome, cnpj, appKey, appSecret, tokens } = req.body;
    const novaBase = new BaseOmie({ nome, cnpj, appKey, appSecret, tokens });
    await novaBase.save();
    res.status(201).json(novaBase);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a base Omie', error });
  }
};

// Listar todas as bases Omie
exports.listarBasesOmie = async (req, res) => {
  try {
    const bases = await BaseOmie.find();
    res.status(200).json(bases);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar as bases Omie', error });
  }
};

// Atualizar uma base Omie por ID
exports.atualizarBaseOmie = async (req, res) => {
  try {
    const { id } = req.params;
    const baseAtualizada = await BaseOmie.findByIdAndUpdate(id, req.body, { new: true });
    if (!baseAtualizada) {
      return res.status(404).json({ message: 'Base Omie não encontrada' });
    }
    res.status(200).json(baseAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a base Omie', error });
  }
};

// Deletar uma base Omie por ID
exports.deletarBaseOmie = async (req, res) => {
  try {
    const { id } = req.params;
    const baseRemovida = await BaseOmie.findByIdAndDelete(id);
    if (!baseRemovida) {
      return res.status(404).json({ message: 'Base Omie não encontrada' });
    }
    res.status(200).json({ message: 'Base Omie deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a base Omie', error });
  }
};
