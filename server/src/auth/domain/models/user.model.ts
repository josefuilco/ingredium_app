export class User {
  constructor(
    private readonly id: string,
    private readonly names: string,
    private readonly surnames: string,
    private readonly cellphone: string,
    private readonly email: string,
    private readonly nacionality: string
  ) {}

  getId(): string {
    return this.id;
  }

  getNames(): string {
    return this.names;
  }

  getSurnames(): string {
    return this.surnames;
  }

  getCellphone(): string {
    return this.cellphone;
  }

  getEmail(): string {
    return this.email;
  }

  getNacionality(): string {
    return this.nacionality;
  }
}