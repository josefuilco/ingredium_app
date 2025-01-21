import { Ingredient } from "./ingredient.model";

export class Recipe {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly description: string,
    private readonly purpose: string,
    private readonly steps: string[],
    private readonly ingredients: Ingredient[],
    private readonly ownerId: string,
    private readonly userId: string[]
  ) {}

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getPurpose(): string {
    return this.purpose;
  }

  getSteps(): string[] {
    return this.steps;
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  getOwnerId(): string {
    return this.ownerId;
  }

  getUsersId(): string[] {
    return this.userId;
  }
}