import { z } from "zod"

export const createMessageSchema = z.object({
    body: z.object({
        content: z
            .string()
            .min(1, "Message cannot be empty")
            .max(2000, "Message is too long"),
    })
})

export const messageParamsSchema = z.object({
    params: z.object({
        roomId: z.string().uuid("Invalid room ID"),
    })
})

export const messageIdParamsSchema = z.object({
    params: z.object({
        roomId: z.string().uuid("Invalid room ID"),
        messageId: z.string().uuid("Invalid Message ID"),
    })
})

export type CreateMessageInput = z.infer<typeof createMessageSchema>["body"]
export type MessageParams = z.infer<typeof messageParamsSchema>["params"]
export type MessageIdParams = z.infer<typeof messageIdParamsSchema>["params"]