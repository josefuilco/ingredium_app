import { UserNotExistsException } from "../exceptions/usernotexists.exception";
import { IUserRepository } from "../../domain/repositories/user.repository.port";
import { UserInformationDto } from "../dtos/userinformation.dto";

export class FindUserByIdUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<UserInformationDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotExistsException();
    
    return {
      fullname: `${user.getNames()}, ${user.getSurnames()}`,
      nationality: user.getNacionality()
    };
  }
}