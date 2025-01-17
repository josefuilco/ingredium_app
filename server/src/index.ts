import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { envs } from './core/infrastructure/config/env.config';
import codeRoutes from './auth/infrastructure/web/routes/code.routes';
import userRoutes from './auth/infrastructure/web/routes/user.routes';
import ingredientRouter from './recipes/infrastructure/web/routes/ingredient.routes';
import recipeRouter from './recipes/infrastructure/web/routes/recipe.routes';

function bootstrap() {
  const app = express();

  // Configuration
  app.use(cors({
    origin: envs.frontend,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization']
  }));
  app.use(morgan('common'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Routes
  app.use('/api/codes', codeRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/ingredients', ingredientRouter);
  app.use('/api/recipes', recipeRouter);

  app.listen(
    envs.port,
    () => console.info(`Server listen on http://localhost:${envs.port}`)
  );
}

bootstrap();