import { ITokenProvider } from "../../../core/domain/providers/token.provider";
import { CodeNotExistsError } from "../../domain/errors/codenotexists.error";
import { ICodeRepository } from "../../domain/repositories/code.repository";

export class CodeAuthenticationUseCase {
  constructor(
    private readonly codeRepository: ICodeRepository,
    private readonly tokenProvider: ITokenProvider
  ) {}

  async execute(code: string): Promise<string> {
    const userId = await this.codeRepository.findUserIdByCode(code);
    if (!userId) throw new CodeNotExistsError(code);
    const token = this.tokenProvider.create<string>(userId, 'access');
    await this.codeRepository.delete(code);
    return token;
  }
}