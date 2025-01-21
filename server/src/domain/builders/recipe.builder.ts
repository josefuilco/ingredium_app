import { Ingredient } from "../models/ingredient.model";
import { Recipe } from "../models/recipe.model";

export class RecipeBuilder {
  private id: string;
  private title: string;
  private description: string;
  private purpose: string;
  private steps: string[];
  private ingredients: Ingredient[];
  private ownerId: string;
  private usersId: string[];

  constructor() {
    this.reset();
  }

  reset() {
    this.id = '';
    this.title = '';
    this.description = '';
    this.purpose = '';
    this.steps = [];
    this.ingredients = [];
    this.ownerId = '';
    this.usersId = [];
  }

  addId(id: string) {
    this.id = id;
    return this;
  }

  addTitle(title: string) {
    this.title = title;
    return this;
  }

  addDescription(description: string) {
    this.description = description;
    return this;
  }

  addPurpose(purpose: string) {
    this.purpose = purpose;
    return this;
  }

  addStep(step: string) {
    this.steps.push(step);
    return this;
  }

  addSteps(steps: string[]) {
    this.steps = steps;
    return this;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    return this;
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    return this;
  }

  addOwnerId(ownerId: string) {
    this.ownerId = ownerId;
    return this;
  }

  addUserId(userId: string[]) {
    this.usersId = userId;
    return this;
  }

  build() {
    const recipe = new Recipe(
      this.id,
      this.title,
      this.description,
      this.purpose,
      this.steps,
      this.ingredients,
      this.ownerId,
      this.usersId
    );
    this.reset();
    return recipe;
  }
}