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

export type GetRoomInput = z.infer<typeof getRoomSchema>["params"]
export type CreateRoomInput = z.infer<typeof createRoomSchema>["body"]