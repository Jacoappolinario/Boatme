import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateBoatUseCase } from './CreateBoatUseCase';

class CreateBoatController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = request.body;

    const createBoatUseCase = container.resolve(CreateBoatUseCase);

    const boat = await createBoatUseCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return response.status(201).json(boat);
  }
}

export { CreateBoatController };
