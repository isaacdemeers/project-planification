import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

const prisma = new PrismaClient()

export default prisma

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 
