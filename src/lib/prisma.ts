import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Next.js hot-reloading safe connection pattern
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // PRISMA 7 FIX: We now explicitly pass the Postgres adapter into the client!
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
    log: ["query", "info", "warn", "error"], // Optional: Helps with debugging in the terminal
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;