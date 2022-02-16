import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS (id, name, password, email, driver_license, "isAdmin", created_at, phone)
    values('${id}', 'Admin', '${password}', 'admin@boatme.com.br', 'XXXXXX', true, 'now()', '00000000')
    `,
  );

  await connection.close;
}

create().then(() => console.log('User admin created'));
