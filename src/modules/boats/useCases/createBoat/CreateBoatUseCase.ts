import { inject, injectable } from 'tsyringe';

import { Boat } from '@modules/boats/infra/typeorm/entities/Boat';
import { IBoatsRepository } from '@modules/boats/repositories/IBoatsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateBoatUseCase {
  constructor(
    @inject('BoatsRepository')
    private boatsRepository: IBoatsRepository,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Boat> {
    const boatAlreadyExists = await this.boatsRepository.findByLicensePlate(
      license_plate,
    );

    if (boatAlreadyExists) {
      throw new AppError('Boat already exists');
    }

    const boat = await this.boatsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return boat;
  }
}

export { CreateBoatUseCase };
