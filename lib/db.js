// lib/db.js
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Helper functions
export async function queryRow(sqlQuery, params = []) {
  const result = await sql(sqlQuery, params);
  return result[0] || null;
}

export async function queryRows(sqlQuery, params = []) {
  return await sql(sqlQuery, params);
}

export async function executeQuery(sqlQuery, params = []) {
  return await sql(sqlQuery, params);
}

export { sql };