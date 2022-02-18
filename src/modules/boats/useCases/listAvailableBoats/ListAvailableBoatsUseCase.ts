import { inject, injectable } from 'tsyringe';

import { Boat } from '@modules/boats/infra/typeorm/entities/Boat';
import { IBoatsRepository } from '@modules/boats/repositories/IBoatsRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableBoatsUseCase {
  constructor(
    @inject('BoatsRepository')
    private boatsRepository: IBoatsRepository,
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Boat[]> {
    const boats = await this.boatsRepository.findAvailable(
      brand,
      category_id,
      name,
    );

    return boats;
  }
}

export { ListAvailableBoatsUseCase };
