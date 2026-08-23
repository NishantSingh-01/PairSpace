import { prisma } from "../config/db"
import { ApiError } from "../utils/error.util";
import { CreateTaskInput, UpdateTaskInput } from "../validators/kanban.validator"



export const createTask = async (roomId: string, userId: string, data: CreateTaskInput) => {

    const member = await prisma.roomMember.findUnique({
        where: {
            roomId_userId: {
                roomId,
                userId,
            }
        }
    })
    if (!member) {
        throw new ApiError(403, "You are not a member of this room");
    }
    const task = await prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            roomId,
        },
    })
    return task
}
export const updateTask = async (roomId: string, userId: string, taskId: string, data: UpdateTaskInput) => {

    const member = await prisma.roomMember.findUnique({
        where: {
            roomId_userId: {
                roomId,
                userId,
            }
        }
    })
    if (!member) {
        throw new ApiError(403, "You are not a member of this room");
    }
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            roomId,
        },
    })
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    const updatedTask = await prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            name: data,
        },
    })
    return updatedTask
}
export const deleteTask = async (roomId: string, userId: string, taskId: string) => {

    const member = await prisma.roomMember.findUnique({
        where: {
            roomId_userId: {
                roomId,
                userId,
            }
        }
    })
    if (!member) {
        throw new ApiError(403, "You are not a member of this room");
    }
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            roomId,
        },
    })
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    await prisma.task.delete({
        where: {
            id: taskId
        }
    })
    return task
}