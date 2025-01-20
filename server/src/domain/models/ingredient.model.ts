export class Ingredient {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly description: string,
    private readonly calories: number
  ) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getCalories(): number {
    return this.calories;
  }
}