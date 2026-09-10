import { createClient } from "redis"
import { env } from "./env.config"

const redisClient = createClient({
  url: env.REDIS_URL as string
})

redisClient.on("error", (err: any) => {
  console.log("Redis Error", err)
})

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect()
    console.log("╔════════════════════════════════╗")
    console.log("║   ⚡️ REDIS CONNECTED           ║")
    console.log("║   ⚡️ REDIS is ready!          ║")
    console.log("╚════════════════════════════════╝")
  }
}

export default redisClient