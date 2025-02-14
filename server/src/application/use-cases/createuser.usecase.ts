import { UserExistsException } from "../exceptions/userexists.exception";
import { User } from "../../domain/models/user.model";
import { IUserRepository } from "../../domain/repositories/user.repository.port";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(user: User): Promise<boolean> {
    const exists = await this.userRepository.findByEmail(user.getEmail());
    if (exists) throw new UserExistsException(`${user.getNames()} ${user.getSurnames()}`);

    const isCreated = await this.userRepository.save(user);
    return isCreated;
  }
}