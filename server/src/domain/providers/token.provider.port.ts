import { secretType } from "../../types";

export interface ITokenProvider {
  create<T = any>(payload: T, secretType: secretType): string;
  read<T = any>(token: string, secretType: secretType): T;
}