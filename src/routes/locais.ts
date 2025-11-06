import { Router } from 'express';
import * as ctrl from '../controllers/locaisController';

const router = Router();
router.get('/', ctrl.listLocais);
router.get('/:id', ctrl.getLocal);
router.post('/', ctrl.createLocal);
router.put('/:id', ctrl.updateLocal);
router.patch('/:id', ctrl.updateLocal);
router.delete('/:id', ctrl.deleteLocal);

export default router;