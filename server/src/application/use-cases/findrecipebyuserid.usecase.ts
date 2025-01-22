import { IObjectStorageProvider } from "../../domain/providers/objectstorage.provider.port";
import { IRecipeRepository } from "../../domain/repositories/recipe.repository";
import { RecipeInformationDto } from "../dtos/recipeinformation.dto";

export class FindRecipeByUserIdUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly objectStorageProvider: IObjectStorageProvider
  ) {}

  async execute(userId: string): Promise<RecipeInformationDto[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const recipes = await this.recipeRepository.findByUserId(userId);
    
    if (!recipes || recipes.length === 0) {
      throw new Error('No recipes found for the given user ID');
    }

    const aiRecipeInformationList: RecipeInformationDto[] = [];

    for (const recipe of recipes) {
      const imageUrl = await this.objectStorageProvider.getFileUrl(`${recipe.getOwnerId()}/${recipe.getTitle()}`);

      const aiRecipeInformation: RecipeInformationDto = {
        id: recipe.getId(),
        title: recipe.getTitle(),
        description: recipe.getDescription(),
        purpose: recipe.getPurpose(),
        steps: recipe.getSteps(),
        ingredients: recipe.getIngredients(),
        urlImage: imageUrl
      };

      aiRecipeInformationList.push(aiRecipeInformation);
    }

    return aiRecipeInformationList;
  }
}