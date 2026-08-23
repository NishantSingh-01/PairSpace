import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware"
import { validate } from "../middleware/validate.middleware"
import { createTaskSchema, updateTaskSchema } from "../validators/kanban.validator"
import { createTaskController, deleteTaskController, getTasksController, updateTaskController } from "../controller/kanban.controller"



const router = Router()

router.post("/:roomId/task", validate(createTaskSchema), verifyJWT, createTaskController)
router.put("/:roomId/task/:taskId", validate(updateTaskSchema), verifyJWT, updateTaskController)
router.delete("/:roomId/task/:taskId", verifyJWT, deleteTaskController)
router.get("/:roomId/tasks", verifyJWT, getTasksController)

export default router