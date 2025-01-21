import React, { useState } from 'react';
import { IngredientServices } from '../services/IngredientServices';
import { Ingredient } from '../models/Ingredient';

const ingredientsService = new IngredientServices();

const CreateIngredientForm: React.FC = () => {
  const [ingredient, setIngredient] = useState<Ingredient>(
    {
      id: 0,
      name: '',
      description: '',
      calories: 0
    }
  );
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIngredient({ ...ingredient, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await ingredientsService.createIngredient(ingredient);
      console.log('Ingredient created:', response);
    } catch (error) {
      console.error('Error creating ingredient:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre del Ingrediente:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={ingredient.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Cantidad:</label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={ingredient.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="unit">Unidad:</label>
        <select
          id="unit"
          name="unit"
          value={ingredient.unit}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una unidad</option>
          <option value="grams">Gramos</option>
          <option value="kilograms">Kilogramos</option>
          <option value="liters">Litros</option>
          <option value="milliliters">Mililitros</option>
          <option value="units">Unidades</option>
        </select>
      </div>
      <button type="submit">Crear Ingrediente</button>
    </form>
  );
};

export default CreateIngredientForm;