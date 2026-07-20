const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'database_name',
  user: process.env.DB_USER || 'database_user',
  password: process.env.DB_PASSWORD || 'database_password',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
