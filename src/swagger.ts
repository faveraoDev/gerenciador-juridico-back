import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import express from 'express';

const swaggerPath = path.resolve(__dirname, '../swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);

const router = express.Router();
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;