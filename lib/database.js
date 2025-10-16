import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'LarLeed',
  user: 'larleed_user',
  password: '1500',
});

export default pool;