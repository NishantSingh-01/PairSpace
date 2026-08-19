import jwt from "jsonwebtoken"
import { env } from "../config/env.config"

export function generateAccessToken(userId: string) {
    return jwt.sign(
        { userId },
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: env.ACCESS_TOKEN_EXPIRES_IN
        }
    )
}``

export function generateRefreshToken(userId: string) {
    return jwt.sign(
        { userId },
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}