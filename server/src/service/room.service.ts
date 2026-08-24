import { prisma } from "../config/db";
import { ApiError } from "../utils/error.util";
import { generateInviteCode } from "../utils/invite-code.util";
import { CreateRoomInput, JoinRoomInput, UpdateRoomInput } from "../validators/room.validator";


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
export const updateRoomName = async (roomId: string, data: UpdateRoomInput) => {
    const room = await prisma.room.findUnique({
        where: {
            id: roomId,
        },
    })
    if (!room) {
        throw new ApiError(404, "Room not found");
    }

    const updatedRoom = await prisma.room.update({
        where: {
            id: roomId,
        },
        data: {
            name: data.name,
        },
    })

    return updatedRoom
}
export const joinRoom = async (userId: string, data: JoinRoomInput) => {
    const room = await prisma.room.findUnique({
        where: {
            inviteCode: data.inviteCode,
        }
    })
    if (!room) {
        throw new ApiError(404, "Room not found");
    }
    const existingMember = await prisma.roomMember.findUnique({
        where: {
            roomId_userId: {  //? when two field to check if both are composite key 
                roomId: room.id,
                userId,
            },
        },
    })
    if (existingMember) {
        throw new ApiError(409, "You are already a member of this room")
    }
    const member = await prisma.roomMember.create({
        data: {
            roomId: room.id,
            userId,
            role: "editor",
        },
    })
    return { room, member }
}
export const getAllRoomsOfUser = async (userId: string) => {
    const rooms = await prisma.room.findMany({
        where: {
            members: {   // by this we can target rooms >> menmber []
                some: {
                    userId,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        }
    })
    return rooms
}


//! GET    /api/rooms/:roomId/members