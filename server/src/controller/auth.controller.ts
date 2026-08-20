import { asyncHandler } from "../utils/asyncHandler.util"
import { ApiResponse } from "../utils/response.util"
import { registerUser } from "../service/auth.service"
import { env } from "../config/env.config"

const REFRESH_COOKIE_NAME = "refreshToken"

const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict" as const
}



export const register = asyncHandler(async (req, res) => {

    const { accessToken, refreshToken, user } = await registerUser(req.body)

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, cookieOptions)

    return res
        .status(201)
        .json(
            new ApiResponse(201, { accessToken, user }, "User registered successfully")
        )
})