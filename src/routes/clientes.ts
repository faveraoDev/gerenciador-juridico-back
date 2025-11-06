import { Router } from 'express';
import * as ctrl from '../controllers/clientesController';

const router = Router();
router.get('/', ctrl.listClientes);
router.get('/:id', ctrl.getCliente);
router.post('/', ctrl.createCliente);
router.put('/:id', ctrl.updateCliente);
router.patch('/:id', ctrl.updateCliente);
router.delete('/:id', ctrl.deleteCliente);

export default router;