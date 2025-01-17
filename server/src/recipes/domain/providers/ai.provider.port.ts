export interface IAIProvider {
  generateText(prompt: string): Promise<string>;
  generateImage(prompt: string): Promise<Buffer>;
  generateImageToText(image: Buffer): Promise<string>;
}