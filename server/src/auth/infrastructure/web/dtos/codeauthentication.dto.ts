import z from 'zod';

export const codeAuthenticationDto = z.object({
  code: z.string().min(6).max(6).trim().nonempty()
}).required();