import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/components/Navbar'; 
import RecipeList from '../components/RecipeList';
import { RecipeServices } from '../services/RecipeServices';
import { Recipe } from '../models/recipe';

const recipeServices = new RecipeServices();

const CommunityPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await recipeServices.getRecipesByRange(0, 10);
        console.log('Recipes:', recipes);
        setRecipes(recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

export default CommunityPage;