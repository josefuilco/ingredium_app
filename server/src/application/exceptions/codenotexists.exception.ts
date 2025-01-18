export class CodeNotExistsException extends Error {
  constructor(code: string) {
    super(`Code ${code} not exists.`);
  }
}