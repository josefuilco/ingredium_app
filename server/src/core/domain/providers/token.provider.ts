export interface ITokenProvider {
  create<T = any>(payload: T): string;
  read<T = any>(token: string): T;
}