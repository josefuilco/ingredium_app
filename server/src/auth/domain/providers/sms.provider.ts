export interface ISmsProvider {
  send(cellphone: string, code: string): Promise<boolean>;
}