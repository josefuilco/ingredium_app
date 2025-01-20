import { z } from 'zod';

export const ingredientNameDto = z.object({
  name: z.string().min(1, 'Name is required')
});