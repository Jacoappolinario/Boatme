import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/accounts/infra/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
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

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
