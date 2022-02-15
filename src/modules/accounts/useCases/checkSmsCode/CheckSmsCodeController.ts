import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CheckSmsCodeUseCase } from './CheckSmsCodeUseCase';

class CkeckSmsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { phone, code } = request.query;

      const checkSmsCodeUseCase = container.resolve(CheckSmsCodeUseCase);

      const token = await checkSmsCodeUseCase.execute({
        phone: phone as string,
        code: code as string,
      });

      return response.json(token);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CkeckSmsController };
