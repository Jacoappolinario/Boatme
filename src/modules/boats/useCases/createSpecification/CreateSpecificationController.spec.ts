import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Create Specification Controller', () => {
  beforeEach(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS (id, name, password, email, driver_license, "isAdmin", created_at, phone)
      values('${id}', 'Admin', '${password}', 'admin@boatme.com.br', 'XXXXXX', true, 'now()', '00000000')
      `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new specification', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@boatme.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/specifications')
      .send({
        name: 'Specification Supertest',
        description: 'Specification Supertest',
      })
      .set({
        Authorization: `Baerer ${token}`,
      });

    expect(response.status).toBe(200);
  });
});
