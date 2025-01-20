import { Ingredient } from "../../../domain/models/ingredient.model";
import { IngredientBuilder } from "../../../domain/builders/ingredient.builder"; 
import { IIngredientRepository } from "../../../domain/repositories/ingredient.repository";
import { Repository } from "typeorm";
import { IngredientEntity } from "../entities/ingredient.entity";

export class DatabaseIngredientRepository implements IIngredientRepository {
  constructor(
    private readonly ingredientEntity: Repository<IngredientEntity>,
    private readonly ingredientBuilder: IngredientBuilder
  ) {}

  async getAll(): Promise<Ingredient[]> {
    const ingredients = await this.ingredientEntity.find();
    return ingredients.map(entity => this.ingredientBuilder
      .addId(entity.id)
      .addName(entity.name)
      .addDescription(entity.description)
      .addCalories(entity.calories)
      .build()
    );
  }

  async findByName(name: string): Promise<Ingredient | null> {
    const entity = await this.ingredientEntity.findOne({ where: { name } });
    if (!entity) {
      return null;
    }
    return this.ingredientBuilder
      .addId(entity.id)
      .addName(entity.name)
      .addDescription(entity.description)
      .addCalories(entity.calories)
      .build();
  }

  async save(ingredient: Ingredient): Promise<boolean> {
    const currentIngredient = this.ingredientEntity.create({
      id: ingredient.getId(),
      name: ingredient.getName(),
      description: ingredient.getDescription(),
      calories: ingredient.getCalories()
    });
    const result = await this.ingredientEntity.save(currentIngredient);
    return result !== undefined;
  }

  async update(ingredient: Ingredient): Promise<boolean> {
    const result = await this.ingredientEntity.update(
      { name: ingredient.getName() },
      {
        description: ingredient.getDescription(),
        calories: ingredient.getCalories()
      }
    );
    return result.affected > 0;
  }

  async delete(ingredientId: number): Promise<boolean> {
    const result = await this.ingredientEntity.update({ id: ingredientId }, { isActive: false });
    return result.affected > 0;
  }
}