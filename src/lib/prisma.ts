import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Next.js hot-reloading safe connection pattern
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 1. Create a database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

// 2. Pass the pool into the Prisma adapter
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // Use the pool adapter here
    log: ["query", "info", "warn", "error"], 
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;