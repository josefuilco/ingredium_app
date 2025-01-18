import { envs } from "../config/env.config"; 
import { IngrediumDataSource } from "../database/typeorm.database"; 
import { JwtTokenProvider } from "../providers/jwttoken.provider"; 
import { GetAccessKeyUseCase } from "../../application/use-cases/getaccesskey.usecase"; 
import { CreateUserUseCase } from "../../application/use-cases/createuser.usecase"; 
import { SendAuthenticationCodeUseCase } from "../../application/use-cases/sendauthenticationcode.usecase";
import { UserBuilder } from "../../domain/builders/user.builder";
import { CodeEntity } from "../persistence/entities/code.entity";
import { UserEntity } from "../persistence/entities/user.entity";
import { DatabaseCodeRepository } from "../persistence/repositories/databasecode.repository";
import { DatabaseUserRepository } from "../persistence/repositories/databaseuser.repository";
import { ResendMessageProvider } from "../providers/resendmessage.provider";
import { CodeController } from "../../presentation/controllers/code.controller";
import { UserController } from "../../presentation/controllers/user.controller";
import { FindUserByIdUseCase } from "../../application/use-cases/finduserbyid.usecase";
import { UpdateUserUseCase } from "../../application/use-cases/updateuser.usecase";
import { DeleteUserUseCase } from "../../application/use-cases/deleteuser.usecase";

// Builders
const userBuilder = new UserBuilder();

// Providers
const messageProvider = new ResendMessageProvider(envs);
const tokenProvider = JwtTokenProvider.getInstance();

// Repositories
const userRepository = new DatabaseUserRepository(
  IngrediumDataSource.getRepository(UserEntity),
  userBuilder
);
const codeRepository = new DatabaseCodeRepository(
  IngrediumDataSource.getRepository(CodeEntity)
);

// Use Cases
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const sendAuthenticationCodeUseCase = new SendAuthenticationCodeUseCase(
  userRepository,
  codeRepository,
  messageProvider
);
const getAccessKeyUseCase = new GetAccessKeyUseCase(
  codeRepository,
  tokenProvider
);

// Controllers
export const dependencyManager = {
  codeController: new CodeController(
    sendAuthenticationCodeUseCase,
    getAccessKeyUseCase
  ),
  userController: new UserController(
    userBuilder,
    findUserByIdUseCase,
    createUserUseCase,
    updateUserUseCase,
    deleteUserUseCase
  )
};