import z from 'zod';

export const userAuthenticationDto = z.object({
  email: z.string().email().nonempty()
}).required();