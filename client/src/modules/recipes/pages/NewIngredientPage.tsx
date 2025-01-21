import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ingredient } from '../models/Ingredient';
import { IngredientServices } from '../services/IngredientServices';
import Navbar from '../../shared/components/Navbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';

const NewIngredientPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState<number>(0);
  const navigate = useNavigate();
  const ingredientServices = new IngredientServices();
  const toast = React.useRef<Toast>(null);

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

    try {
      const newIngredient: Ingredient = {
        id: 0, // The backend will assign the real ID
        name,
        description,
        calories
      };

      await ingredientServices.createIngredient(newIngredient);
      showSuccessToast('Ingrediente creado correctamente');
      navigate('/recipes');
    } catch (error) {
      console.error('Error creating ingredient:', error);
      showErrorToast('No se pudo crear el ingrediente');
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
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Nuevo Ingrediente</h1>

              {/* Nombre */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                <InputText
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              {/* Calorías */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Calorías</label>
                <InputNumber
                  value={calories}
                  onValueChange={(e) => setCalories(e.value || 0)}
                  min={0}
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
                  label="Crear ingrediente"
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

export default NewIngredientPage;