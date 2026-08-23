import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler.middleware"
import { env } from "./config/env.config"
import Authrouter from '../src/routes/auth.routes'
import roomRoutes from "../src/routes/room.routes"
import Taskrouter from "../src/routes/kanban.routes"
const app = express()


app.use(
    cors({
        origin: env.CORS_ORIGIN || "http://localhost:8090/health",
        credentials: true
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

app.use(errorHandler)

export default app