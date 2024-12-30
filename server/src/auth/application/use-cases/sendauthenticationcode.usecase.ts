import { UserNotExistsError } from "../../domain/errors/usernotexists.error";
import { IMessageProvider } from "../../domain/providers/message.provider";
import { ICodeRepository } from "../../domain/repositories/code.repository";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class SendAuthenticationCodeUseCase {
  private static readonly pattern = 'ABCDEFGHIJKMNLOPQRSTUVWXYZ0123456789';

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly codeRepository: ICodeRepository,
    private readonly messageProvider: IMessageProvider
  ) {}

  async execute(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UserNotExistsError();

    const code = await this.codeRepository.findByUserId(user.getId()) || await this.uniqueCode();

    const [codeSavedSuccess, messageSentSuccess] = await Promise.all([
      this.codeRepository.save(code, user.getId()),
      this.messageProvider.send(`${user.getNames()} ${user.getSurnames()}`, user.getEmail(), code)
    ]);

    return messageSentSuccess && codeSavedSuccess;
  }

  private async uniqueCode(): Promise<string> {
    let code: string;
    let codeExists: string | null;

    do {
      code = this.generateCode();
      codeExists = await this.codeRepository.findUserIdByCode(code);
    } while (codeExists);

    return code;
  }

  private generateCode(): string {
    const patternLength = SendAuthenticationCodeUseCase.pattern.length;
    
    return Array.from(
      { length: 6 }, 
      () => SendAuthenticationCodeUseCase.pattern[Math.floor(Math.random() * patternLength)]
    ).join('');
  }
}