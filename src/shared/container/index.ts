import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { BoatsImagesRepository } from '@modules/boats/infra/typeorm/repositories/BoatsImagesRepository';
import { BoatsRepository } from '@modules/boats/infra/typeorm/repositories/BoatsRepository';
import { CategoriesRepository } from '@modules/boats/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/boats/infra/typeorm/repositories/SpecificationsRepository';
import { IBoatsImagesRepository } from '@modules/boats/repositories/IBoatsImagesRepository';
import { IBoatsRepository } from '@modules/boats/repositories/IBoatsRepository';
import { ICategoryRepository } from '@modules/boats/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/boats/repositories/ISpecificationsRepository';
import { RentalsRepository } from '@modules/rentals/infra/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

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

container.registerSingleton<IBoatsRepository>(
  'BoatsRepository',
  BoatsRepository,
);

container.registerSingleton<IBoatsImagesRepository>(
  'BoatsImagesRepository',
  BoatsImagesRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);
