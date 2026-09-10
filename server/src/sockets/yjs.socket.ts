import { WebSocketServer } from "ws";
import { setupWSConnection } from "@y/websocket-server/utils";
import type { Server as HttpServer } from "http";

export const initYjs = (server: HttpServer) => {
    const wss = new WebSocketServer({
        noServer: true,
    })

    wss.on("connection", (ws, request) => {
        setupWSConnection(ws, request)
    })

    server.on("upgrade", (request, socket, head) => {
        const url = new URL(
            request.url || "",
            `http://${request.headers.host}`
        )
        if (!url.pathname.startsWith("/yjs")) {
            return
        }
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request)
        })
    })
    console.log("🟢 Yjs WebSocket initialized")
}