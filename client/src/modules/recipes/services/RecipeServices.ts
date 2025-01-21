import { Recipe } from "../models/recipe";

export class RecipeServices {
  private static recipes: Recipe[] = [
    {
      id: '1',
      title: 'Tomato Basil Chicken',
      description: 'A delicious chicken recipe with tomato and basil.',
      purpose: 'Dinner',
      steps: ['Season chicken', 'Cook chicken', 'Add tomato and basil', 'Serve'],
      ingredients: [
        { id: 1, name: 'Tomato', description: 'Fresh red tomato', calories: 18 },
        { id: 5, name: 'Chicken Breast', description: 'Boneless skinless chicken breast', calories: 165 },
        { id: 8, name: 'Basil', description: 'Fresh basil leaves', calories: 22 }
      ],
      ownerId: 'user1',
      userId: 'user1'
    },
    {
      id: '2',
      title: 'Garlic Lemon Chicken',
      description: 'A zesty chicken recipe with garlic and lemon.',
      purpose: 'Lunch',
      steps: ['Season chicken', 'Cook chicken', 'Add garlic and lemon', 'Serve'],
      ingredients: [
        { id: 3, name: 'Garlic', description: 'Minced garlic', calories: 149 },
        { id: 5, name: 'Chicken Breast', description: 'Boneless skinless chicken breast', calories: 165 },
        { id: 10, name: 'Lemon', description: 'Fresh lemon juice', calories: 29 }
      ],
      ownerId: 'user2',
      userId: 'user2'
    },
    {
      id: '3',
      title: 'Parmesan Chicken',
      description: 'A savory chicken recipe with parmesan cheese.',
      purpose: 'Dinner',
      steps: ['Season chicken', 'Cook chicken', 'Add parmesan cheese', 'Serve'],
      ingredients: [
        { id: 5, name: 'Chicken Breast', description: 'Boneless skinless chicken breast', calories: 165 },
        { id: 9, name: 'Parmesan Cheese', description: 'Grated parmesan cheese', calories: 431 }
      ],
      ownerId: 'user3',
      userId: 'user3'
    },
    {
      id: '4',
      title: 'Tomato Basil Salad',
      description: 'A fresh salad with tomato and basil.',
      purpose: 'Appetizer',
      steps: ['Chop tomato', 'Add basil', 'Mix and serve'],
      ingredients: [
        { id: 1, name: 'Tomato', description: 'Fresh red tomato', calories: 18 },
        { id: 8, name: 'Basil', description: 'Fresh basil leaves', calories: 22 }
      ],
      ownerId: 'user4',
      userId: 'user4'
    },
    {
      id: '5',
      title: 'Garlic Parmesan Pasta',
      description: 'A delicious pasta recipe with garlic and parmesan.',
      purpose: 'Dinner',
      steps: ['Cook pasta', 'Add garlic and parmesan', 'Mix and serve'],
      ingredients: [
        { id: 3, name: 'Garlic', description: 'Minced garlic', calories: 149 },
        { id: 9, name: 'Parmesan Cheese', description: 'Grated parmesan cheese', calories: 431 }
      ],
      ownerId: 'user5',
      userId: 'user5'
    },
    {
      id: '6',
      title: 'Lemon Basil Chicken',
      description: 'A refreshing chicken recipe with lemon and basil.',
      purpose: 'Lunch',
      steps: ['Season chicken', 'Cook chicken', 'Add lemon and basil', 'Serve'],
      ingredients: [
        { id: 5, name: 'Chicken Breast', description: 'Boneless skinless chicken breast', calories: 165 },
        { id: 8, name: 'Basil', description: 'Fresh basil leaves', calories: 22 },
        { id: 10, name: 'Lemon', description: 'Fresh lemon juice', calories: 29 }
      ],
      ownerId: 'user6',
      userId: 'user6'
    },
    {
      id: '7',
      title: 'Tomato Garlic Pasta',
      description: 'A tasty pasta recipe with tomato and garlic.',
      purpose: 'Dinner',
      steps: ['Cook pasta', 'Add tomato and garlic', 'Mix and serve'],
      ingredients: [
        { id: 1, name: 'Tomato', description: 'Fresh red tomato', calories: 18 },
        { id: 3, name: 'Garlic', description: 'Minced garlic', calories: 149 }
      ],
      ownerId: 'user7',
      userId: 'user7'
    },
    {
      id: '8',
      title: 'Chicken Salad',
      description: 'A healthy chicken salad.',
      purpose: 'Lunch',
      steps: ['Cook chicken', 'Chop vegetables', 'Mix and serve'],
      ingredients: [
        { id: 5, name: 'Chicken Breast', description: 'Boneless skinless chicken breast', calories: 165 },
        { id: 1, name: 'Tomato', description: 'Fresh red tomato', calories: 18 },
        { id: 2, name: 'Onion', description: 'Chopped white onion', calories: 40 }
      ],
      ownerId: 'user8',
      userId: 'user8'
    },
    {
      id: '9',
      title: 'Basil Lemon Pasta',
      description: 'A refreshing pasta recipe with basil and lemon.',
      purpose: 'Dinner',
      steps: ['Cook pasta', 'Add basil and lemon', 'Mix and serve'],
      ingredients: [
        { id: 8, name: 'Basil', description: 'Fresh basil leaves', calories: 22 },
        { id: 10, name: 'Lemon', description: 'Fresh lemon juice', calories: 29 }
      ],
      ownerId: 'user9',
      userId: 'user9'
    },
    {
      id: '10',
      title: 'Garlic Chicken',
      description: 'A savory chicken recipe with garlic.',
      purpose: 'Dinner',
      steps: ['Season chicken', 'Cook chicken', 'Add garlic', 'Serve'],
      ingredients: [
        { id: 5, name: 'Chicken Breast', description: 'Boneless skinless chicken breast', calories: 165 },
        { id: 3, name: 'Garlic', description: 'Minced garlic', calories: 149 }
      ],
      ownerId: 'user10',
      userId: 'user10'
    }
  ];
  
