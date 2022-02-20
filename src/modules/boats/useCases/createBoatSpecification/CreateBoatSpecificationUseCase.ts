import { inject, injectable } from 'tsyringe';

import { Boat } from '@modules/boats/infra/typeorm/entities/Boat';
import { IBoatsRepository } from '@modules/boats/repositories/IBoatsRepository';
import { ISpecificationsRepository } from '@modules/boats/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  boat_id: string;
  specifications_id: string[];
}

@injectable()
class CreateBoatSpecificationUseCase {
  constructor(
    @inject('BoatsRepository')
    private boatsRepository: IBoatsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ boat_id, specifications_id }: IRequest): Promise<Boat> {
    const boatExists = await this.boatsRepository.findById(boat_id);

    if (!boatExists) {
      throw new AppError('Boat does not exists!');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    boatExists.specifications = specifications;

    await this.boatsRepository.create(boatExists);

    return boatExists;
  }
}

export { CreateBoatSpecificationUseCase };
