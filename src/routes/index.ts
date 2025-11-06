import { Router } from 'express';
import advogadosRouter from './advogados';
import clientesRouter from './clientes';
import processosRouter from './processos';
import documentosRouter from './documentos';
import locaisRouter from './locais';
import enderecosRouter from './enderecos';

const router = Router();

router.use('/advogados', advogadosRouter);
router.use('/clientes', clientesRouter);
router.use('/processos', processosRouter);
router.use('/documentos', documentosRouter);
router.use('/locais', locaisRouter);
router.use('/enderecos', enderecosRouter);

export default router;