import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { connectionString } from '../db/dbConfig';

const adminPassword = bcrypt.hashSync('ispassword', 10);

const adminSql = `INSERT INTO admin (username, password)VALUES('admin', '${adminPassword}')`;
const studentSql = `INSERT INTO students (student_id, firstname, lastname, email)VALUES('53d847d4-32df-4e68-b236-67e1137f7f35', 'firstOfThem', 'lastOneThere', 'myspecial@mail.com')`;
const courseSql = `INSERT INTO courses (course_id, course_name)VALUES('e8138122-62da-4204-a586-dfeb8cb51e55', 'Test Course')`;

const queries = (query) => {
  const pool = new Pool(connectionString);
  ;(async () => {
    const client = await pool.connect();
    try {
      await client.query(query);
    } finally {
    client.release()
  }
  })().catch(err => console.log(err.stack))
};

queries(adminSql);
queries(studentSql);
queries(courseSql);
