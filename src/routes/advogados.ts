import { Router } from 'express';
import * as ctrl from '../controllers/advogadosController';

const router = Router();
router.get('/', ctrl.listAdvogados);
router.get('/:id', ctrl.getAdvogado);
router.post('/', ctrl.createAdvogado);
router.put('/:id', ctrl.updateAdvogado);
router.patch('/:id', ctrl.updateAdvogado);
router.delete('/:id', ctrl.deleteAdvogado);

export default router;