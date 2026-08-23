import { z } from "zod"

export const createTaskSchema = z.object({
    body: z.object({
        title: z
            .string()
            .trim()
            .min(1, "Title is required"),

        description: z
            .string()
            .trim()
            .optional(),
    })
})
export const updateTaskSchema = z.object({
    body: z.object({
        title: z.string().trim().min(1).optional(),

        description: z.string().trim().optional(),

        status: z
            .enum(["todo", "in_progress", "done"])
            .optional(),
    })
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>["body"]
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>["body"]