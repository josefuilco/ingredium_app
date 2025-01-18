import { UserNotExistsException } from "../exceptions/usernotexists.exception";
import { User } from "../../domain/models/user.model";
import { IUserRepository } from "../../domain/repositories/user.repository.port";

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(user: User): Promise<boolean> {
    const exists = await this.userRepository.findById(user.getId());
    if (!exists) throw new UserNotExistsException();
    const isUpdated = await this.userRepository.update(user);
    return isUpdated;
  }
}