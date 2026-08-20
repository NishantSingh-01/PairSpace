import { Request, Response, NextFunction } from "express"
import { z, ZodError } from "zod"
import { ApiError } from "../utils/error.util"


export const validate = (schema: z.ZodType) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }))
                return next(new ApiError(400, "Validation failed", errors))
            }
            next(error)
        }
    }
}