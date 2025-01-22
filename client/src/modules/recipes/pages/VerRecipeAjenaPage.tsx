import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Recipe } from '../models/Recipe';
import { RecipeServices } from '../services/RecipeServices';
import Navbar from '../../shared/components/Navbar';
import { Toast } from 'primereact/toast';

const VerRecipeAjenaPage: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const { recipeId } = useParams();
  const recipeServices = new RecipeServices();
  const toast = React.useRef<Toast>(null);

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    if (recipeId) {
      try {
        const { data: recipeData} = await recipeServices.getRecipeById(recipeId);
        setRecipe(recipeData);
      } catch (error) {
        console.error('Error loading recipe:', error);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la receta'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-[#fafafa]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-normal"></div>
        </div>
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafafa]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Receta no encontrada</h2>
          <p className="text-gray-600">La receta que buscas no existe o ha sido eliminada.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Toast ref={toast} />
      <div className="min-h-screen bg-[#fafafa] py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="relative h-[500px]">
              <img
                src={recipe.urlImage || "https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_website/es/cms/SEO/recipes/albondigas-caseras-de-cerdo-con-salsa-barbacoa.jpeg"}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h1 className="text-5xl font-bold mb-4">{recipe.title}</h1>
                  <p className="text-xl opacity-90 mb-4">{recipe.description}</p>
                  <span className="bg-orange-normal px-4 py-2 rounded-full text-sm font-medium">
                    {recipe.purpose}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Ingredients */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <i className="pi pi-list mr-3 text-orange-normal"></i>
                Ingredientes
              </h2>
              <div className="space-y-4">
                {recipe.ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-orange-normal/5 transition-colors">
                    <span className="w-8 h-8 bg-orange-normal/10 rounded-full flex items-center justify-center mr-4">
                      <i className="pi pi-check text-orange-normal"></i>
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{ingredient.name}</h3>
                      <p className="text-sm text-gray-500">{ingredient.calories} calorías</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Steps and AI Analysis */}
            <div className="lg:col-span-2 space-y-8">
              {/* Steps Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <i className="pi pi-bars mr-3 text-orange-normal"></i>
                  Pasos a seguir
                </h2>
                <div className="space-y-6">
                  {recipe.steps.map((step, index) => (
                    <div key={index} className="flex group">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 bg-orange-normal group-hover:bg-orange-hover transition-colors rounded-full flex items-center justify-center text-white font-semibold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-xl flex-grow group-hover:bg-orange-normal/5 transition-colors">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Analysis Section */}
              {recipe.aiComment && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <i className="pi pi-star mr-3 text-orange-normal"></i>
                    Análisis Nutricional IA
                  </h2>
                  <div className="bg-gradient-to-r from-orange-normal/5 to-orange-hover/5 p-6 rounded-xl">
                    <p className="text-gray-700 leading-relaxed">{recipe.aiComment}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerRecipeAjenaPage;