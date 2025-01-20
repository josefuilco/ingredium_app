import { IRecipeRepository } from "../../domain/repositories/recipe.repository";

export class DeleteRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository
  ) {}

  async execute(recipeId: string): Promise<boolean> {
    const recipe = await this.recipeRepository.findById(recipeId);

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    return await this.recipeRepository.delete(recipeId);
  }
}