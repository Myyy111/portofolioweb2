// check_users.js
const { PrismaClient } = require('./src/generated/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('Current Users:');
    users.forEach(user => {
      console.log(`- Name: ${user.name}, Email: ${user.email}, Role: ${user.role}`);
    });
    if (users.length === 0) {
      console.log('No users found.');
    }
  } catch (err) {
    console.error('Error fetching users:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
