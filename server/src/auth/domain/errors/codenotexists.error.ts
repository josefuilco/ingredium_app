export class CodeNotExistsError extends Error {
  constructor(code: string) {
    super(`Code ${code} not exists.`);
  }
}