import { createRoom } from "../service/room.service"
import { asyncHandler } from "../utils/asyncHandler.util"
import { ApiResponse } from "../utils/response.util"


export const createRoomController = asyncHandler(async (req, res) => {
    const room = await createRoom(
        req.user!._id,
        req.body
    )

    return res.status(200).json(
        new ApiResponse(201,
            { room },
            "Room Created successfully"
        ))
})