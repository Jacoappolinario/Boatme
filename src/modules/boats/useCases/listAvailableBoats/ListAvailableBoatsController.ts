import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableBoatsUseCase } from './ListAvailableBoatsUseCase';

class ListAvailableBoatsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvailableBoatsUseCase = container.resolve(
      ListAvailableBoatsUseCase,
    );

    const boats = await listAvailableBoatsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.json(boats);
  }
}

export { ListAvailableBoatsController };
