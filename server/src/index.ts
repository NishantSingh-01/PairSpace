import "dotenv/config";
import express from "express";
import { connectDB, prisma } from "./config/db";

const app = express();
connectDB()
app.use(express.json());

app.get("/", async (_req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

app.listen(8090, () => {
    console.log("╔══════════════════════════════╗");
    console.log("║     🟢 SERVER RUNNING        ║");
    console.log("║     🚀 Port: 8090            ║");
    console.log("║     🌐 http://localhost:8090 ║");
    console.log("╚══════════════════════════════╝");
});