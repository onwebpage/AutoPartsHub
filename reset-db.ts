import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const { Pool } = pg;

async function resetDatabase() {
  const dbUrl = process.env.DATABASE_URL?.trim();
  
  if (!dbUrl) {
    console.error('DATABASE_URL not found');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: dbUrl,
  });

  const db = drizzle(pool);

  try {
    console.log('Dropping all tables...');
    
    // Drop all tables
    await pool.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `);

    console.log('All tables dropped successfully!');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await pool.end();
  }
}

resetDatabase();
