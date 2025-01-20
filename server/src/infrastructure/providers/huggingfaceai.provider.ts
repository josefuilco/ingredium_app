import { HfInference } from "@huggingface/inference";
import { IAIProvider } from "../../domain/providers/ai.provider.port";
import { EnviromentVariable } from "../../domain/interfaces/enviromentvariable.interface";

export class HuggingfaceAIProvider implements IAIProvider {
  private readonly hf: HfInference;

  constructor(enviromentVariable: EnviromentVariable) {
    this.hf = new HfInference(enviromentVariable.huggingface);
  }

  async generateText(prompt: string): Promise<string> {
    const response = await this.hf.textGeneration({
      model: 'EleutherAI/gpt-neo-2.7B',
      inputs: prompt,
      parameters: {
      max_length: 100,
      temperature: 0.7,
      top_p: 0.9
      }
    });
    return response.generated_text;
  }

  async generateImage(prompt: string): Promise<Buffer> {
    const response = await this.hf.textToImage({
      model: 'stable-diffusion',
      inputs: prompt
    });
    return Buffer.from(await response.bytes());
  }
  
  async generateImageToText(image: Buffer): Promise<string> {
    const response = await this.hf.imageToText({
      model: 'clip',
      data: image
    });
    return response.generated_text;
  }
}