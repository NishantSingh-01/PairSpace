import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client"
import app from "../app";

const connectionString = process.env.DATABASE_URL!

const adapter = new PrismaPg({
    connectionString,
})

export const prisma = new PrismaClient({
    adapter,
})
export async function connectDB() {
    try {
        await prisma.$connect()


        console.log("╔════════════════════════════════╗");
        console.log("║   🟢 PRISMA CONNECTED          ║");
        console.log("║   🐘 PostgreSQL is ready!      ║");
        console.log("╚════════════════════════════════╝");
    } catch (error) {
        console.error("🔴 Prisma connection failed:", error)
        process.exit(1)
    }
}