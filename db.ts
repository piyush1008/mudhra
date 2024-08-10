import { PrismaClient } from '@prisma/client'

console.log("inside db.ts");

const prismaClientSingleton = () => {
    console.log("prisma client instantiated")
  return new PrismaClient()
}
// declare is used to tell the compiler "this thing (usually a variable) exists already, and therefore can be referenced by other code,
//  also there is no need to compile this statement into any JavaScript".
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma