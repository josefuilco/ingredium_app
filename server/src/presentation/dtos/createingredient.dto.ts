import { z } from 'zod';

export const createIngredientDto = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  calories: z.number().min(0, 'Calories must be a positive number')
});