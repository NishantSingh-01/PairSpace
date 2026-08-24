import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware"
import { createMessageController, getMessageController } from "../controller/message.controller"

const router = Router()

router.post(
    "/:roomId/messages",
    verifyJWT,
    createMessageController
)

router.get(
    "/:roomId/messages",
    verifyJWT,
    getMessageController
)

export default router