  async createRecipe(recipe: Recipe, image: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      const newRecipe = { ...recipe, image: base64Image };
      RecipeServices.recipes.push(newRecipe);
      console.log('Recipe created:', newRecipe);
    };
    reader.readAsDataURL(image);
  }

  async updateRecipe(recipe: Recipe, image: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const index = RecipeServices.recipes.findIndex(r => r.id === recipe.id);
      if (index !== -1) {
        RecipeServices.recipes[index] = { ...recipe };
        console.log('Recipe updated:', RecipeServices.recipes[index]);
      } else {
        console.log('Recipe not found');
      }
    };
    reader.readAsDataURL(image);
  }

  async deleteRecipe(id: string) {
    const index = RecipeServices.recipes.findIndex(r => r.id === id);
    if (index !== -1) {
      RecipeServices.recipes.splice(index, 1);
      console.log('Recipe deleted:', id);
    } else {
      console.log('Recipe not found');
    }
  }

  async getRecipeById(id: string) {
    const recipe = RecipeServices.recipes.find(r => r.id === id);
    if (recipe) {
      console.log('Recipe found:', recipe);
      return recipe;
    } else {
      console.log('Recipe not found');
      return null;
    }
  }

  async getRecipesByUserId(userId: string) {
    const userRecipes = RecipeServices.recipes.filter(r => r.userId === userId);
    if (userRecipes.length > 0) {
      console.log('Recipes found for user:', userRecipes);
      return userRecipes;
    } else {
      console.log('No recipes found for user');
      return [];
    }
  }

  async getRecipesByTitle(title: string) {
    const recipes = RecipeServices.recipes.filter(r => r.title.toLowerCase().includes(title.toLowerCase()));
    if (recipes.length > 0) {
      console.log('Recipes found with title:', recipes);
      return recipes;
    } else {
      console.log('No recipes found with title');
      return [];
    }
  }

  async getRecipesByRange(start: number, end: number) {
    const recipesInRange = RecipeServices.recipes.slice(start, end);
    if (recipesInRange.length > 0) {
      console.log('Recipes found in range:', recipesInRange);
      return recipesInRange;
    } else {
      console.log('No recipes found in range');
      return [];
    }
  }
}