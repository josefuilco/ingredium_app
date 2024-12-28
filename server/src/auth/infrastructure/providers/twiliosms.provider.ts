import twilio from 'twilio';
import { ISmsProvider } from '../../domain/providers/sms.provider';
import { EnviromentVariable } from '../../../core/domain/interfaces/enviromentvariable.interface';

export class TwilioSmsProvider implements ISmsProvider {
  private readonly accountSid: string;
  private readonly authToken: string;
  private readonly twilioClient: twilio.Twilio;

  constructor(
    private readonly enviromentVariable: EnviromentVariable
  ) {
    this.accountSid = enviromentVariable.twilio.accountSid;
    this.authToken = enviromentVariable.twilio.authToken;
    this.twilioClient = twilio(this.accountSid, this.authToken);
  }

  async send(cellphone: string, code: string): Promise<boolean> {
    const message = await this.twilioClient.messages.create({
      body: `Hola, te saludamos de ingredium. Tu codigo de verificación es ${code}`,
      from: this.enviromentVariable.twilio.cellphone,
      to: cellphone
    });

    return message.errorCode === null;
  }
}