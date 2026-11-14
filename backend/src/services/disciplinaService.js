
import { disciplinaModel } from '../models/disciplinaModel.js';
import { erro } from '../utils/erro.js';

export const disciplinaService = {
  listar() {
    return disciplinaModel.listar();
  },

  buscarPorId(id) {
    const disciplina = disciplinaModel.buscarPorId(id);
    if (!disciplina) throw erro(404, 'Disciplina não encontrada');
    return disciplina;
  },

  criar({ nome, professor, periodo } = {}) {
    // Regra 1: nome e periodo são obrigatórios
    if (!nome || !periodo) {
      throw erro(400, 'Campos "nome" e "periodo" são obrigatórios');
    }

    // Regra 2: não pode repetir nome no mesmo período
    if (disciplinaModel.existeNomeNoPeriodo(nome, periodo)) {
      throw erro(409, 'Já existe uma disciplina com este nome neste período');
    }

    return disciplinaModel.inserir({ nome, professor, periodo });
  },

  atualizar(id, dados = {}) {
    const disciplina = disciplinaModel.buscarPorId(id);
    if (!disciplina) throw erro(404, 'Disciplina não encontrada');

    const dadosAtualizados = { ...disciplina, ...dados };

    // Regra 1: nome e periodo continuam obrigatórios
    if (!dadosAtualizados.nome || !dadosAtualizados.periodo) {
      throw erro(400, 'Campos "nome" e "periodo" são obrigatórios');
    }

    // Regra 2: não pode repetir nome no mesmo período
    if (
      disciplinaModel.existeNomeNoPeriodo(
        dadosAtualizados.nome,
        dadosAtualizados.periodo,
        id
      )
    ) {
      throw erro(409, 'Já existe uma disciplina com este nome neste período');
    }

    return disciplinaModel.atualizar(id, dadosAtualizados);
  },

  remover(id) {
    const removido = disciplinaModel.remover(id);
    if (!removido) throw erro(404, 'Disciplina não encontrada');
  },
};
