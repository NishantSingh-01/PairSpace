import { createRoom, deleteRoomsbyId, getRoomsbyId, updateRoomName } from "../service/room.service"
import { asyncHandler } from "../utils/asyncHandler.util"
import { ApiResponse } from "../utils/response.util"


export const createRoomController = asyncHandler(async (req, res) => {
    const room = await createRoom(
        req.user!._id,
        req.body
    )

    return res.status(201).json(
        new ApiResponse(201,
            { room },
            "Room Created successfully"
        ))
})
export const getRoombyIdController = asyncHandler(async (req, res) => {
    const room = await getRoomsbyId(req.params.roomId as string)

    return res.status(200).json(
        new ApiResponse(200,
            { room },
            "Room fetched successfully"
        ))
})
export const updateRoomNameController = asyncHandler(async (req, res) => {

    const room = await updateRoomName(req.params.roomId as string, req.body)

    return res.status(200).json(
        new ApiResponse(200,
            { room },
            "Room name updated successfully"
        ))
})
export const deleteRoombyIdController = asyncHandler(async (req, res) => {
    const room = await deleteRoomsbyId(req.params.roomId as string)

    return res.status(200).json(
        new ApiResponse(200,
            { room },
            "Room deleted successfully"
        ))
})