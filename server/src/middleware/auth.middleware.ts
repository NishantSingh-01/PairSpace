import { Request, Response, NextFunction } from "express"
import { verifyAccessToken } from "../utils/token.util"
import { ApiError } from "../utils/error.util"
import { asyncHandler } from "../utils/asyncHandler.util"

declare global {
    namespace Express {
        interface Request {
            user?: { _id: string }
        }
    }
}

export const verifyJWT = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const payload = verifyAccessToken(token)
        req.user = { _id: payload.userId }
        next()
    } catch {
        throw new ApiError(401, "Invalid or expired access token")
    }
})