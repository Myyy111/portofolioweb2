// check_tables.js
const { PrismaClient } = require('./src/generated/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.ssxpahuaylheucscrytw:735R%40%25PHha%21jpPp@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});

async function main() {
  try {
    const tables = await prisma.$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
    console.log('Tables in public schema:', tables.map(t => t.tablename).join(', '));
  } catch (err) {
    console.error('Failed to list tables:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
