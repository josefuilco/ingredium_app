import { Router } from 'express';
import multer from 'multer';
import { dependencyManager } from '../../infrastructure/container/dependency.container';
import { useAuthorization } from '../middlewares/authorization.middleware'; 

const controller = dependencyManager.recipeController;
const recipeRouter = Router();
const upload = multer(); // Configuración de multer

// POST /api/recipes
recipeRouter.post('/', useAuthorization, upload.single('image'), (req, res) => controller.create(req, res));
// PUT /api/recipes/:id
recipeRouter.put('/:id', useAuthorization, upload.single('image'), (req, res) => controller.update(req, res));
// DELETE /api/recipes/:id
recipeRouter.delete('/:id', useAuthorization, (req, res) => controller.delete(req, res));
// GET /api/recipes/:id
recipeRouter.get('/:id', (req, res) => controller.findById(req, res));
// GET /api/recipes/user/:userId
recipeRouter.get('/user/:userId', (req, res) => controller.findByUserId(req, res));
// GET /api/recipes/title/:title
recipeRouter.get('/title/:title', (req, res) => controller.findByTitle(req, res));
// GET /api/recipes
recipeRouter.get('/', (req, res) => controller.getByRange(req, res));

export default recipeRouter;