import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db"
import app from "./app"
import http from 'http'
import { Server } from 'socket.io'
import { initSocket } from "./sockets/socket"
import { connectRedis } from "./config/redis.config";

const server = http.createServer(app)
initSocket(server)


const startServer = async () => {
    try {
        await connectRedis()
        await connectDB()

        server.listen(8090, () => {
            console.log("╔══════════════════════════════╗");
            console.log("║     〰️ SERVER RUNNING        ║");
            console.log("║     🚀 Port: 8090            ║");
            console.log("║     🌐 http://localhost:8090 ║");
            console.log("╚══════════════════════════════╝");
        })
    } catch (error) {
        console.error("❌ Server startup failed:", error)
        process.exit(1)
    }
};

startServer()