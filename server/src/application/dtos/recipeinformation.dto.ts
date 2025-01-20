import { Ingredient } from "../../domain/models/ingredient.model";

export interface RecipeInformationDto {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  urlImage: string;
}
