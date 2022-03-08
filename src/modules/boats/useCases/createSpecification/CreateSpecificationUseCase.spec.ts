import { SpecificationRepositoryInMemory } from '@modules/boats/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe('Create Specification', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory,
    );
  });

  it('Should be able to create a new specification', async () => {
    const specification = {
      name: 'Specification Test',
      description: 'Specification description test',
    };

    const specificationCreated = await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    expect(specificationCreated).toHaveProperty('id');
  });

  it('Should not be able to create a new specification with name exists', async () => {
    const specification = {
      name: 'Specification Test',
      description: 'Specification description test',
    };

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    await expect(
      createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      }),
    ).rejects.toEqual(new AppError('Specification already exists!'));
  });
});
