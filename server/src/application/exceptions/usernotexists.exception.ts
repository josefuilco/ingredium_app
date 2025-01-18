export class UserNotExistsException extends Error {
  constructor() {
    super(`User not exists.`);
  }
}