import { User } from "../models/user.model";

export class UserBuilder {
  private id: string;
  private names: string;
  private surnames: string;
  private cellphone: string;
  private email: string;
  private nacionality: string;

  constructor() {
    this.reset();
  }

  reset() {
    this.id = '';
    this.names = '';
    this.surnames = '';
    this.cellphone = '';
    this.email = '';
    this.nacionality = '';
  }

  addId(id: string) {
    this.id = id;
    return this;
  }

  addNames(names: string) {
    this.names = names;
    return this;
  }

  addSurnames(surnames: string) {
    this.surnames = surnames;
    return this;
  }

  addCellphone(cellphone: string) {
    this.cellphone = cellphone;
    return this;
  }

  addEmail(email: string) {
    this.email = email;
    return this;
  }

  addNacionality(nacionality: string) {
    this.nacionality = nacionality;
    return this;
  }

  build() {
    const user = new User(
      this.id,
      this.names,
      this.surnames,
      this.cellphone,
      this.email,
      this.nacionality
    );
    this.reset();
    return user;
  }
}