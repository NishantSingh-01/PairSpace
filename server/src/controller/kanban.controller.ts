import { createTask, updateTask } from "../service/kanban.service";
import { asyncHandler } from "../utils/asyncHandler.util";
import { ApiResponse } from "../utils/response.util";


export const createTaskController = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const task = await createTask(
        roomId as string,
        req.user!._id,
        req.body
    )
    return res
        .status(201)
        .json(
            new ApiResponse(201, { task }, "Task Added successfully")
        )
})
export const updateTaskController = asyncHandler(async (req, res) => {
    const { roomId, taskId } = req.params
    const task = await updateTask(
        roomId as string,
        req.user!._id,
        taskId as string,
        req.body
    )
    return res
        .status(201)
        .json(
            new ApiResponse(201, { task }, "Task Updated successfully")
        )
})