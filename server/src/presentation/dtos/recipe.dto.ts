import { z } from 'zod';

export const recipeDto = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  purpose: z.string().optional(),
  steps: z.array(z.string()).optional(),
  ingredients: z.array(z.number()).optional()
});