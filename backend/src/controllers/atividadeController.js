
import { atividadeService } from '../services/atividadeService.js';

export const atividadeController = {
  listar(req, res) {
    res.json(atividadeService.listar(req.query.disciplinaId));
  },

  buscarPorId(req, res) {
    res.json(atividadeService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const nova = atividadeService.criar(req.body);
    res.status(201).json(nova);
  },

  atualizar(req, res) {
    res.json(
      atividadeService.atualizar(Number(req.params.id), req.body)
    );
  },

  remover(req, res) {
    atividadeService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
    