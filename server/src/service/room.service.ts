import { prisma } from "../config/db";
import { ApiError } from "../utils/error.util";
import { generateInviteCode } from "../utils/invite-code.util";
import { CreateRoomInput } from "../validators/room.validator";


export const createRoom = async (userId: string, data: CreateRoomInput) => {
    const inviteCode = generateInviteCode()
    const room = await prisma.room.create({
        data: {
            name: data.name,
            inviteCode,
            ownerId: userId,

            members: {
                create: {
                    userId,
                    role: "owner",
                },
            },
        },
    })

    return room
}
export const getRoomsbyId = async (roomId: string) => {

    const room = await prisma.room.findUnique({
        where: {
            id: roomId
        }
    })
    if (!room) {
        throw new ApiError(404, "Room not found");
    }
    return room
}
export const deleteRoomsbyId = async (roomId: string) => {
    const room = await prisma.room.findUnique({
        where: {
            id: roomId,
        },
    })
    if (!room) {
        throw new ApiError(404, "Room not found");
    }

    await prisma.room.delete({
        where: {
            id: roomId
        }
    })

    return room
}