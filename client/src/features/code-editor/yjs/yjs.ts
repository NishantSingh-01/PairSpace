import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"

const YJS_URL = "ws://localhost:8090/yjs"
export const createYjsConnection = (roomId: string) => {
    const ydoc = new Y.Doc()

    const provider = new WebsocketProvider(
        YJS_URL,
        roomId,
        ydoc
    )

    const ytext = ydoc.getText("code")

    return {
        ydoc,
        provider,
        ytext,
    }
}