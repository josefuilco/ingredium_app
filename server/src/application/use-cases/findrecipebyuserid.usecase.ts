import { IAIProvider } from "../../domain/providers/ai.provider.port";
import { IObjectStorageProvider } from "../../domain/providers/objectstorage.provider.port";
import { IRecipeRepository } from "../../domain/repositories/recipe.repository";
import { AiRecipeInformation } from "../dtos/airecipeinformation.dto";

export class FindRecipeByUserIdUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly objectStorageProvider: IObjectStorageProvider,
    private readonly aiProvider: IAIProvider
  ) {}

  async execute(userId: string): Promise<AiRecipeInformation[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const recipes = await this.recipeRepository.findByUserId(userId);
    if (!recipes || recipes.length === 0) {
      throw new Error('No recipes found for the given user ID');
    }

    const aiRecipeInformationList: AiRecipeInformation[] = [];

    for (const recipe of recipes) {
      const imageUrl = await this.objectStorageProvider.getFileUrl(`${recipe.getOwnerId()}/${recipe.getTitle()}`);
      const prompt = `Título: ${recipe.getTitle()}\nDescripción: ${recipe.getDescription()}\nPropósito: ¿Es esta comida adecuada para una dieta saludable?`;
      const aiData = await this.aiProvider.generateText(prompt);

      const aiRecipeInformation: AiRecipeInformation = {
        id: recipe.getId(),
        title: recipe.getTitle(),
        description: recipe.getDescription(),
        steps: recipe.getSteps(),
        ingredients: recipe.getIngredients(),
        urlImage: imageUrl,
        aiComment: aiData
      };

      aiRecipeInformationList.push(aiRecipeInformation);
    }

    return aiRecipeInformationList;
  }
}