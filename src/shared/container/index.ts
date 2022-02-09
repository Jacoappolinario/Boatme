import { container } from 'tsyringe';

import { CategoriesRepository } from '@modules/boats/infra/typeorm/repositories/CategoriesRepository';
import { ICategoryRepository } from '@modules/boats/repositories/ICreateCategoryDTO';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
