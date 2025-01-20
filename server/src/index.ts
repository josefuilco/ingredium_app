import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { envs } from './infrastructure/config/env.config';
import codeRoutes from './presentation/routes/code.routes';
import userRoutes from './presentation/routes/user.routes';
import ingredientRoutes from './presentation/routes/ingredient.routes';
import recipeRouter from './presentation/routes/recipe.routes';

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
  app.use('/api/ingredients', ingredientRoutes);
  app.use('/api/recipes', recipeRouter);

  app.listen(
    envs.port,
    () => console.info(`Server listen on http://localhost:${envs.port}`)
  );
}

bootstrap();