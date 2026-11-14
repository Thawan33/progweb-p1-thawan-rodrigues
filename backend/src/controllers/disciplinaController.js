
import { disciplinaService } from '../services/disciplinaService.js';

export const disciplinaController = {
  listar(req, res) {
    res.json(disciplinaService.listar());
  },

  buscarPorId(req, res) {
    res.json(disciplinaService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const nova = disciplinaService.criar(req.body);
    res.status(201).json(nova);
  },

  atualizar(req, res) {
    res.json(
      disciplinaService.atualizar(Number(req.params.id), req.body)
    );
  },

  remover(req, res) {
    disciplinaService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
