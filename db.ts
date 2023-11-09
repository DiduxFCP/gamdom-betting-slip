import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gamdon_betslip',
  password: 'test',
  port: 5432
});
