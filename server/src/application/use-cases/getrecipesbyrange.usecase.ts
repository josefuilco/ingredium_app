import { IObjectStorageProvider } from '../../domain/providers/objectstorage.provider.port';
import { IRecipeRepository } from '../../domain/repositories/recipe.repository'; 
import { RecipeInformationDto } from '../dtos/recipeinformation.dto';

export class GetRecipesByRangeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly objectStorageProvider: IObjectStorageProvider
  ) {}

  async execute(start: number, end: number): Promise<RecipeInformationDto[]> {
    if (start < 0 || end < 0 || start > end) {
      throw new Error('Invalid range');
    }

    const recipes = await this.recipeRepository.getByRange(start, end);

    const recipeDtos = await Promise.all(recipes.map(async recipe => {
      const newRecipe: RecipeInformationDto = {
        id: recipe.getId(),
        title: recipe.getTitle(),
        description: recipe.getDescription(),
        purpose: recipe.getPurpose(),
        ingredients: recipe.getIngredients(),
        steps: recipe.getSteps(),
        urlImage: await this.objectStorageProvider.getFileUrl(`${recipe.getOwnerId()}/${recipe.getTitle()}`)
      }
      return newRecipe;
    }));
    

    return recipeDtos;
  }
}