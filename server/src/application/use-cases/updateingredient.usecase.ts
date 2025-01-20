import { IIngredientRepository } from '../../domain/repositories/ingredient.repository'; 
import { Ingredient } from '../../domain/models/ingredient.model';

export class UpdateIngredientUseCase {
  constructor(private readonly ingredientRepository: IIngredientRepository) {}

  async execute(ingredient: Ingredient): Promise<boolean> {
    const currentIngredient = await this.ingredientRepository.findByName(ingredient.getName());

    if (!currentIngredient) {
      throw new Error('Ingredient not found');
    }
    
    return await this.ingredientRepository.update(ingredient);
  }
}