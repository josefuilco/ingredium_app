import { Router } from 'express';
import { upload } from '../../infrastructure/config/multer.config';
import { dependencyManager } from '../../infrastructure/container/dependency.container';
import { useAuthorization } from '../middlewares/authorization.middleware'; 
import { UserRequest } from '../requests/user.request';

const controller = dependencyManager.recipeController;
const recipeRouter = Router();

// GET /api/recipes/user
recipeRouter.get('/user', useAuthorization, (req: UserRequest, res) => controller.findByUser(req, res));
// GET /api/recipes
recipeRouter.get('/', (req, res) => controller.getByRange(req, res));
// POST /api/recipes
recipeRouter.post('/', useAuthorization, upload.single('image'), (req: UserRequest, res) => controller.create(req, res));
// PUT /api/recipes/:id
recipeRouter.put('/', useAuthorization, upload.single('image'), (req: UserRequest, res) => controller.update(req, res));
// DELETE /api/recipes/:id
recipeRouter.delete('/:id', useAuthorization, (req, res) => controller.delete(req, res));
// GET /api/recipes/:id
recipeRouter.get('/only/:id', (req, res) => controller.findById(req, res));
// GET /api/recipes/users/:userId
recipeRouter.get('/users/:userId', (req, res) => controller.findByUserId(req, res));
// GET /api/recipes/titles/:title
recipeRouter.get('/titles/:title', (req, res) => controller.findByTitle(req, res));

export default recipeRouter;