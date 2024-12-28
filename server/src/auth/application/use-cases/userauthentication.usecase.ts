import { UserNotExistsError } from "../../domain/errors/usernotexists.error";
import { ISmsProvider } from "../../domain/providers/sms.provider";
import { ICodeRepository } from "../../domain/repositories/code.repository";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class UserAuthenticationUseCase {
  private static readonly pattern = 'ABCDEFGHIJKMNLOPQRSTUVWXYZ0123456789';

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly codeRepository: ICodeRepository,
    private readonly smsProvider: ISmsProvider
  ) {}

  async execute(cellphone: string): Promise<boolean> {
    const user = await this.userRepository.findByCellphone(cellphone);
    if (!user) throw new UserNotExistsError();

    const code = await this.codeRepository.findByUserId(user.getId()) || await this.uniqueCode();
    const [codeSavedSuccess, smsSentSuccess] = await Promise.all([
      this.codeRepository.save(code, user.getId()),
      this.smsProvider.send(user.getCellphone(), code)
    ]);

    return smsSentSuccess && codeSavedSuccess;
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
    const patternLength = UserAuthenticationUseCase.pattern.length;
    
    return Array.from(
      { length: patternLength }, 
      () => UserAuthenticationUseCase.pattern[Math.floor(Math.random() * patternLength)]
    ).join('');
  }
}