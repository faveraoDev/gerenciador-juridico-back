import { Router } from 'express';
import * as ctrl from '../controllers/processosController';

const router = Router();
router.get('/', ctrl.listProcessos);
router.get('/:id', ctrl.getProcesso);
router.post('/', ctrl.createProcesso);
router.put('/:id', ctrl.updateProcesso);
router.patch('/:id', ctrl.updateProcesso);
router.delete('/:id', ctrl.deleteProcesso);

export default router;