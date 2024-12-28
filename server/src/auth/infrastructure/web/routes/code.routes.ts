import { Router } from 'express';
import { dependencyManager } from '../../container/dependency.container';

const controller = dependencyManager.codeController;
const codeRoutes = Router();

// POST api/codes/
codeRoutes.post(
  '/',
  (req, res) => controller.authenticateUser(req, res)
);

// GET api/codes/:code
codeRoutes.get(
  '/:code',
  (req, res) => controller.authenticateCode(req, res)
);

export default codeRoutes;