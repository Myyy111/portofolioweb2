const { PrismaClient } = require('./src/generated/client')
const prisma = new PrismaClient()

async function main() {
  const hero = await prisma.hero.findFirst()
  console.log('Hero data:', JSON.stringify(hero, null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
