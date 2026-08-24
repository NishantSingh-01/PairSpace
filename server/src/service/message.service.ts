import { prisma } from "../config/db";
import { ApiError } from "../utils/error.util";
import { CreateMessageInput } from "../validators/message.validate";



export const createMessage = async (roomId: string, userId: string, data: CreateMessageInput) => {
    const member = await prisma.roomMember.findUnique({
        where: {
            roomId_userId: {
                roomId,
                userId,
            },
        },
    })

    if (!member) {
        throw new ApiError(
            403,
            "You are not a member of this room"
        )
    }
    const message = await prisma.message.create({
        data: {
            content: data.content,
            roomId,
            senderId: userId,
        },
        include: {
            sender: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true,
                }
            }
        }
    })
    return message
}

export const getMessage = async (roomId: string, userId: string) => {
    const member = await prisma.roomMember.findUnique({
        where: {
            roomId_userId: {
                roomId,
                userId,
            },
        },
    })

    if (!member) {
        throw new ApiError(
            403,
            "You are not a member of this room"
        )
    }
    const message = await prisma.message.findMany({
        where: {
            roomId
        },
        include: {
            sender: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 20,
    })
    return message
}