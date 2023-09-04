const { Pool } = require('pg');
const format = require('pg-format');

const pool = new Pool({
  user: 'JPW',
  host: 'localhost',
  password: 'gogo2580',
  database: 'farmacia',
  port: 5432,
  allowExitOnIdle: true,
});
