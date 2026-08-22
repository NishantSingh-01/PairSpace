import { prisma } from "../config/db";
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
}