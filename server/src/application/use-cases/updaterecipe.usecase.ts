import { IRecipeRepository } from '../../domain/repositories/recipe.repository'; 
import { Recipe } from '../../domain/models/recipe.model'; 
import { RecipeBuilder } from '../../domain/builders/recipe.builder';

export class UpdateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly recipeBuilder: RecipeBuilder
  ) {}

  async execute(recipe: Recipe): Promise<boolean> {
    const existingRecipe = await this.recipeRepository.findById(recipe.getId());

    if (!existingRecipe) {
      throw new Error('Recipe not found');
    }

    const updatedRecipe = this.recipeBuilder
      .addId(existingRecipe.getId())
      .addOwnerId(existingRecipe.getOwnerId())
      .addTitle(existingRecipe.getTitle())
      .addIngredients(recipe.getIngredients())
      .addSteps(recipe.getSteps())
      .build();

    return await this.recipeRepository.update(updatedRecipe);
  }
}