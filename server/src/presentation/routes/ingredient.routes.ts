import { Router } from 'express';
import { dependencyManager } from '../../infrastructure/container/dependency.container';
import { useAuthorization } from '../middlewares/authorization.middleware';

const controller = dependencyManager.ingredientController;
const ingredientRoutes = Router();

// GET /api/ingredients
ingredientRoutes.get(
  '/',
  (req, res) => controller.findAll(req, res)
);

// POST /api/ingredients
ingredientRoutes.post(
  '/',
  useAuthorization,
  (req, res) => controller.create(req, res)
);

// Update an existing ingredient by ID
ingredientRoutes.put(
  '/',
  useAuthorization,
  (req, res) => controller.update(req, res)
);

// Delete an ingredient by ID
ingredientRoutes.delete(
  '/:id',
  useAuthorization,
  (req, res) => controller.delete(req, res)
);

export default ingredientRoutes;