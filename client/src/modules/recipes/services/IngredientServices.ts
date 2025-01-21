import { Ingredient } from '../models/Ingredient';

// MOCK
export class IngredientServices {
  private static ingredients: Ingredient[] = [
    {
      id: 1,
      name: 'Tomato',
      description: 'Fresh red tomato',
      calories: 18
    },
    {
      id: 2,
      name: 'Onion',
      description: 'Chopped white onion',
      calories: 40
    },
    {
      id: 3,
      name: 'Garlic',
      description: 'Minced garlic',
      calories: 149
    },
    {
      id: 4,
      name: 'Olive Oil',
      description: 'Extra virgin olive oil',
      calories: 884
    },
    {
      id: 5,
      name: 'Chicken Breast',
      description: 'Boneless skinless chicken breast',
      calories: 165
    },
    {
      id: 6,
      name: 'Salt',
      description: 'Table salt',
      calories: 0
    },
    {
      id: 7,
      name: 'Black Pepper',
      description: 'Ground black pepper',
      calories: 251
    },
    {
      id: 8,
      name: 'Basil',
      description: 'Fresh basil leaves',
      calories: 22
    },
    {
      id: 9,
      name: 'Parmesan Cheese',
      description: 'Grated parmesan cheese',
      calories: 431
    },
    {
      id: 10,
      name: 'Lemon',
      description: 'Fresh lemon juice',
      calories: 29
    }
  ];

  async getAllIngredients() {
    return IngredientServices.ingredients;
  }

  async createIngredient(ingredient: Ingredient) {
    IngredientServices.ingredients.push(ingredient);
    return true;
  }

  async updateIngredient(ingredient: Ingredient) {
    const index = IngredientServices.ingredients.findIndex(i => i.id === ingredient.id);
    if (index !== -1) {
      IngredientServices.ingredients[index] = ingredient;
      return true;
    }
    return false;
  }

  async deleteIngredient(id: number) {
    const index = IngredientServices.ingredients.findIndex(i => i.id === id);
    if (index !== -1) {
      IngredientServices.ingredients.splice(index, 1);
      return true;
    }
    return false;
  }
}