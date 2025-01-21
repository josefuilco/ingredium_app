import { IIngredientRepository } from "../../domain/repositories/ingredient.repository"; 

export class DeleteIngredientUseCase {
  constructor(
    private readonly ingredientRepository: IIngredientRepository
  ) {}

  async execute(id: number): Promise<boolean> {
    const ingredient = await this.ingredientRepository.findById(id);

    if (!ingredient) {
      throw new Error('Ingredient not found');
    }

    return await this.ingredientRepository.delete(ingredient.getId());
  }
}
