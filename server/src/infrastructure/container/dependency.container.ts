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
import { IngredientEntity } from "../persistence/entities/ingredient.entity";
import { DatabaseIngredientRepository } from "../persistence/repositories/databaseingredient.repository";
import { CreateIngredientUseCase } from "../../application/use-cases/createingredient.usecase";
import { UpdateIngredientUseCase } from "../../application/use-cases/updateingredient.usecase";
import { DeleteIngredientUseCase } from "../../application/use-cases/deleteingredient.usecase";
import { IngredientController } from "../../presentation/controllers/ingredient.controller";
import { IngredientBuilder } from "../../domain/builders/ingredient.builder";
import { GetAllIngredientsUseCase } from "../../application/use-cases/getallingredients.usecase";
import { RecipeBuilder } from "../../domain/builders/recipe.builder";
import { CreateRecipeUseCase } from "../../application/use-cases/createrecipe.usecase";
import { FindRecipeByIdUseCase } from "../../application/use-cases/findrecipebyid.usecase";
import { FindRecipeByUserIdUseCase } from "../../application/use-cases/findrecipebyuserid.usecase";
import { FindRecipeByTitleUseCase } from "../../application/use-cases/findrecipebytitle.usecase";
import { GetRecipesByRangeUseCase } from "../../application/use-cases/getrecipesbyrange.usecase";
import { UpdateRecipeUseCase } from "../../application/use-cases/updaterecipe.usecase";
import { DeleteRecipeUseCase } from "../../application/use-cases/deleterecipe.usecase";
import { RecipeController } from "../../presentation/controllers/recipe.controller";
import { RecipeEntity } from "../persistence/entities/recipe.entity";
import { DatabaseRecipeRepository } from "../persistence/repositories/databaserecipe.repository";
import { GCPObjectStorageProvider } from "../providers/gcpobjectstorage.provider";
import { HuggingfaceAIProvider } from "../providers/huggingfaceai.provider";

// Builders
const userBuilder = new UserBuilder();
const ingredientBuilder = new IngredientBuilder();
const recipeBuilder = new RecipeBuilder();

// Providers
const messageProvider = new ResendMessageProvider(envs);
const tokenProvider = JwtTokenProvider.getInstance();
const googleObjectStorageProvider = new GCPObjectStorageProvider(envs);
const huggingfaceAIProvider = new HuggingfaceAIProvider(envs);

// Repositories
const userRepository = new DatabaseUserRepository(
  IngrediumDataSource.getRepository(UserEntity),
  userBuilder
);
const codeRepository = new DatabaseCodeRepository(
  IngrediumDataSource.getRepository(CodeEntity)
);
const ingredientRepository = new DatabaseIngredientRepository(
  IngrediumDataSource.getRepository(IngredientEntity),
  ingredientBuilder
);
const recipeRepository = new DatabaseRecipeRepository(
  IngrediumDataSource.getRepository(RecipeEntity),
  recipeBuilder,
  ingredientBuilder
);

// Use Cases
const createIngredientUseCase = new CreateIngredientUseCase(ingredientRepository);
const updateIngredientUseCase = new UpdateIngredientUseCase(ingredientRepository);
const deleteIngredientUseCase = new DeleteIngredientUseCase(ingredientRepository);
const getAllIngredientUseCase = new GetAllIngredientsUseCase(ingredientRepository);
const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository, googleObjectStorageProvider);
const findRecipeByIdUseCase = new FindRecipeByIdUseCase(recipeRepository, googleObjectStorageProvider, huggingfaceAIProvider);
const findRecipeByUserIdUseCase = new FindRecipeByUserIdUseCase(recipeRepository, googleObjectStorageProvider, huggingfaceAIProvider);
const findRecipeByTitleUseCase = new FindRecipeByTitleUseCase(recipeRepository, googleObjectStorageProvider, huggingfaceAIProvider);
const getRecipesByRangeUseCase = new GetRecipesByRangeUseCase(recipeRepository, googleObjectStorageProvider);
const updateRecipeUseCase = new UpdateRecipeUseCase(recipeRepository, recipeBuilder);
const deleteRecipeUseCase = new DeleteRecipeUseCase(recipeRepository);

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
  ),
  ingredientController: new IngredientController(
    ingredientBuilder,
    createIngredientUseCase,
    getAllIngredientUseCase,
    updateIngredientUseCase,
    deleteIngredientUseCase
  ),
  recipeController: new RecipeController(
    recipeBuilder,
    ingredientBuilder,
    createRecipeUseCase,
    findRecipeByIdUseCase,
    findRecipeByUserIdUseCase,
    findRecipeByTitleUseCase,
    getRecipesByRangeUseCase,
    updateRecipeUseCase,
    deleteRecipeUseCase
  )
};