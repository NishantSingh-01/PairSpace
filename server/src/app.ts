import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler.middleware"
import { env } from "./config/env.config"
import Authrouter from '../src/routes/auth.routes'
import roomRoutes from "../src/routes/room.routes"
import Taskrouter from "../src/routes/kanban.routes"
import MessageRouter from "../src/routes/message.routes"
const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    env.CORS_ORIGIN
].filter(Boolean)

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true)
            if (env.CORS_ORIGIN === "*" || allowedOrigins.includes(origin)) {
                return callback(null, origin)
            }
            return callback(new Error("CORS origin not allowed: " + origin))
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
    })
)
app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(cookieParser())

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", message: "Server is healthy" })
})
app.use('/api/v1',Authrouter)
app.use("/api/v2", roomRoutes)
app.use("/api/v3/kanban", Taskrouter)
app.use('/api/v4',MessageRouter)

app.use(errorHandler)

export default app