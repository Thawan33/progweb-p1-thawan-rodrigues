
import { atividadeModel } from '../models/atividadeModel.js';
import { disciplinaModel } from '../models/disciplinaModel.js';
import { erro } from '../utils/erro.js';

const TIPOS_VALIDOS = ['TRABALHO', 'PROVA', 'SEMINARIO'];

export const atividadeService = {
  listar(disciplinaId) {
    if (disciplinaId !== undefined) {
      const id = Number(disciplinaId);

      if (!Number.isInteger(id) || id <= 0) {
        throw erro(400, 'disciplinaId deve ser um número válido');
      }

      return atividadeModel.listar(id);
    }

    return atividadeModel.listar();
  },

  buscarPorId(id) {
    const atividade = atividadeModel.buscarPorId(id);
    if (!atividade) throw erro(404, 'Atividade não encontrada');

    return atividade;
  },

  criar({ titulo, tipo, dataPrazo, status, disciplinaId } = {}) {
    // Regra 1: campos obrigatórios
    if (!titulo || !tipo || !dataPrazo || disciplinaId === undefined) {
      throw erro(
        400,
        'Campos "titulo", "tipo", "dataPrazo" e "disciplinaId" são obrigatórios'
      );
    }

    // Regra 2: tipo deve pertencer à lista permitida
    if (!TIPOS_VALIDOS.includes(tipo)) {
      throw erro(
        400,
        'Tipo inválido. Use TRABALHO, PROVA ou SEMINARIO'
      );
    }

    // Regra 3: disciplina informada precisa existir
    const idDisciplina = Number(disciplinaId);

    if (!Number.isInteger(idDisciplina) || idDisciplina <= 0) {
      throw erro(400, 'disciplinaId deve ser um número válido');
    }

    if (!disciplinaModel.buscarPorId(idDisciplina)) {
      throw erro(422, 'A disciplina informada não existe');
    }

    return atividadeModel.inserir({
      titulo,
      tipo,
      dataPrazo,
      status,
      disciplinaId: idDisciplina,
    });
  },

  atualizar(id, dados = {}) {
    const atividade = atividadeModel.buscarPorId(id);
    if (!atividade) throw erro(404, 'Atividade não encontrada');

    const atualizada = { ...atividade, ...dados };

    if (
      !atualizada.titulo ||
      !atualizada.tipo ||
      !atualizada.dataPrazo ||
      atualizada.disciplinaId === undefined
    ) {
      throw erro(
        400,
        'Campos "titulo", "tipo", "dataPrazo" e "disciplinaId" são obrigatórios'
      );
    }

    if (!TIPOS_VALIDOS.includes(atualizada.tipo)) {
      throw erro(
        400,
        'Tipo inválido. Use TRABALHO, PROVA ou SEMINARIO'
      );
    }

    const idDisciplina = Number(atualizada.disciplinaId);

    if (!Number.isInteger(idDisciplina) || idDisciplina <= 0) {
      throw erro(400, 'disciplinaId deve ser um número válido');
    }

    if (!disciplinaModel.buscarPorId(idDisciplina)) {
      throw erro(422, 'A disciplina informada não existe');
    }

    return atividadeModel.atualizar(id, {
      ...atualizada,
      disciplinaId: idDisciplina,
    });
  },

  remover(id) {
    const removida = atividadeModel.remover(id);
    if (!removida) throw erro(404, 'Atividade não encontrada');
  },
};
