
import { Router } from 'express';
import { atividadeController } from '../controllers/atividadeController.js';

const router = Router();

router.get('/', atividadeController.listar);
router.get('/:id', atividadeController.buscarPorId);
router.post('/', atividadeController.criar);
router.put('/:id', atividadeController.atualizar);
router.delete('/:id', atividadeController.remover);

export default router;
