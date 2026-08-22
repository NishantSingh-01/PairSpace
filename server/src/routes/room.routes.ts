import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware";
import { createRoomSchema, getRoomSchema } from "../validators/room.validator";
import { validate } from "../middleware/validate.middleware";
import { createRoomController, getRoombyIdController } from "../controller/room.controller";

const router = Router()


router.post(
    "/room",
    verifyJWT,
    validate(createRoomSchema),
    createRoomController
)
router.get(
    "/room/:roomId",
    verifyJWT,
    validate(getRoomSchema),
    getRoombyIdController
)
export default router