import { Request, Response } from 'express';
import { CreateRecipeUseCase } from '../../application/use-cases/createrecipe.usecase';
import { FindRecipeByIdUseCase } from '../../application/use-cases/findrecipebyid.usecase';
import { FindRecipeByUserIdUseCase } from '../../application/use-cases/findrecipebyuserid.usecase';
import { FindRecipeByTitleUseCase } from '../../application/use-cases/findrecipebytitle.usecase';
import { GetRecipesByRangeUseCase } from '../../application/use-cases/getrecipesbyrange.usecase'
import { UpdateRecipeUseCase } from '../../application/use-cases/updaterecipe.usecase';
import { DeleteRecipeUseCase } from '../../application/use-cases/deleterecipe.usecase';
import { RecipeBuilder } from '../../domain/builders/recipe.builder';
import { recipeDto } from '../dtos/recipe.dto'; 
import { IngredientBuilder } from '../../domain/builders/ingredient.builder';
import { UserRequest } from '../requests/user.request';

export class RecipeController {
  constructor(
    private readonly recipeBuilder: RecipeBuilder,
    private readonly ingredientBuilder: IngredientBuilder,
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly findRecipeByIdUseCase: FindRecipeByIdUseCase,
    private readonly findRecipeByUserIdUseCase: FindRecipeByUserIdUseCase,
    private readonly findRecipeByTitleUseCase: FindRecipeByTitleUseCase,
    private readonly getRecipesByRangeUseCase: GetRecipesByRangeUseCase,
    private readonly updateRecipeUseCase: UpdateRecipeUseCase,
    private readonly deleteRecipeUseCase: DeleteRecipeUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await recipeDto.safeParseAsync(req.body);

      if (!result.success) {
        res.status(400).json(result.error.issues);
        return;
      }

      const recipe = this.recipeBuilder
        .addTitle(result.data.title)
        .addDescription(result.data.description)
        .addPurpose(result.data.purpose)
        .addSteps(result.data.steps)
        .addIngredients(result.data.ingredients.map(ingredient => {
          const recipe = this.ingredientBuilder.addId(ingredient).build();
          return recipe;
        }))
        .addOwnerId(result.data.ownerId)
        .build();

      const imageUrl = await this.createRecipeUseCase.execute(recipe, req.file?.buffer);
      res.status(201).json({
        success: true,
        message: 'Recipe created',
        imageUrl
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the recipe',
      });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const recipe = await this.findRecipeByIdUseCase.execute(id);
      res.status(200).json({
        success: true,
        data: recipe,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching the recipe',
      });
    }
  }

  async findByUser(req: UserRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const recipes = await this.findRecipeByUserIdUseCase.execute(userId);
      res.status(200).json({
        success: true,
        data: recipes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching recipes',
      });
    }
  }

  async findByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const recipes = await this.findRecipeByUserIdUseCase.execute(userId);
      res.status(200).json({
        success: true,
        data: recipes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching recipes',
      });
    }
  }

  async findByTitle(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.params;
      const recipes = await this.findRecipeByTitleUseCase.execute(title);
      res.status(200).json({
        success: true,
        data: recipes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching recipes',
      });
    }
  }

  async getByRange(req: Request, res: Response): Promise<void> {
    try {
      const { start, end } = req.query;
      const recipes = await this.getRecipesByRangeUseCase.execute(Number(start), Number(end));
      res.status(200).json({
        success: true,
        data: recipes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching recipes',
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const result = await recipeDto.safeParseAsync(req.body);

      if (!result.success) {
        res.status(400).json(result.error.issues);
        return;
      }

      const recipe = this.recipeBuilder
        .addId(result.data.id)
        .addTitle(result.data.title)
        .addDescription(result.data.description)
        .addPurpose(result.data.purpose)
        .addSteps(result.data.steps)
        .addIngredients(result.data.ingredients.map(ingredient => {
          const recipe = this.ingredientBuilder.addId(ingredient).build();
          return recipe;
        }))
        .addOwnerId(result.data.ownerId)
        .build();

      const updated = await this.updateRecipeUseCase.execute(recipe);
      res.status(200).json({
        message: updated ? 'Recipe updated' : 'Recipe not found',
        success: updated
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the recipe',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const isDeleted = await this.deleteRecipeUseCase.execute(id);
      res.status(204).json({
        success: isDeleted,
        message: isDeleted ? 'Recipe deleted' : 'Recipe not found',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while deleting the recipe',
      });
    }
  }
}