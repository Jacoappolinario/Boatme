import { CategoriesRepositoryInMemory } from '@modules/boats/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;

describe('List Categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('Should be able to list all categories', async () => {
    await createCategoryUseCase.execute({
      name: 'Category Test 01',
      description: 'Category Description Test',
    });

    await createCategoryUseCase.execute({
      name: 'Category Test 02',
      description: 'Category Description Test',
    });

    const allCategories = await listCategoriesUseCase.execute();

    expect(allCategories.length).toBe(2);
    expect(allCategories[0]).toHaveProperty('id');
  });
});
