import { prisma } from "../config/db";
import { AuthResult, RefreshResult } from "../types/auth.types";
import { ApiError } from "../utils/error.util";
import { hashToken } from "../utils/hashToken.util";
import { comparePassword, hashPassword } from "../utils/password.util";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token.util";
import { LoginSchemaType, RegisterSchemaType } from "../validators/auth.validator";



async function issueTokenPair(userId: string) {
    const accessToken = generateAccessToken(userId)
    const refreshToken = generateRefreshToken(userId)

    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: hashToken(refreshToken) }
    })

    return { accessToken, refreshToken }
}

export const registerUser = async (data: RegisterSchemaType): Promise<AuthResult> => {
    const { email, username, password } = data
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username }
            ]
        }
    })
    if (existingUser) {
        if (existingUser.email === email) {
            throw new ApiError(409, "Email is already registered")
        }
        throw new ApiError(409, "Username is already taken")
    }
    const hashedPassword = await hashPassword(password)
    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword
        }
    })
    const { accessToken, refreshToken } = await issueTokenPair(newUser.id)

    return {
        accessToken,
        refreshToken,
        user: {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username
        }
    }
}
export const loginUser = async (data: LoginSchemaType): Promise<AuthResult> => {
    const { email, password } = data
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if (!user) {
        throw new ApiError(401, "Invalid email")
    }
    const isPasswordCorrect = await comparePassword(password, user.password)
    if (!isPasswordCorrect) {
        throw new Error("Invalid password")
    }

    const { accessToken, refreshToken } = await issueTokenPair(user.id)

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            username: user.username
        }
    }
}
export const rotateRefreshToken = async (incomingToken: string): Promise<RefreshResult> => {
    let payload
    try {
        payload = verifyRefreshToken(incomingToken)
    } catch {
        throw new ApiError(401, "Invalid or expired refresh token")
    }
    const user = await prisma.user.findUnique({
        where: { id: payload.userId }
    })

    if (!user || !user.refreshToken) {
        throw new ApiError(401, "Refresh token invalid — please log in again")
    }

    const incomingHashed = hashToken(incomingToken)
    if (incomingHashed !== user.refreshToken) {

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: null }
        })
        throw new ApiError(401, "Refresh token invalid — please log in again")
    }
    const { accessToken, refreshToken } = await issueTokenPair(user.id)
    return {
        accessToken,
        refreshToken,
    }
}
export async function logoutUser(userId: string): Promise<void> {
    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null }
    })
}
export const getUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            username: true,
            avatarUrl: true,

        }
    })
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return user
}