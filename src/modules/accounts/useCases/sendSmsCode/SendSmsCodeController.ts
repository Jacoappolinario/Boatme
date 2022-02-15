import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendSmsCodeUseCase } from './SendSmsCodeUseCase';

class SendSmsCodeController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { phone } = request.query;

      const sendSmsCodeUseCase = container.resolve(SendSmsCodeUseCase);

      const requestResult = await sendSmsCodeUseCase.execute(phone as string);

      return response.json(requestResult);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { SendSmsCodeController };
