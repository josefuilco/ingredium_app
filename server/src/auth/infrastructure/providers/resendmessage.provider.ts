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
      html: `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #2c3e50;
                color: #ffffff;
                text-align: center;
                padding: 20px 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .body {
                padding: 20px;
                color: #333333;
            }
            .body h2 {
                font-size: 22px;
                color: #2c3e50;
                margin-bottom: 10px;
            }
            .body p {
                font-size: 16px;
                line-height: 1.5;
                margin: 10px 0;
            }
            .code {
                display: inline-block;
                background-color: #2ecc71;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
            }
            .footer {
                background-color: #ecf0f1;
                color: #7f8c8d;
                text-align: center;
                padding: 10px 20px;
                font-size: 14px;
            }
            .footer a {
                color: #2c3e50;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Ingredium</h1>
            </div>
            <div class="body">
                <h2>Hola, ${fullname}!</h2>
                <p>Estamos emocionados de darte la bienvenida. A continuación, encontrarás tu código de verificación para completar el inicio de sesión.</p>
                <div class="code">
                    ${code}
                </div>
                <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
                <p>Gracias por confiar en Ingredium.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Ingredium. Todos los derechos reservados.</p>
                <p><a href="#">Política de privacidad</a> | <a href="#">Términos de servicio</a></p>
            </div>
        </div>
    </body>
    `});

    if (emailSent.error) {
      console.error(emailSent.error.message);
    }

    return emailSent.data.id !== undefined;
  }
}