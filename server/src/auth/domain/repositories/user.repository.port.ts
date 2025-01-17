import { User } from "../models/user.model";

export interface IUserRepository {
  findById(id: string): Promise<User>;
  findByCellphone(cellphone: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<boolean>;
  update(user: User): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}