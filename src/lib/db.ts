import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

if (connectionString && connectionString.startsWith("sb_publishable_")) {
  console.warn(
    "Warning: DATABASE_URL in .env/.env.local appears to be a Supabase publishable API key " +
    "rather than a Postgres connection string. Database operations will fail unless configured " +
    "with a valid PostgreSQL URL starting with 'postgresql://' or 'postgres://'."
  );
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
