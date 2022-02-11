import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to create a new user', async () => {
    const user = {
      name: 'User Test',
      email: 'user@gmail.com',
      password: '12345',
      driver_license: '123456',
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      driver_license: user.driver_license,
    });

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

    expect(userCreated).toHaveProperty('id');
  });

  it('Should not be able to create a new user with email exists', async () => {
    expect(async () => {
      const user = {
        name: 'User Test',
        email: 'user@gmail.com',
        password: '12345',
        driver_license: '123456',
      };

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        driver_license: user.driver_license,
      });

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        driver_license: user.driver_license,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
