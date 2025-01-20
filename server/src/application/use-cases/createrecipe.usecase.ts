import { IRecipeRepository } from "../../domain/repositories/recipe.repository"; 
import { IObjectStorageProvider } from "../../domain/providers/objectstorage.provider.port"; 
import { Recipe } from "../../domain/models/recipe.model";

export class CreateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly objectStorageProvider: IObjectStorageProvider
  ) {}

  async execute(data: Recipe, imageBuffer: Buffer): Promise<string> {
    const imageUrl = await this.objectStorageProvider.uploadFile(imageBuffer, `${data.getOwnerId()}/${data.getTitle()}`);

    await this.recipeRepository.save(data);

    return imageUrl;
  }
}