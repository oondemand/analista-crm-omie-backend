const LicaoAprendida = require('../models/LicaoAprendida');

// Criar uma nova lição aprendida
exports.criarLicao = async (req, res) => {
  try {
    const { categoria, titulo, conteudo, resumo } = req.body;
    const usuarioId = req.usuario.id; // Obtém o ID do usuário autenticado

    const novaLicao = new LicaoAprendida({
      categoria,
      titulo,
      conteudo,
      resumo,
      usuario: usuarioId,
    });

    await novaLicao.save();
    res.status(201).json({ message: 'Lição aprendida criada com sucesso', licao: novaLicao });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar lição aprendida', error });
  }
};

// Listar todas as lições aprendidas
exports.listarLicoes = async (req, res) => {
  try {
    const licoes = await LicaoAprendida.find().populate('usuario', 'login');
    res.status(200).json(licoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar lições aprendidas', error });
  }
};

// Atualizar uma lição aprendida por ID
exports.atualizarLicao = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria, titulo, conteudo, resumo } = req.body;

    const licao = await LicaoAprendida.findById(id);
    if (!licao) {
      return res.status(404).json({ message: 'Lição aprendida não encontrada' });
    }

    licao.categoria = categoria || licao.categoria;
    licao.titulo = titulo || licao.titulo;
    licao.conteudo = conteudo || licao.conteudo;
    licao.resumo = resumo || licao.resumo;

    await licao.save();
    res.status(200).json({ message: 'Lição aprendida atualizada com sucesso', licao });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar lição aprendida', error });
  }
};

// Deletar uma lição aprendida por ID
exports.deletarLicao = async (req, res) => {
  try {
    const { id } = req.params;

    const licao = await LicaoAprendida.findByIdAndDelete(id);
    if (!licao) {
      return res.status(404).json({ message: 'Lição aprendida não encontrada' });
    }

    res.status(200).json({ message: 'Lição aprendida deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar lição aprendida', error });
  }
};
