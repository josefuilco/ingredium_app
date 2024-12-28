import z from 'zod';

export const userAuthenticationDto = z.object({
  cellphone: z.string().regex(/\d{9}/, 'Is not cellphone number.').nonempty()
}).required();