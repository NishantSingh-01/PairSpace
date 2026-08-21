import { asyncHandler } from "../utils/asyncHandler.util"
import { ApiResponse } from "../utils/response.util"
import { getUser, loginUser, logoutUser, registerUser, rotateRefreshToken } from "../service/auth.service"
import { env } from "../config/env.config"
import { ApiError } from "../utils/error.util"

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
export const login = asyncHandler(async (req, res) => {

    const { accessToken, refreshToken, user } = await loginUser(req.body)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000 // match your ACCESS_TOKEN_EXPIRES_IN, in ms
    })
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, cookieOptions)

    return res
        .status(200)
        .json(
            new ApiResponse(200, { accessToken, user }, "User logged in successfully")
        )
})
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingToken = req.cookies?.[REFRESH_COOKIE_NAME]

    if (!incomingToken) {
        throw new ApiError(401, "No refresh token provided")
    }

    const { accessToken, refreshToken } = await rotateRefreshToken(incomingToken)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
    })

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, cookieOptions)
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                accessToken
            },
            "Access token refreshed"))
})
export const logout = asyncHandler(async (req, res) => {

    await logoutUser(req.user!._id)

    res.clearCookie(REFRESH_COOKIE_NAME, cookieOptions)
    res.clearCookie("accessToken", cookieOptions)

    return res.status(200).json(
        new ApiResponse(200,
            {},
            "Logged out successfully"
        )
    )
})
export const getMe = asyncHandler(async (req, res) => {
    const user = await getUser(req.user!._id)

    return res.status(200).json(
        new ApiResponse(200,
            { user },
            "Current user fetched successfully"
        ))
})