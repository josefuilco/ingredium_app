import axios from "axios";
import { Recipe } from "../models/Recipe";

export interface RecipeDto {
  id: string;
  title: string;
  description?: string;
  purpose?: string;
  steps?: string[];
  ingredients?: number[];
}

export class RecipeServices {
  private static readonly API_URL = 'http://localhost:3000/api/recipes';

  async createRecipe(recipe: Recipe, image: File) {
    try {
      const recipeDto: RecipeDto = {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        purpose: recipe.purpose,
        steps: recipe.steps,
        ingredients: recipe.ingredients.map(ingredient => ingredient.id)
      }

      const formData = new FormData();
      formData.append('image', image);
      formData.append('recipe', JSON.stringify(recipeDto));

      const response = await axios.post(RecipeServices.API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem("accessKey")?.replace(/"/g, '')
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  }

  async updateRecipe(recipe: Recipe, image: File) {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('recipe', JSON.stringify(recipe));

      const response = await axios.put(`${RecipeServices.API_URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem("accessKey")?.replace(/"/g, '')
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  }

  async deleteRecipe(id: string) {
    try {
      const response = await axios.delete(`${RecipeServices.API_URL}/${id}`, {
        headers: {
          'Authorization': localStorage.getItem("accessKey")?.replace(/"/g, '')
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  }

  async getRecipeById(id: string) {
    try {
      const response = await axios.get(`${RecipeServices.API_URL}/only/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting recipe:', error);
      throw error;
    }
  }

  async getMyRecipes() {
    try {
      const response = await axios.get(`${RecipeServices.API_URL}/user`, {
        headers: {
          'Authorization': localStorage.getItem("accessKey")?.replace(/"/g, '')
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting user recipes:', error);
      throw error;
    }
  }

  async getRecipesByUserId(userId: string) {
    try {
      const response = await axios.get(`${RecipeServices.API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user recipes:', error);
      throw error;
    }
  }

  async getRecipesByTitle(title: string) {
    try {
      const response = await axios.get(`${RecipeServices.API_URL}/titles/${title}`);
      return response.data;
    } catch (error) {
      console.error('Error getting recipes by title:', error);
      throw error;
    }
  }

  async getRecipesByRange(start: number, end: number) {
    try {
      const response = await axios.get(`${RecipeServices.API_URL}?start=${start}&end=${end}`);
      return response.data;
    } catch (error) {
      console.error('Error getting recipes by range:', error);
      throw error;
    }
  }
}