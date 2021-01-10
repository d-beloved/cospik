import { Pool } from 'pg';
import { connectionString } from './dbConfig';
import adminDB from './admin';
import studentDB from './students';
import courseDB from './courses';
import studentCourse from './studentCourses';

const queries = (query) => {
  const pool = new Pool(connectionString);
  (async function() {
    const client = await pool.connect();
    // console.log('I am here');
    await client.query(query);
    client.release();
  })()
};

queries(`${adminDB}${studentDB}${courseDB}${studentCourse}`);
