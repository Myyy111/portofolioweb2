const { PrismaClient } = require('../src/generated/client')
const p = new PrismaClient()
p.contact.findFirst().then(c => {
  console.log(JSON.stringify(c, null, 2))
}).catch(console.error).finally(() => p.$disconnect())
