export interface IMessageProvider {
  send(fullname: string, chanelId: string, code: string): Promise<boolean>;
}