export class Ingredient {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly description: string,
    private readonly quantity: number,
    private readonly calories: number
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getCalories(): number {
    return this.calories;
  }
}