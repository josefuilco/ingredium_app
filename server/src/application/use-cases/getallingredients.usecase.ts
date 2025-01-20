import { IIngredientRepository } from "../../domain/repositories/ingredient.repository"; 
import { Ingredient } from "../../domain/models/ingredient.model"; 

export class GetAllIngredientsUseCase {
  constructor(private readonly ingredientRepository: IIngredientRepository) {}

  async execute(): Promise<Ingredient[]> {
    return await this.ingredientRepository.getAll();
  }
}