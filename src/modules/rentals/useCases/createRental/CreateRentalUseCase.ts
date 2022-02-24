import { inject, injectable } from 'tsyringe';

import { IBoatsRepository } from '@modules/boats/repositories/IBoatsRepository';
import { Rental } from '@modules/rentals/infra/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  boat_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('BoatsRepository')
    private boatsRepository: IBoatsRepository,
  ) {}

  async execute({
    user_id,
    boat_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const boatUnavailable = await this.rentalsRepository.findOpenRentalByBoat(
      boat_id,
    );

    if (boatUnavailable) {
      throw new AppError('Boat is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compare < minimumHour) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      boat_id,
      expected_return_date,
    });

    await this.boatsRepository.updateAvailable(boat_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
