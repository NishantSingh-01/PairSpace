import { Server, Socket } from "socket.io"
import { Server as HttpServer } from "http"

type RoomPayload = {
    roomId: string
    [key: string]: unknown
}

export let io: Server
export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE"],
        },
    })

    io.on("connection", (socket: Socket) => {
        console.log("🟢 Socket connected:", socket.id)


        socket.on("room:join", (roomId: string) => {
            socket.join(roomId);

            console.log(
                `Socket ${socket.id} joined room ${roomId}`
            )
        })

        socket.on("task:new", (task: RoomPayload) => {
            io.to(task.roomId).emit("task:new", task);
        })


        socket.on("task:updated", (task: RoomPayload) => {
            io.to(task.roomId).emit("task:updated", task);
        })


        socket.on("task:deleted", (data: RoomPayload) => {
            io.to(data.roomId).emit("task:deleted", data);
        })

        socket.on("disconnect", () => {
            console.log("🔴 Socket disconnected:", socket.id);
        })
    })

    return io
}
