import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Supertest',
    });

    expect(response.status).toBe(201);
  });
});
