import { Router } from "express"
import { getMe, login, logout, refreshAccessToken, register } from "../controller/auth.controller"
import { verifyJWT } from "../middleware/auth.middleware"
import { validate } from "../middleware/validate.middleware"
import { loginSchema, registerSchema } from "../validators/auth.validator"

const router = Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/refresh", refreshAccessToken)
router.post("/logout", verifyJWT, logout)
router.get("/user", verifyJWT, getMe)

export default router