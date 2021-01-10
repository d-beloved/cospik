const studentTable = `
  DROP TABLE IF EXISTS students CASCADE;
  DROP TYPE IF EXISTS student_status;
  CREATE TYPE student_status AS ENUM (
    'enrolled',
    'not enrolled'
  );

  CREATE TABLE students (
    student_id serial PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status student_status NOT NULL DEFAULT 'not enrolled',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

export default studentTable;
