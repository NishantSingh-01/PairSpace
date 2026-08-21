import { z } from 'zod'

export const registerSchema = z.object({
    body: z.object({
        email: z
            .string({ error: "Email is required" })
            .email({ message: "Invalid email address" }),
        username: z
            .string({ error: "Username is required" })
            .min(3, { message: "Username must be at least 3 characters" })
            .max(20, { message: "Username must be at most 20 characters" })
            .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
        password: z
            .string({ error: "Password is required" })
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
    })
})
export type RegisterSchemaType = z.infer<typeof registerSchema>["body"]


export const loginSchema = z.object({
    body: z.object({
        email: z
            .string({ error: "Email is required" })
            .email({ message: "Invalid email address" }),
        password: z
            .string({ error: "Password is required" })
            .min(8, { message: "Password must be at least 8 characters" })

    })
})

export type LoginSchemaType = z.infer<typeof loginSchema>["body"]





//?we can also use like this
//type Body = z.infer<typeof registerSchema>["body"];

// type Params = z.infer<typeof registerSchema>["params"];

// type Query = z.infer<typeof registerSchema>["query"];