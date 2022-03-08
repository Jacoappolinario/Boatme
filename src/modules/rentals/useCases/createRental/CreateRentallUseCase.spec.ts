import dayjs from 'dayjs';

import { BoatsRepositoryInMemory } from '@modules/boats/repositories/in-memory/BoatsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let boatsRepositoryInMemory: BoatsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    boatsRepositoryInMemory = new BoatsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      boatsRepositoryInMemory,
    );
  });

  it('Should be able to create a new rental', async () => {
    const boat = await boatsRepositoryInMemory.create({
      name: 'Test',
      description: 'Boat Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      boat_id: boat.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      boat_id: '1111',
      expected_return_date: dayAdd24Hours,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        boat_id: '121212',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it('Should not be able to create a new rental if there is another open the same boat', async () => {
    await rentalsRepositoryInMemory.create({
      boat_id: 'test',
      expected_return_date: dayAdd24Hours,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '321',
        boat_id: 'test',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Boat is unavailable'));
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '123',
        boat_id: 'test',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
