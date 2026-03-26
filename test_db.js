// test_db.js
const { PrismaClient } = require('./src/generated/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('Testing connection to:', process.env.DATABASE_URL.replace(/:([^:]+)@/, ':***@'));
  try {
    await prisma.$connect();
    console.log('Successfully connected!');
  } catch (err) {
    console.error('Connection failed:');
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
