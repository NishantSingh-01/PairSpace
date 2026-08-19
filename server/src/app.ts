import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler.middleware"
import { env } from "./config/env.config"

const app = express()


app.use(
    cors({
        origin: env.CORS_ORIGIN || "http://localhost:8090/health",
        credentials: true
    })
)
app.use(errorHandler)
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

export default app