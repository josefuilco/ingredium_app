import { Ingredient } from "../models/ingredient.model";

export class IngredientBuilder {
  private id: number;
  private name: string;
  private description: string;
  private calories: number;

  constructor() {
    this.reset();
  }

  reset() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.calories = 0;
  }

  addId(id: number) {
    this.id = id;
    return this;
  }

  addName(name: string) {
    this.name = name;
    return this;
  }

  addDescription(description: string) {
    this.description = description;
    return this;
  }

  addCalories(calories: number) {
    this.calories = calories;
    return this;
  }

  build() {
    const ingredient = new Ingredient(
      this.id,
      this.name,
      this.description,
      this.calories
    );
    this.reset();
    return ingredient;
  }
}