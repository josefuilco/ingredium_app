import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../models/Recipe';
import { Ingredient } from '../models/Ingredient';
import { RecipeServices } from '../services/RecipeServices';
import { IngredientServices } from '../services/IngredientServices';
import Navbar from '../../shared/components/Navbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';

const NewRecipePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState('');
  const [steps, setSteps] = useState<string[]>(['']);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const recipeServices = new RecipeServices();
  const ingredientServices = new IngredientServices();
  const toast = React.useRef<Toast>(null);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      const ingredients = await ingredientServices.getAllIngredients();
      setAvailableIngredients(ingredients);
    } catch (error) {
      console.error('Error loading ingredients:', error);
      showErrorToast('No se pudieron cargar los ingredientes');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const showSuccessToast = (detail: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Éxito',
      detail
    });
  };

  const showErrorToast = (detail: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      showErrorToast('Debes seleccionar una imagen para la receta');
      return;
    }

    try {
      const newRecipe: Recipe = {
        id: crypto.randomUUID(), // Temporary ID for client-side
        title,
        description,
        purpose,
        steps: steps.filter(step => step.trim() !== ''), // Remove empty steps
        ingredients: selectedIngredients,
        ownerId: 'user2', // This should come from your auth context
        userId: 'user2', // This should come from your auth context
      };

      await recipeServices.createRecipe(newRecipe, imageFile);
      showSuccessToast('Receta creada correctamente');
      navigate('/recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
      showErrorToast('No se pudo crear la receta');
    }
  };

  return (
    <>
      <Navbar />
      <Toast ref={toast} />
      <div className="min-h-screen bg-[#fafafa] py-8">
        <div className="max-w-3xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Nueva Receta</h1>

              {/* Título */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Título</label>
                <InputText
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
                <InputTextarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full"
                  required
                />
              </div>

              {/* Propósito */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Propósito</label>
                <InputText
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              {/* Ingredientes */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Ingredientes</label>
                <MultiSelect
                  value={selectedIngredients}
                  onChange={(e) => setSelectedIngredients(e.value)}
                  options={availableIngredients}
                  optionLabel="name"
                  display="chip"
                  className="w-full"
                  required
                />
              </div>

              {/* Pasos */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Pasos</label>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <InputText
                        value={step}
                        onChange={(e) => {
                          const newSteps = [...steps];
                          newSteps[index] = e.target.value;
                          setSteps(newSteps);
                        }}
                        className="flex-1"
                        placeholder={`Paso ${index + 1}`}
                        required
                      />
                      <Button
                        icon="pi pi-trash"
                        className="p-button-danger"
                        onClick={() => setSteps(steps.filter((_, i) => i !== index))}
                        disabled={steps.length === 1}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    label="Agregar paso"
                    icon="pi pi-plus"
                    className="bg-orange-normal hover:bg-orange-hover border-none"
                    onClick={() => setSteps([...steps, ''])}
                  />
                </div>
              </div>

              {/* Imagen */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Imagen de la receta</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                  required
                />
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  label="Cancelar"
                  className="p-button-text"
                  onClick={() => navigate('/recipes')}
                />
                <Button
                  type="submit"
                  label="Crear receta"
                  className="bg-orange-normal hover:bg-orange-hover border-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewRecipePage;