import { Repository } from "typeorm";
import { CodeEntity } from "../entities/code.entity";
import { ICodeRepository } from "../../../domain/repositories/code.repository.port";

export class DatabaseCodeRepository implements ICodeRepository {
  constructor(
    private readonly codeEntity: Repository<CodeEntity>
  ) {}

  async findByUserId(userId: string): Promise<string> {
    const codeFound = await this.codeEntity.findOne({
      where: { userId },
      select: ['code']
    });

    if (!codeFound)
      return;

    return codeFound.code;
  }

  async findUserIdByCode(code: string): Promise<string> {
    const codeFound = await this.codeEntity.findOne({
      where: { code },
      select: ['userId']
    });

    if (!codeFound)
      return;

    return codeFound.userId;
  }

  async save(code: string, userId: string): Promise<boolean> {
    const codeCreated = await this.codeEntity.save({ code, userId });
    return codeCreated !== undefined;
  }

  async delete(code: string): Promise<boolean> {
    const codeDeleted = await this.codeEntity.delete({ code });
    return codeDeleted.affected > 0;
  }
}