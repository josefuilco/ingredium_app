import { UserNotExistsError } from "../../domain/errors/usernotexists.error";
import { IUserRepository } from "../../domain/repositories/user.repository.port";

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<boolean> {
    const exists = await this.userRepository.findById(userId);
    if (!exists) throw new UserNotExistsError();
    const isDeleted = await this.userRepository.delete(userId);
    return isDeleted;
  }
}