import { z } from 'zod';

export const ingredientDto = z.object({
  id: z.coerce.number().int(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  calories: z.number().min(0, 'Calories must be a positive number')
});