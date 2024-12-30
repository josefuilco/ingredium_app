import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { envs } from './core/infrastructure/config/env.config';
import codeRoutes from './auth/infrastructure/web/routes/code.routes';
import userRoutes from './auth/infrastructure/web/routes/user.routes';

function bootstrap() {
  const app = express();

  // Configuration
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization']
  }));
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Routes
  app.use('/api/codes', codeRoutes);
  app.use('/api/users', userRoutes);
  // app.use('/api/recipes');
  // app.use('/api/posts');

  app.listen(
    envs.port,
    () => console.info(`Server listen on http://localhost:${envs.port}`)
  );
}

bootstrap();