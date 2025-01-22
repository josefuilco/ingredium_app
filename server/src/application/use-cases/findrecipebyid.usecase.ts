import { IAIProvider } from "../../domain/providers/ai.provider.port";
import { IObjectStorageProvider } from "../../domain/providers/objectstorage.provider.port";
import { IRecipeRepository } from "../../domain/repositories/recipe.repository";
import { AiRecipeInformation } from "../dtos/airecipeinformation.dto";

export class FindRecipeByIdUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly objectStorageProvider: IObjectStorageProvider,
    private readonly aiProvider: IAIProvider
  ) {}

  async execute(recipeId: string): Promise<AiRecipeInformation> {
    if (!recipeId) {
      throw new Error('Recipe ID is required');
    }

    const recipe = await this.recipeRepository.findById(recipeId);
    if (!recipe) {
      throw new Error('No recipe found for the given recipe ID');
    }

    const imageUrl = await this.objectStorageProvider.getFileUrl(`${recipe.getOwnerId()}/${recipe.getTitle()}`);
    const prompt = `Título: ${recipe.getTitle()}\nDescripción: ${recipe.getDescription()}\nPropósito: ¿Es esta comida adecuada para una dieta saludable?`;
    const aiData = await this.aiProvider.generateText(prompt);

    const aiRecipeInformation: AiRecipeInformation = {
      id: recipe.getId(),
      title: recipe.getTitle(),
      description: recipe.getDescription(),
      purpose: recipe.getPurpose(),
      steps: recipe.getSteps(),
      ingredients: recipe.getIngredients(),
      urlImage: imageUrl,
      aiComment: aiData
    };

    return aiRecipeInformation;
  }
}