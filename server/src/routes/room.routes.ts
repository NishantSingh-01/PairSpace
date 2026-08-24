import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware";
import { createRoomSchema, deleteRoomSchema, getRoomSchema, joinRoomSchema, updateRoomSchema } from "../validators/room.validator";
import { validate } from "../middleware/validate.middleware";
import { createRoomController, deleteRoombyIdController, getRoombyIdController, joinRoomController, getUserRoomsController, updateRoomNameController } from "../controller/room.controller";

const router = Router()


router.post("/room", verifyJWT, validate(createRoomSchema), createRoomController)
router.get("/room/:roomId", verifyJWT, validate(getRoomSchema), getRoombyIdController)
router.delete("/room/:roomId", verifyJWT, validate(deleteRoomSchema), deleteRoombyIdController)
router.patch("/room/:roomId", verifyJWT, validate(updateRoomSchema), updateRoomNameController)
router.post("/room/join", verifyJWT, validate(joinRoomSchema), joinRoomController)
router.get("/rooms", verifyJWT, getUserRoomsController)

export default router