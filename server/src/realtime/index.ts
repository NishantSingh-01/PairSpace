import type { Server as HttpServer } from "http"
import { initSocket } from "../sockets/socket"
import { initYjs } from "./yjs"

export const initRealtime = (server: HttpServer) => {
    initSocket(server)
    initYjs(server)
    console.log("🟢 Realtime initialized");
}