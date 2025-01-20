import { IIngredientRepository } from "../../domain/repositories/ingredient.repository"; 

export class DeleteIngredientUseCase {
  constructor(
    private readonly ingredientRepository: IIngredientRepository
  ) {}

  async execute(name: string): Promise<boolean> {
    const ingredient = await this.ingredientRepository.findByName(name);

    if (!ingredient) {
      throw new Error('Ingredient not found');
    }

    return await this.ingredientRepository.delete(ingredient.getId());
  }
}