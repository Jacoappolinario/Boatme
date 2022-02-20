import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateBoatSpecificationUseCase } from './CreateBoatSpecificationUseCase';

class CreateBoatSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createBoatSpecificationUseCase = container.resolve(
      CreateBoatSpecificationUseCase,
    );

    const boats = await createBoatSpecificationUseCase.execute({
      boat_id: id,
      specifications_id,
    });
    console.log(
      '🚀 ~ file: CreateBoatSpecificationController.ts ~ line 19 ~ CreateBoatSpecificationController ~ handle ~ boats',
      boats,
    );

    return response.json(boats);
  }
}

export { CreateBoatSpecificationController };
