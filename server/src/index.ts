import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db"
import app from "./app"
import http from 'http'
import { Server } from 'socket.io'
import { initSocket } from "./sockets/socket"

const server = http.createServer(app)
initSocket(server)


connectDB()
app.listen(8090, () => {
    console.log("╔══════════════════════════════╗")
    console.log("║     〰️ SERVER RUNNING        ║")
    console.log("║     🚀 Port: 8090            ║")
    console.log("║     🌐 http://localhost:8090 ║")
    console.log("╚══════════════════════════════╝")
})