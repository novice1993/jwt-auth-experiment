import pool from './pool';

const createUsersTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log('"users" table is ready.');
  } catch (error) {
    console.error('Error creating users table:', error);
    process.exit(1);
  }
};

export const initializeDatabase = async () => {
  await createUsersTable();
};
