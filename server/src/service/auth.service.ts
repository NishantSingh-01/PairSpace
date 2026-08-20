import { prisma } from "../config/db";
import { ApiError } from "../utils/error.util";
import { hashToken } from "../utils/hashToken.util";
import { hashPassword } from "../utils/password.util";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import { RegisterSchemaType } from "../validators/auth.validator";


interface AuthResult {
    accessToken: string
    refreshToken: string
    user: {
        id: string
        email: string
        username: string
    }
}
async function issueTokenPair(userId: string) {
    const accessToken = generateAccessToken(userId)
    const refreshToken = generateRefreshToken(userId)

    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: hashToken(refreshToken) }
    })

    return { accessToken, refreshToken }
}

export const registerUser = async (data: RegisterSchemaType) => {
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