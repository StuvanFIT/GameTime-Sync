//Prisma is going to run this file after migrations, updates or resets the database
//This allows us to see default information more easily

//We want one instance of the Prisma client: singleton that is managing the connection to our database!
//If we keep creating a new instance of the Prisma client, we will have multiple connections to the database

import { PrismaClient } from "../app/generated/prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      password: `$2y$12$GBfcgD6XwaMferSOdYGiduw3Awuo95QAPhxFE0oNJ.Ds8qj3pzEZy`
    }
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })