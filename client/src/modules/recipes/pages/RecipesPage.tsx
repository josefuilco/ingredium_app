import React, { useEffect, useState } from 'react';
import { Recipe } from '../models/Recipe';
import { RecipeServices } from '../services/RecipeServices';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const recipeServices = new RecipeServices();
  const navigate = useNavigate();

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const userRecipes = await recipeServices.getMyRecipes();
    console.log('User recipes:', userRecipes.data);
    setRecipes(userRecipes.data);
  };

  const handleAddRecipe = () => {
    navigate('/recipes/new');
  };

  const handleAddIngredient = () => {
    navigate('/ingredients/new');
  };

  return (
    <>
    <Navbar />
    <div className="bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Mis Recetas</h1>
          <div className="flex gap-4">
            <Button
              label="Nueva Receta"
              icon="pi pi-plus"
              className="bg-orange-hover hover:bg-orange-600 border-none"
              onClick={handleAddRecipe}
            />
            <Button
              label="Nuevo Ingrediente"
              icon="pi pi-plus"
              className="bg-gray-600 hover:bg-gray-700 border-none"
              onClick={handleAddIngredient}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="shadow-md hover:shadow-lg transition-shadow"
              title={recipe.title}
              subTitle={recipe.purpose}
              footer={
                <div className="flex justify-between items-center">
                  <Button
                    label="Ver"
                    icon="pi pi-eye"
                    text
                    className="text-gray-600 hover:text-orange-hover"
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                  />
                  <Button
                    label="Editar"
                    icon="pi pi-pencil"
                    text
                    className="text-gray-600 hover:text-orange-hover"
                    onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
                  />
                  <Button
                    label="Eliminar"
                    icon="pi pi-trash"
                    text
                    className="text-red-500 hover:text-red-700"
                    onClick={() => recipeServices.deleteRecipe(recipe.id)}
                  />
                </div>
              }
            >
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              <p className="text-sm text-gray-500">
                Ingredientes: {recipe.ingredients.length}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default RecipesPage;