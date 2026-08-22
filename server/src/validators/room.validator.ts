import { z } from 'zod'

export const createRoomSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Room name must be at least 3 characters")
        .max(30, "Room name must be at most 30 characters"),
})

export type CreateRoomInput = z.infer<typeof createRoomSchema>