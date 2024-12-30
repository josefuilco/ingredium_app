import { UserNotExistsError } from "../../domain/errors/usernotexists.error";
import { User } from "../../domain/models/user.model";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(user: User): Promise<boolean> {
    const exists = await this.userRepository.findById(user.getId());
    if (!exists) throw new UserNotExistsError();
    const isUpdated = await this.userRepository.update(user);
    return isUpdated;
  }
}