import { Ingredient } from "../models/ingredient.model";

export interface IIngredientRepository {
  getAll(): Promise<Ingredient[]>;
  findById(id: number): Promise<Ingredient>;
  findByName(name: string): Promise<Ingredient>;
  save(ingredient: Ingredient): Promise<boolean>;
  update(ingredient: Ingredient): Promise<boolean>;
  delete(ingredientId: number): Promise<boolean>;
}