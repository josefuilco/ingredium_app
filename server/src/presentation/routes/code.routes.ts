import { Router } from 'express';
import { dependencyManager } from '../../infrastructure/container/dependency.container';

const controller = dependencyManager.codeController;
const codeRoutes = Router();

// POST api/codes/
codeRoutes.post(
  '/',
  (req, res) => controller.sendCode(req, res)
);

// GET api/codes/:code
codeRoutes.get(
  '/:code',
  (req, res) => controller.getAccessKey(req, res)
);

export default codeRoutes;