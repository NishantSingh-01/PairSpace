import { createTask, deleteTask, getTasks, updateTask } from "../service/kanban.service";
import { io } from "../sockets/socket";
import { asyncHandler } from "../utils/asyncHandler.util";
import { ApiResponse } from "../utils/response.util";


export const createTaskController = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const task = await createTask(
        roomId as string,
        req.user!._id,
        req.body
    )
    io.to(roomId).emit("task:new", task)
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

    io.to(roomId).emit("task:updated", task)
    return res
        .status(201)
        .json(
            new ApiResponse(201, { task }, "Task Updated successfully")
        )
})
export const deleteTaskController = asyncHandler(async (req, res) => {
    const { roomId, taskId } = req.params
    const task = await deleteTask(
        roomId as string,
        req.user!._id,
        taskId as string
    )
    io.to(roomId).emit("task:deleted", {
        taskId,
        roomId,
    })
    return res
        .status(201)
        .json(
            new ApiResponse(201, { task }, "Task Deleted successfully")
        )
})
export const getTasksController = asyncHandler(async (req, res) => {
    const { roomId } = req.params
    const task = await getTasks(
        roomId as string,
        req.user!._id
    )
    return res
        .status(201)
        .json(
            new ApiResponse(201, { task }, "Task Returened successfully")
        )
})