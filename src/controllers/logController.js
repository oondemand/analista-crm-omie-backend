const Log = require("../models/Log");

// Listar todos os logs com paginação
exports.listarLogs = async (req, res) => {
  const { pagina = 1, registros_por_pagina = 50 } = req.query;

  try {
    const logs = await Log.find()
      .sort({ createdAt: -1 })
      .skip((pagina - 1) * registros_por_pagina)
      .limit(parseInt(registros_por_pagina));

    const totalLogs = await Log.countDocuments();

    res.json({
      logs,
      totalLogs,
      pagina: parseInt(pagina),
      registros_por_pagina: parseInt(registros_por_pagina),
      totalPaginas: Math.ceil(totalLogs / registros_por_pagina),
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar logs", error });
  }
};

// Limpar todos os logs
exports.limparLogs = async (req, res) => {
  try {
    await Log.deleteMany({});
    res.json({ message: "Todos os logs foram removidos" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao limpar logs", error });
  }
};
