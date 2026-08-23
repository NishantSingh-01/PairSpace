import { z } from 'zod'

export const createRoomSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(3, "Room name must be at least 3 characters")
            .max(30, "Room name must be at most 30 characters"),
    }),
})
export const getRoomSchema = z.object({
    params: z.object({
        roomId: z.string().uuid("Invalid room ID"),
    }),
})

export const deleteRoomSchema = z.object({
    params: z.object({
        roomId: z.string().uuid("Invalid room ID"),
    }),
})
export const updateRoomSchema = z.object({
    params: z.object({
        roomId: z.string().uuid("Invalid room ID"),
    }),

    body: z.object({
        name: z
            .string()
            .trim()
            .min(3, "Room name must be at least 3 characters")
            .max(30, "Room name must be at most 30 characters"),
    }),
})
export const joinRoomSchema = z.object({
    body: z.object({
        inviteCode: z
            .string()
            .trim()
            .length(6, "Invite code must be 6 characters")
    })
})
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>["body"]
export type DeleteRoomInput = z.infer<typeof deleteRoomSchema>["params"]
export type JoinRoomInput = z.infer<typeof joinRoomSchema>["body"]
export type GetRoomInput = z.infer<typeof getRoomSchema>["params"]
export type CreateRoomInput = z.infer<typeof createRoomSchema>["body"]