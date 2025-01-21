import React from 'react';
import { Recipe } from '../models/Recipe';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/community/${recipe.ownerId}/${recipe.id}`);
  };

  return (
    <div className="max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 m-4 border border-gray-100">
      {/* Imagen */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={recipe.urlImage || 'https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_website/es/cms/SEO/recipes/albondigas-caseras-de-cerdo-con-salsa-barbacoa.jpeg'}
          alt={recipe.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* Contenido */}
      <div className="p-6">
        <h2 className="font-bold text-2xl mb-3 text-gray-800 hover:text-orange-normal transition-colors">{recipe.title}</h2>
        <p className="text-gray-600 mb-5 line-clamp-2">{recipe.description}</p>

        {/* Ingredientes */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Ingredientes principales:</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.slice(0, 3).map((ingredient, ) => (
              <span
                key={ingredient.id}
                className="inline-block bg-gray-50 border border-gray-100 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-orange-normal hover:text-white transition-colors"
              >
                {ingredient.name}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="inline-block text-xs font-medium text-orange-normal">
                +{recipe.ingredients.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Botón */}
        <button 
          onClick={handleClick}
          className="w-full bg-orange-normal hover:bg-orange-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <span>Ver receta completa</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;