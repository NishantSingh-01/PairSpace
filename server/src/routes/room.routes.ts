import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware";
import { createRoomSchema } from "../validators/room.validator";
import { validate } from "../middleware/validate.middleware";
import { createRoomController } from "../controller/room.controller";

const router = Router()


router.post(
    "/room",
    verifyJWT,
    validate(createRoomSchema),
    createRoomController
);
export default router