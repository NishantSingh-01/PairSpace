import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware"
import { validate } from "../middleware/validate.middleware"
import { createTaskSchema } from "../validators/kanban.validator"
import { createTaskController, updateTaskController } from "../controller/kanban.controller"
import { updateRoomSchema } from "../validators/room.validator"


const router = Router()

router.post("/task", validate(createTaskSchema), createTaskController)
router.put("/task/:id", validate(updateRoomSchema), updateTaskController)

export default router