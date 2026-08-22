import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware";
import { createRoomSchema, deleteRoomSchema, getRoomSchema, updateRoomSchema } from "../validators/room.validator";
import { validate } from "../middleware/validate.middleware";
import { createRoomController, deleteRoombyIdController, getRoombyIdController, updateRoomNameController } from "../controller/room.controller";

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
router.delete(
    "/room/:roomId",
    verifyJWT,
    validate(deleteRoomSchema),
    deleteRoombyIdController
)
router.patch(
    "/room/:roomId",
    verifyJWT,
    validate(updateRoomSchema),
    updateRoomNameController
)
export default router