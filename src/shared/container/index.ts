import { container } from 'tsyringe';

import { CategoriesRepository } from '@modules/boats/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/boats/infra/typeorm/repositories/SpecificationsRepository';
import { ICategoryRepository } from '@modules/boats/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/boats/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);
