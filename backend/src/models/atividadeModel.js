
let atividades = [];
let proximoId = 1;

export const atividadeModel = {
  listar(disciplinaId = null) {
    if (disciplinaId === null) return atividades;

    return atividades.filter(
      (a) => a.disciplinaId === disciplinaId
    );
  },

  buscarPorId(id) {
    return atividades.find((a) => a.id === id) ?? null;
  },

  inserir({ titulo, tipo, dataPrazo, status, disciplinaId }) {
    const nova = {
      id: proximoId++,
      titulo,
      tipo,
      dataPrazo,
      status: status ?? 'PENDENTE',
      disciplinaId,
    };

    atividades.push(nova);
    return nova;
  },

  atualizar(id, dados) {
    const i = atividades.findIndex((a) => a.id === id);
    if (i === -1) return null;

    atividades[i] = { ...atividades[i], ...dados, id };
    return atividades[i];
  },

  remover(id) {
    const antes = atividades.length;
    atividades = atividades.filter((a) => a.id !== id);
    return atividades.length < antes;
  },
};
