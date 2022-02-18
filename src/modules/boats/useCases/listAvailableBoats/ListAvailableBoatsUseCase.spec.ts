import { BoatsRepositoryInMemory } from '@modules/boats/repositories/in-memory/BoatsRepositoryInMemory';

import { ListAvailableBoatsUseCase } from './ListAvailableBoatsUseCase';

let boatsRepositoryInMemory: BoatsRepositoryInMemory;
let listAvailableBoatsUseCase: ListAvailableBoatsUseCase;

describe('List Boats', () => {
  beforeEach(() => {
    boatsRepositoryInMemory = new BoatsRepositoryInMemory();
    listAvailableBoatsUseCase = new ListAvailableBoatsUseCase(
      boatsRepositoryInMemory,
    );
  });

  it('Should be able to list available boats', async () => {
    const boat = await boatsRepositoryInMemory.create({
      name: 'Boat1',
      description: 'Boat description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 60,
      brand: 'Boat_brand',
      category_id: 'category_id',
    });

    const boats = await listAvailableBoatsUseCase.execute({});

    expect(boats).toEqual([boat]);
  });

  it('Should be able to list all available boats by brand', async () => {
    const boat = await boatsRepositoryInMemory.create({
      name: 'Boat2',
      description: 'Boat description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Boat_brand_test',
      category_id: 'category_id',
    });

    const boats = await listAvailableBoatsUseCase.execute({
      brand: 'Boat_brand_test',
    });

    expect(boats).toEqual([boat]);
  });

  it('Should be able to list all available boats by name', async () => {
    const boat = await boatsRepositoryInMemory.create({
      name: 'Boat3',
      description: 'Boat description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Boat_brand_test',
      category_id: 'category_id',
    });

    const boats = await listAvailableBoatsUseCase.execute({
      name: 'Boat3',
    });

    expect(boats).toEqual([boat]);
  });

  it('Should be able to list all available boats by category', async () => {
    const boat = await boatsRepositoryInMemory.create({
      name: 'Boat4',
      description: 'Boat description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Boat_brand_test',
      category_id: '12345',
    });

    const boats = await listAvailableBoatsUseCase.execute({
      category_id: '12345',
    });
    expect(boats).toEqual([boat]);
  });
});
