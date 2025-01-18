import { ITokenProvider } from "../../domain/providers/token.provider.port";
import { CodeNotExistsException } from "../exceptions/codenotexists.exception";
import { ICodeRepository } from "../../domain/repositories/code.repository.port";

export class GetAccessKeyUseCase {
  constructor(
    private readonly codeRepository: ICodeRepository,
    private readonly tokenProvider: ITokenProvider
  ) {}

  async execute(code: string): Promise<string> {
    const userId = await this.codeRepository.findUserIdByCode(code);
    if (!userId) throw new CodeNotExistsException(code);
    const token = this.tokenProvider.create<string>(userId, 'access');
    await this.codeRepository.delete(code);
    return token;
  }
}