const { PrismaClient } = require('../src/generated/client')
const prisma = new PrismaClient()

async function main() {
  const id = 'cmoflsx5l00079w5or30azoat'
  const project = await prisma.project.findUnique({ where: { id } })
  console.log(JSON.stringify(project, null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
