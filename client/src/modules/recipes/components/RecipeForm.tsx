import React, { useState } from 'react';
import { RecipeServices } from '../services/RecipeServices';
import { Recipe } from '../models/recipe';
import TextField from '../../shared/components/TextField';
import ActionButton from '../../shared/components/ActionButton';
import { Ingredient } from '../models/ingredient';
import MultipleOptionField from '../../shared/components/MultipleOptionField';

const CreateRecipeForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState('');
  const [steps, setSteps] = useState('');
  const [ingredients, setIngredients] = useState();
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const recipe: Recipe = {
      id: '', // Add appropriate id value
      userId: 'user-id', // Add appropriate userId value
      title,
      description,
      purpose,
      steps: steps.split('\n'),
      ingredients: ingredients.split('\n').map(ingredient => {
        const newIngredient: Ingredient = {
          id: ingredient
        };
        return newIngredient;
      }),
      ownerId: 'user-id'
    };

    if (image) {
      try {
        const response = await RecipeServices.createRecipe(recipe, image);
        console.log('Recipe created:', response);
      } catch (error) {
        console.error('Error creating recipe:', error);
      }
    } else {
      console.error('Image is required');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        instruction="Enter the title of the recipe"
        classname="mb-4"
        restriction={/^[a-zA-Z\s]*$/}
      />
      <TextField
        name="description"
        label="Description"
        instruction="Enter the description of the recipe"
        classname="mb-4"
      />
      <TextField
        name="purpose"
        label="Purpose"
        instruction="Enter the purpose of the recipe"
        classname="mb-4"
      />
      <div className="flex flex-col gap-2 mb-4">
        <label className="font-bold" htmlFor="steps">Steps</label>
        <textarea
          className="h-[100px] w-full hover:border-mint-normal focus:shadow-[0_0_0_0.2rem_rgba(39,207,177,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(39,207,177,0.5)]"
          id="steps"
          name="steps"
          onChange={(e) => setSteps(e.target.value)}
          required
        />
        <p className="text-[#5e5e5e]">Enter the steps of the recipe</p>
      </div>
      <MultipleOptionField
        name="ingredients"
        label="Ingredients"
        instruction="Select the ingredients for the recipe"
        classname="mb-4"
        options={[
          { label: 'Salt', value: 'salt' },
          { label: 'Sugar', value: 'sugar' },
          { label: 'Flour', value: 'flour' },
        ]}
      />
      <div className="mb-4">
        <label className="font-bold" htmlFor="image">Image</label>
        <input
          className="h-[40px] w-full hover:border-mint-normal focus:shadow-[0_0_0_0.2rem_rgba(39,207,177,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(39,207,177,0.5)]"
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />
      </div>
      <ActionButton label="Create Recipe" type="submit" />
    </form>
  );
};

export default CreateRecipeForm;