import { Bucket, Storage } from "@google-cloud/storage";
import { IObjectStorageProvider } from "../../domain/providers/objectstorage.provider.port";
import { EnviromentVariable } from "../../domain/interfaces/enviromentvariable.interface";

export class GCPObjectStorageProvider implements IObjectStorageProvider {
  private readonly storage: Storage;
  private readonly bucket: Bucket;
  
  constructor (
    enviromentVariable: EnviromentVariable
  ) {
    this.storage = new Storage({ keyFilename: enviromentVariable.cloudStorage.credential });
    this.bucket = this.storage.bucket(enviromentVariable.cloudStorage.bucket);
  }

  async uploadFile(file: Buffer, key: string): Promise<string> {
    try {
      const fileUpload = this.bucket.file(key);

      await fileUpload.save(file, {
        metadata: {
          contentType: 'application/octet-stream'
        },
      });

      return this.getFileUrl(key);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async getFileUrl(key: string): Promise<string> {
    const file = this.bucket.file(key);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 60 * 15 * 1000
    });

    return url;
  }
}