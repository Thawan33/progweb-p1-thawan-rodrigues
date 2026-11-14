
import { Router } from 'express';
import { disciplinaController } from '../controllers/disciplinaController.js';

const router = Router();

router.get('/', disciplinaController.listar);
router.get('/:id', disciplinaController.buscarPorId);
router.post('/', disciplinaController.criar);
router.put('/:id', disciplinaController.atualizar);
router.delete('/:id', disciplinaController.remover);

export default router;
