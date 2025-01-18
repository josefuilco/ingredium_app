import { Ingredient } from "../models/ingredient.model";

export class IngredientBuilder {
  private id: string;
  private name: string;
  private description: string;
  private quantity: number;
  private calories: number;

  constructor() {
    this.reset();
  }

  reset() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.quantity = 0;
    this.calories = 0;
  }

  addId(id: string) {
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

  addQuantity(quantity: number) {
    this.quantity = quantity;
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
      this.quantity,
      this.calories
    );
    this.reset();
    return ingredient;
  }
}