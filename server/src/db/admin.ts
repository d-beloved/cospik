import bcrypt from 'bcrypt';

const adminPswd: String = process.env.ADMIN_PSWD;
const hashPassword: String = bcrypt.hashSync(adminPswd, 10);

const adminTable = `
  DROP TABLE IF EXISTS admin CASCADE;
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE admin (
    ID uuid DEFAULT uuid_generate_v4 (),
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
  );

  INSERT INTO admin (username, password)
  VALUES('admin', '${hashPassword}');
`;

export default adminTable;
