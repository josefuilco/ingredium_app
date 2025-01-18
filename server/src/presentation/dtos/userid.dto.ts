import z from 'zod';

export const userIdDto = z.object({
  id: z.string().regex(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/).nonempty()
}).required();