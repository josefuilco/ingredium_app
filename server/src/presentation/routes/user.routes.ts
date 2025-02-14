import { Router } from 'express';
import { dependencyManager } from '../../infrastructure/container/dependency.container';
import { useAuthorization } from '../middlewares/authorization.middleware';
import { UserRequest } from '../requests/user.request';

const controller = dependencyManager.userController;
const userRoutes = Router();

// POST api/users/
userRoutes.post(
  '/',
  (req, res) => controller.createUser(req, res)
);

// GET api/users/
userRoutes.get(
  '/',
  useAuthorization,
  (req: UserRequest, res) => controller.findUserById(req, res)
);

// PUT api/users/
userRoutes.put(
  '/',
  useAuthorization,
  (req, res) => controller.updateUser(req, res)
);

// DELETE api/users/:id
userRoutes.delete(
  '/',
  useAuthorization,
  (req: UserRequest, res) => controller.deleteUser(req, res)
);

export default userRoutes;