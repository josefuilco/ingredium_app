import { Ingredient } from '../models/Ingredient';
import axios from 'axios';

export class IngredientServices {
  private readonly API_URL = 'http://localhost:3000/api/ingredients';

  async getAllIngredients() {
    const response = await axios.get(this.API_URL);
    return response.data.data;
  }

  async createIngredient(ingredient: Ingredient) {
    const response = await axios.post(this.API_URL, ingredient, {
      headers: {
        Authorization: localStorage.getItem("accessKey")?.replace(/"/g, ''),
      },
    });
    return response.data.success;
  }

  async updateIngredient(ingredient: Ingredient) {
    const response = await axios.put(this.API_URL, ingredient, {
      headers: {
        Authorization: localStorage.getItem("accessKey")?.replace(/"/g, ''),
      },
    });
    return response.data.success;
  }

  async deleteIngredient(id: number) {
    const response = await axios.delete(`${this.API_URL}/${id}`, {
      headers: {
        Authorization: localStorage.getItem("accessKey")?.replace(/"/g, ''),
      },
    });
    return response.data.success;
  }
}
