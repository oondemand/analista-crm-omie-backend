const oportunidadesQueue = require("../queues/oportunidadesQueue");

exports.listarOportunidades = async (req, res) => {
  console.log("Iniciando listagem de oportunidades");

  const { baseOmie } = req; // Supondo que baseOmie vem do middleware
  const { pagina = 1, registros_por_pagina = 50, atualizar_cache: atualizarCache = false } = req.query; // Extraindo parâmetros da query

  try {
    // Adiciona o job na fila de oportunidades
    const params = [{ pagina, registros_por_pagina }];
    console.log(
      `Adicionando job na fila: página ${pagina}, registros por página ${registros_por_pagina}, atualizar cache ${atualizarCache}`
    );

    const job = await oportunidadesQueue.add({ baseOmie, atualizarCache, params });

    // Aguardar a conclusão do job
    console.log("Aguardando a conclusão do job...");
    const result = await job.finished();

    console.log("Job finalizado com sucesso. Enviando resposta.");
    res.status(200).json(result);
  } catch (err) {
    console.error("Erro ao listar oportunidades:", err.message);
    res.status(500).json({ error: "Erro ao listar oportunidades" });
  }
};
