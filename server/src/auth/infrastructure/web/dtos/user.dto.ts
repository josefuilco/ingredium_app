import z from "zod";

export const userDto = z.object({
  id: z.string().regex(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/, 'Id not an UUID').nonempty(),
  names: z.string().trim().min(1).max(25).nonempty(),
  surnames: z.string().min(1).max(25).trim().nonempty(),
  cellphone: z.string().regex(/\d{9}/, 'Is not cellphone number.').nonempty(),
  email: z.string().trim().email().nonempty(),
  nacionality: z.string().min(1).max(25).trim().nonempty()
}).required();