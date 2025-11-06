import { Router } from 'express';
import * as ctrl from '../controllers/documentosController';

const router = Router();
router.get('/', ctrl.listDocumentos);
router.get('/:id', ctrl.getDocumento);
router.post('/', ctrl.createDocumento);
router.put('/:id', ctrl.updateDocumento);
router.patch('/:id', ctrl.updateDocumento);
router.delete('/:id', ctrl.deleteDocumento);

export default router;