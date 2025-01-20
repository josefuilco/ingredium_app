import { RecipeInformationDto } from "./recipeinformation.dto";

export interface AiRecipeInformation extends RecipeInformationDto {
  aiComment: string;
}