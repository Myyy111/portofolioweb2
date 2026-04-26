// test_direct.js
const { Client } = require('pg');
require('dotenv').config();

// Try to construct a direct connection string
// password is 735R@%PHha!jpPp
const password = "735R@%PHha!jpPp";
const projectRef = "ssxpahuaylheucscrytw";
const host = `db.${projectRef}.supabase.co`;
const connectionString = `postgresql://postgres:${encodeURIComponent(password)}@${host}:5432/postgres`;

console.log(`Testing connection to: ${host}`);

const client = new Client({
  connectionString: connectionString,
});

async function main() {
  try {
    await client.connect();
    console.log('Direct connection successful!');
    const res = await client.query('SELECT NOW()');
    console.log('Result:', res.rows[0]);
  } catch (err) {
    console.error('Direct connection failed:', err.message);
  } finally {
    await client.end();
  }
}

main();
