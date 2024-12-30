export class UserExistsError extends Error {
  constructor(cellphone: string) {
    super(`User ${cellphone} exists.`);
  }
}