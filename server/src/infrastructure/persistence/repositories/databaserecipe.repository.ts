import { Recipe } from "../../../domain/models/recipe.model";
import { RecipeBuilder } from "../../../domain/builders/recipe.builder";
import { IRecipeRepository } from "../../../domain/repositories/recipe.repository";
import { Repository } from "typeorm";
import { RecipeEntity } from "../entities/recipe.entity";
import { IngredientBuilder } from "../../../domain/builders/ingredient.builder";
import { StepEntity } from "../entities/step.entity";

export class DatabaseRecipeRepository implements IRecipeRepository {
  constructor(
    private readonly recipeEntity: Repository<RecipeEntity>,
    private readonly recipeBuilder: RecipeBuilder,
    private readonly ingredientBuilder: IngredientBuilder
  ) {}
  
  async getByRange(from: number, to: number): Promise<Recipe[]> {
    const recipeEntities = await this.recipeEntity.find({
      skip: from,
      take: to - from + 1,
      relations: {
        steps: true,
        ingredients: true
      }
    });

    return recipeEntities.map(entity => 
      this.recipeBuilder
        .addId(entity.id)
        .addTitle(entity.name)
        .addDescription(entity.description)
        .addPurpose(entity.purpose)
        .addSteps(entity.steps.map(step => step.content))
        .addIngredients(entity.ingredients.map(ingredient => 
          this.ingredientBuilder
          .addId(ingredient.id)
          .addName(ingredient.name)
          .addDescription(ingredient.description)
          .addCalories(ingredient.calories)
          .build()
        ))
        .addOwnerId(entity.ownerId)
        .build()
    );
  }

  async findByUserId(userId: string): Promise<Recipe[]> {
    const recipeEntities = await this.recipeEntity.find({
      where: { ownerId: userId },
      relations: {
        steps: true,
        ingredients: true
      }
    });

    return recipeEntities.map(entity => 
      this.recipeBuilder
        .addId(entity.id)
        .addTitle(entity.name)
        .addDescription(entity.description)
        .addPurpose(entity.purpose)
        .addSteps(entity.steps.map(step => step.content))
        .addIngredients(entity.ingredients.map(ingredient => 
          this.ingredientBuilder
          .addId(ingredient.id)
          .addName(ingredient.name)
          .addDescription(ingredient.description)
          .addCalories(ingredient.calories)
          .build()
        ))
        .addOwnerId(entity.ownerId)
        .build()
    );
  }

  async findByTitle(title: string): Promise<Recipe[]> {
    const recipeEntities = await this.recipeEntity.find({
      where: { name: title },
      relations: {
        steps: true,
        ingredients: true
      }
    });

    return recipeEntities.map(entity => 
      this.recipeBuilder
        .addId(entity.id)
        .addTitle(entity.name)
        .addDescription(entity.description)
        .addPurpose(entity.purpose)
        .addSteps(entity.steps.map(step => step.content))
        .addIngredients(entity.ingredients.map(ingredient => 
          this.ingredientBuilder
          .addId(ingredient.id)
          .addName(ingredient.name)
          .addDescription(ingredient.description)
          .addCalories(ingredient.calories)
          .build()
        ))
        .addOwnerId(entity.ownerId)
        .build()
    );
  }

  async findById(id: string): Promise<Recipe> {
    const recipeEntity = await this.recipeEntity.findOne({
      where: { id },
      relations: {
        steps: true,
        ingredients: true
      }
    });

    console.log(recipeEntity);

    if (!recipeEntity) {
      throw new Error("Recipe not found");
    }

    return this.recipeBuilder
      .addId(recipeEntity.id)
      .addTitle(recipeEntity.name)
      .addDescription(recipeEntity.description)
      .addPurpose(recipeEntity.purpose)
      .addSteps(recipeEntity.steps.map(step => step.content))
      .addIngredients(recipeEntity.ingredients.map(ingredient => 
        this.ingredientBuilder
        .addId(ingredient.id)
        .addName(ingredient.name)
        .addDescription(ingredient.description)
        .addCalories(ingredient.calories)
        .build()
      ))
      .addOwnerId(recipeEntity.ownerId)
      .build();
  }

  async save(recipe: Recipe): Promise<boolean> {
    const currentRecipe = this.recipeEntity.create({
      id: recipe.getId(),
      name: recipe.getTitle(),
      description: recipe.getDescription(),
      purpose: recipe.getPurpose(),
      steps: recipe.getSteps().map(stepContent => {
        const step = new StepEntity();
        step.content = stepContent;
        step.recipe = currentRecipe;
        return step;
      }),
      ingredients: recipe.getIngredients().map(ingredient => ({
        id: ingredient.getId()
      })),
      ownerId: recipe.getOwnerId()
    });
    const result = await this.recipeEntity.save(currentRecipe);

    console.log(result);
    
    return result !== null;
  }

  async update(recipe: Recipe): Promise<boolean> {
    const result = await this.recipeEntity.update(
      { id: recipe.getId() },
      {
        name: recipe.getTitle(),
        description: recipe.getDescription(),
        purpose: recipe.getPurpose(),
        steps: recipe.getSteps().map(step => ({ content: step })),
        ingredients: recipe.getIngredients().map(ingredient => ({
          id: ingredient.getId()
        })),
        ownerId: recipe.getOwnerId()
      }
    );
    return result.affected > 0;
  }

  async delete(recipeId: string): Promise<boolean> {
    const result = await this.recipeEntity.softDelete(recipeId);
    return result.affected > 0;
  }
}
