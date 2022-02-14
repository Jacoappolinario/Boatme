import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Authenticate User', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS (id, name, password, email, driver_license, "isAdmin", created_at)
        values('${id}', 'Admin', '${password}', 'admin@boatme.com.br','XXXXXX', true, 'now()')
        `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to authenticate an user', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'admin@boatme.com.br',
      password: 'admin',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.name).toEqual('Admin');
  });
});
