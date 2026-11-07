import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaLogLevels: ("query" | "info" | "warn" | "error")[] = process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"];

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: prismaLogLevels,
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}