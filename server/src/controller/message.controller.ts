import { asyncHandler } from "../utils/asyncHandler.util";
import { createMessage, getMessage } from "../service/message.service"
import { ApiResponse } from "../utils/response.util";
import { io } from "../sockets/socket";

export const createMessageController = asyncHandler(async (req, res) => {
    const { roomId } = req.params

    const message = await createMessage(
        roomId as string,
        req.user!._id,
        req.body
    )
    return res
        .status(201)
        .json(
            new ApiResponse(201, { message }, "Message Added successfully")
        )
})
export const getMessageController = asyncHandler(async (req, res) => {
    const { roomId } = req.params

    const message = await getMessage(
        roomId as string,
        req.user!._id,
    )
    io.to(roomId).emit("message:new", message)
    return res
        .status(201)
        .json(
            new ApiResponse(201, { message }, "Message fetched successfully")
        )
})