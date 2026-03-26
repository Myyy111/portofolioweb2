// test_db_pooler.js
const { PrismaClient } = require('./src/generated/client');

const poolerUrl = "postgresql://postgres.ssxpahuaylheucscrytw:735R%40%25PHha%21jpPp@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: poolerUrl
    }
  }
});

async function main() {
  console.log('Testing connection to pooler host (Tokyo)...');
  try {
    await prisma.$connect();
    console.log('Successfully connected to POOLER (Tokyo)!');
  } catch (err) {
    console.error('Connection failed:');
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
