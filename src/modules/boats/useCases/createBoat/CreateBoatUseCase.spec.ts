import { BoatsRepositoryInMemory } from '@modules/boats/repositories/in-memory/BoatsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateBoatUseCase } from './CreateBoatUseCase';

let boatsRepositoryInMemory: BoatsRepositoryInMemory;
let createBoatUseCase: CreateBoatUseCase;

describe('Create Boat', () => {
  beforeEach(() => {
    boatsRepositoryInMemory = new BoatsRepositoryInMemory();
    createBoatUseCase = new CreateBoatUseCase(boatsRepositoryInMemory);
  });

  it('Should be able to create a new boat', async () => {
    const boat = await createBoatUseCase.execute({
      name: 'Name Boat',
      description: 'Description Boat',
      daily_rate: 100,
      license_plate: 'ABC-12346',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(boat).toHaveProperty('id');
  });

  it('Should not be able to create a boat with exists license plate', () => {
    expect(async () => {
      await createBoatUseCase.execute({
        name: 'Boat1',
        description: 'Description',
        daily_rate: 100,
        license_plate: 'ABC-12346',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });

      await createBoatUseCase.execute({
        name: 'Boat2',
        description: 'Description',
        daily_rate: 100,
        license_plate: 'ABC-12346',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a boat with available true by default', async () => {
    const boat = await createBoatUseCase.execute({
      name: 'Boat Available',
      description: 'Description Boat',
      daily_rate: 100,
      license_plate: 'ABC-12346',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(boat.available).toBe(true);
  });
});
