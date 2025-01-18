export interface ICodeRepository {
  findByUserId(userId: string): Promise<string>;
  findUserIdByCode(code: string): Promise<string>;
  save(code: string, userId: string): Promise<boolean>;
  delete(code: string): Promise<boolean>;
}