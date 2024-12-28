import { envs } from "../../../core/infrastructure/config/env.config";
import { AppDataSource } from "../../../core/infrastructure/database/typeorm.database";
import { JwtTokenProvider } from "../../../core/infrastructure/providers/jwttoken.provider";
import { CodeAuthenticationUseCase } from "../../application/use-cases/codeauthentication.usecase";
import { CreateUserUseCase } from "../../application/use-cases/createuser.usecase";
import { UserAuthenticationUseCase } from "../../application/use-cases/userauthentication.usecase";
import { UserBuilder } from "../../domain/builders/user.builder";
import { CodeEntity } from "../persistence/entities/code.entity";
import { UserEntity } from "../persistence/entities/user.entity";
import { PostgreCodeRepository } from "../persistence/repositories/postgrecode.repository";
import { PostgreUserRepository } from "../persistence/repositories/postgreuser.repository";
import { TwilioSmsProvider } from "../providers/twiliosms.provider";
import { CodeController } from "../web/controllers/code.controller";

// Builders
const userBuilder = new UserBuilder();

// Providers
const smsProvider = new TwilioSmsProvider(envs);
const tokenProvider = new JwtTokenProvider(envs);

// Repositories
const userRepository = new PostgreUserRepository(
  AppDataSource.getRepository(UserEntity),
  userBuilder
);
const codeRepository = new PostgreCodeRepository(
  AppDataSource.getRepository(CodeEntity)
);

// Use Cases
const createUserUseCase = new CreateUserUseCase(userRepository);
const userAuthenticationUseCase = new UserAuthenticationUseCase(
  userRepository,
  codeRepository,
  smsProvider
);
const codeAuthenticationUseCase = new CodeAuthenticationUseCase(
  codeRepository,
  tokenProvider
);

// Controllers
export const dependencyManager = {
  codeController: new CodeController(
    userAuthenticationUseCase,
    codeAuthenticationUseCase
  ),
};