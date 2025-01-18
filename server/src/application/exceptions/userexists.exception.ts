export class UserExistsException extends Error {
  constructor(cellphone: string) {
    super(`User ${cellphone} exists.`);
  }
}