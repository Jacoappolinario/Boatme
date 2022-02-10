import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Create Specification Controller', () => {
  beforeEach(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new specification', async () => {
    const response = await request(app).post('/specifications').send({
      name: 'Specification Supertest',
      description: 'Specification Supertest',
    });

    expect(response.status).toBe(200);
  });
});
