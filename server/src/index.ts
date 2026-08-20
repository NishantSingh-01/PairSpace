import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db"
import app from "./app"


connectDB()
app.listen(8090, () => {
    console.log("╔══════════════════════════════╗")
    console.log("║     〰️ SERVER RUNNING        ║")
    console.log("║     🚀 Port: 8090            ║")
    console.log("║     🌐 http://localhost:8090 ║")
    console.log("╚══════════════════════════════╝")
})