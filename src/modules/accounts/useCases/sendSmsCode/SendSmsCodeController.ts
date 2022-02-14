import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendSmsCodeUseCase } from './SendSmsCodeUseCase';

class SendSmsCodeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { phone } = request.query;

    const sendSmsCodeUseCase = container.resolve(SendSmsCodeUseCase);

    const status = await sendSmsCodeUseCase.execute(phone as string);

    return response.json(status);
  }
}

export { SendSmsCodeController };
