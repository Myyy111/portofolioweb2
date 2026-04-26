// test_prisma_direct.js
const { PrismaClient } = require('./src/generated/client');
require('dotenv').config();

const password = "735R@%PHha!jpPp";
const projectRef = "ssxpahuaylheucscrytw";
const host = `db.${projectRef}.supabase.co`;
const directUrl = `postgresql://postgres:${encodeURIComponent(password)}@${host}:5432/postgres`;

process.env.DATABASE_URL = directUrl;

const prisma = new PrismaClient();

async function main() {
  console.log('Testing Prisma connection to:', host);
  try {
    await prisma.$connect();
    console.log('Prisma connection successful!');
    const users = await prisma.user.findMany();
    console.log('Users found:', users.length);
  } catch (err) {
    console.error('Prisma connection failed:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
