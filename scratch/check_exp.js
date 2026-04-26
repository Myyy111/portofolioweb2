const { PrismaClient } = require('../src/generated/client')
const prisma = new PrismaClient()

async function main() {
  try {
    const experiences = await prisma.experience.findMany()
    console.log('Found', experiences.length, 'experiences')
    console.log(JSON.stringify(experiences, null, 2))
  } catch (error) {
    console.error('Error fetching experiences:', error.message)
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
