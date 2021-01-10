import bcrypt from 'bcrypt';

const saltRounds: Number = 10;
const adminPswd: String = 'adminpassword';
const hashPassword: String = bcrypt.hashSync(adminPswd, saltRounds);

const adminTable = `
  DROP TABLE IF EXISTS admin CASCADE;
  CREATE TABLE admin (
    ID serial PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO admin (username, password)
  VALUES('admin', '${hashPassword}');
`;

export default adminTable;
