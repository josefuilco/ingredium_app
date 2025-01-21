import React from 'react';
import { Recipe } from '../models/recipe'; 

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{recipe.title}</div>
        <p className="text-gray-700 text-base">{recipe.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {recipe.ingredients.map((ingredient, index) => (
          <span
            key={index + 1}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {ingredient.name}
          </span>
        ))}
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ver receta
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;