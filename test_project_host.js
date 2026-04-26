// test_project_host.js
const { PrismaClient } = require('./src/generated/client');
require('dotenv').config();

const password = "735R@%PHha!jpPp";
const projectRef = "ssxpahuaylheucscrytw";
const host = `${projectRef}.supabase.co`;
const poolerUrl = `postgresql://postgres:${encodeURIComponent(password)}@${host}:6543/postgres?pgbouncer=true`;

process.env.DATABASE_URL = poolerUrl;

const prisma = new PrismaClient();

async function main() {
  console.log('Testing Prisma connection to:', host);
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
