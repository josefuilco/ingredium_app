import { UserExistsError } from "../../domain/errors/userexists.error";
import { User } from "../../domain/models/user.model";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(user: User): Promise<boolean> {
    const exists = await this.userRepository.findByCellphone(user.getCellphone());
    if (exists) throw new UserExistsError(user.getCellphone());

    const isCreated = await this.userRepository.save(user);
    return isCreated;
  }
}