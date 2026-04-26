// test_pooler_user_postgres.js
const { PrismaClient } = require('./src/generated/client');
require('dotenv').config();

const password = "735R@%PHha!jpPp";
const host = "aws-1-ap-northeast-1.pooler.supabase.com";
const poolerUrl = `postgresql://postgres:${encodeURIComponent(password)}@${host}:6543/postgres?pgbouncer=true`;

process.env.DATABASE_URL = poolerUrl;

const prisma = new PrismaClient();

async function main() {
  console.log('Testing Prisma connection to pooler with user "postgres"');
  try {
    await prisma.$connect();
    console.log('Prisma connection successful!');
  } catch (err) {
    console.error('Prisma connection failed:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
