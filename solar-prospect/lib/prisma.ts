//We want one instance of the Prisma client: singleton that is managing the connection to our database!
//If we keep creating a new instance of the Prisma client, we will have multiple connections to the database


import { PrismaClient } from "../app/generated/prisma/client"

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

//Checks to see if we have the prisma client object. If not, it creates a new Prisma Client. If it does, we use that prisma object.
//This is only executed once and we will reuse that same prisma client
//When you are importing Prisma CLient, do not do {PrismaClient}, instead import the prisma instance from this file
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma