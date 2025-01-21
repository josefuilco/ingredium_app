import { z } from 'zod';

export const deleteIngredientDto = z.object({
  id: z.coerce.number().int()
});