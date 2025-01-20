import { Request, Response } from 'express';
import { CreateIngredientUseCase } from '../../application/use-cases/createingredient.usecase'; 
import { GetAllIngredientsUseCase } from '../../application/use-cases/getallingredients.usecase'; 
import { UpdateIngredientUseCase } from '../../application/use-cases/updateingredient.usecase'; 
import { DeleteIngredientUseCase } from '../../application/use-cases/deleteingredient.usecase'; 
import { ingredientDto } from '../dtos/ingredient.dto';
import { IngredientBuilder } from '../../domain/builders/ingredient.builder';
import { ingredientNameDto } from '../dtos/ingredientName.dto';

export class IngredientController {
  constructor(
    private readonly ingredientBuilder: IngredientBuilder,
    private readonly createIngredientUseCase: CreateIngredientUseCase,
    private readonly getAllIngredientsUseCase: GetAllIngredientsUseCase,
    private readonly updateIngredientUseCase: UpdateIngredientUseCase,
    private readonly deleteIngredientUseCase: DeleteIngredientUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const result = await ingredientDto.safeParseAsync(req.body);

      if (!result.success) {
        res.status(400).json(result.error.issues);
        return;
      }

      const ingredient = this.ingredientBuilder
        .addId(result.data.id)
        .addName(result.data.name)
        .addDescription(result.data.description)
        .addCalories(result.data.calories)
        .build();

      const isCreated = await this.createIngredientUseCase.execute(ingredient);
      res.status(201).json({
        success: isCreated,
        message: isCreated ? 'Ingredient created' : 'Ingredient already exists',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the ingredient',
      });
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const ingredients = await this.getAllIngredientsUseCase.execute();
      res.status(200).json({
        success: true,
        data: ingredients,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching ingredients',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await ingredientDto.safeParseAsync(req.body);

      if (!result.success) {
        res.status(400).json(result.error.issues);
        return;
      }

      const ingredient = this.ingredientBuilder
        .addId(result.data.id)
        .addName(result.data.name)
        .addDescription(result.data.description)
        .addCalories(result.data.calories)
        .build();

      const updated = await this.updateIngredientUseCase.execute(ingredient);
      res.status(200).json({
        message: updated ? 'Ingredient updated' : 'Ingredient not found',
        success: updated
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the ingredient',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { name } = await ingredientNameDto.parseAsync(req.params);
      const isDeleted = await this.deleteIngredientUseCase.execute(name);
      res.status(204).json({
        success: isDeleted,
        message: isDeleted ? 'Ingredient deleted' : 'Ingredient not found',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while deleting the ingredient',
      });
    }
  }
}