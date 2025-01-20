import { IIngredientRepository } from '../../domain/repositories/ingredient.repository';
import { Ingredient } from '../../domain/models/ingredient.model';

export class CreateIngredientUseCase {
  constructor(
    private readonly ingredientRepository: IIngredientRepository
  ) {}

  async execute(ingredient: Ingredient): Promise<boolean> {
    const existingIngredient = await this.ingredientRepository.findByName(ingredient.getName());

    if (existingIngredient) {
      return false;
    }

    await this.ingredientRepository.save(ingredient);
    return true;
  }
}