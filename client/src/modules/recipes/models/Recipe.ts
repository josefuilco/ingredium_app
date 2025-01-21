import { Ingredient } from "./Ingredient";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  purpose: string;
  steps: string[];
  ingredients: Ingredient[];
  ownerId: string;
  userId: string;
}