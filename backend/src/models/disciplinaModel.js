
// "Banco de dados" em memória: um array. Na S5 vira SQLite.
let disciplinas = [];
let proximoId = 1;

export const disciplinaModel = {
  listar() {
    return disciplinas;
  },

  buscarPorId(id) {
    return disciplinas.find((d) => d.id === id) ?? null;
  },

  existeNomeNoPeriodo(nome, periodo, ignorarId = null) {
    return disciplinas.some(
      (d) =>
        d.nome === nome &&
        d.periodo === periodo &&
        d.id !== ignorarId
    );
  },

  inserir({ nome, professor, periodo }) {
    const nova = {
      id: proximoId++,
      nome,
      professor: professor ?? null,
      periodo,
    };

    disciplinas.push(nova);
    return nova;
  },

  atualizar(id, dados) {
    const i = disciplinas.findIndex((d) => d.id === id);
    if (i === -1) return null;

    disciplinas[i] = { ...disciplinas[i], ...dados, id };
    return disciplinas[i];
  },

  remover(id) {
    const antes = disciplinas.length;
    disciplinas = disciplinas.filter((d) => d.id !== id);
    return disciplinas.length < antes;
  },
};
