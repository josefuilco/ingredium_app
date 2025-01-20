import { Recipe } from "../models/recipe.model";

export interface IRecipeRepository {
  getByRange(from: number, to: number): Promise<Recipe[]>;
  findByUserId(userId: string): Promise<Recipe[]>;
  findByTitle(title: string): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe>;
  save(recipe: Recipe): Promise<boolean>;
  update(recipe: Recipe): Promise<boolean>;
  delete(recipeId: string): Promise<boolean>;
}