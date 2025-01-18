import { SecretType } from "../types/secret.type";

export interface ITokenProvider {
  create<T = any>(payload: T, secretType: SecretType): string;
  read<T = any>(token: string, secretType: SecretType): T;
}