import { BoatsRepositoryInMemory } from '@modules/boats/repositories/in-memory/BoatsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/boats/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateBoatSpecificationUseCase } from './CreateBoatSpecificationUseCase';

let boatsRepositoryInMemory: BoatsRepositoryInMemory;
let createBoatSpecificationUseCase: CreateBoatSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Boat Specification', () => {
  beforeEach(() => {
    boatsRepositoryInMemory = new BoatsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createBoatSpecificationUseCase = new CreateBoatSpecificationUseCase(
      boatsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('Should not be able to add a new specification to a now-existent boat', async () => {
    const boat_id = '1234';
    const specifications_id = ['54321'];

    await expect(
      createBoatSpecificationUseCase.execute({
        boat_id,
        specifications_id,
      }),
    ).rejects.toEqual(new AppError('Boat does not exists!'));
  });

  it('Should be able to add a new specification to the boat', async () => {
    const boat = await boatsRepositoryInMemory.create({
      name: 'Name Boat',
      description: 'Description Boat',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });

    const specifications_id = [specification.id];

    const specificationBoats = await createBoatSpecificationUseCase.execute({
      boat_id: boat.id,
      specifications_id,
    });

    expect(specificationBoats).toHaveProperty('specifications');
    expect(specificationBoats.specifications.length).toBe(1);
  });
});
