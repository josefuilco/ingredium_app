export interface IObjectStorageProvider {
  uploadFile(file: Buffer, key: string): Promise<string>;
  getFileUrl(key: string): Promise<string>;
}