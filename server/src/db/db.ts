import { Pool } from 'pg';
import { connectionString } from './dbConfig';

const queries = (query) => {
  const pool = new Pool(connectionString);
  ;(async function() {
    const client = await pool.connect()
    await client.query(query)
    client.release()
  })()
};

queries();
