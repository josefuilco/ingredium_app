import { Resend } from 'resend';
import { IMessageProvider } from '../../domain/providers/message.provider';
import { EnviromentVariable } from '../../../core/domain/interfaces/enviromentvariable.interface';

export class ResendMessageProvider implements IMessageProvider {
  private readonly resendClient: Resend;

  constructor(
    enviromentVariable: EnviromentVariable
  ) {
    this.resendClient = new Resend(enviromentVariable.resend);
  }

  async send(fullname: string, chanelId: string, code: string): Promise<boolean> {
    const emailSent = await this.resendClient.emails.send({
      from: 'messages@ingredium.site',
      to: chanelId,
      subject: 'Verificación de Cuenta Ingredium',
      html: `<h1>Hola ${fullname}</h1><p>Tu codigo de verificación es: ${code}</p>`
    });

    if (emailSent.error) {
      console.error(emailSent.error.message);
    }

    return emailSent.data.id !== undefined;
  }
}