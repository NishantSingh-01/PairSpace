import dotenv from "dotenv"
import type { SignOptions } from "jsonwebtoken"

dotenv.config();

function required(key: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`)
    }
    return value
}

export const env = {
    PORT: Number(process.env.PORT) || 8090,
    DATABASE_URL: required("DATABASE_URL", process.env.DATABASE_URL),
    JWT_ACCESS_SECRET: required("JWT_ACCESS_SECRET", process.env.JWT_ACCESS_SECRET),
    JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET", process.env.JWT_REFRESH_SECRET),
    ACCESS_TOKEN_EXPIRES_IN:( process.env.ACCESS_TOKEN_EXPIRES_IN || "15m")as SignOptions["expiresIn"],
    REFRESH_TOKEN_EXPIRES_IN:( process.env.REFRESH_TOKEN_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
    NODE_ENV: process.env.NODE_ENV || "development",
    CORS_ORIGIN:process.env.CORS_ORIGIN 
};