import { Router } from 'express';
import * as ctrl from '../controllers/enderecosController';

const router = Router();
router.get('/', ctrl.listEnderecos);
router.get('/:id', ctrl.getEndereco);
router.post('/', ctrl.createEndereco);
router.put('/:id', ctrl.updateEndereco);
router.patch('/:id', ctrl.updateEndereco);
router.delete('/:id', ctrl.deleteEndereco);

export default router;