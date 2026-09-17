import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";

interface CodeEditorProps {
    roomId: string;
}

const CodeEditor = ({ roomId }: CodeEditorProps) => {

    const editorRef = useRef<any>(null);
    const ydocRef = useRef<Y.Doc | null>(null);
    const providerRef = useRef<WebsocketProvider | null>(null);
    const bindingRef = useRef<MonacoBinding | null>(null);


    const handleEditorMount = (editor: any) => {

        editorRef.current = editor;

        // Yjs document
        const ydoc = new Y.Doc();

        // WebSocket connection
        const provider = new WebsocketProvider(
            "ws://localhost:8090/yjs",
            roomId,
            ydoc
        );

        // Shared text
        const ytext = ydoc.getText("code");

        // Monaco ↔ Yjs
        const binding = new MonacoBinding(
            ytext,
            editor.getModel()!,
            new Set([editor]),
            provider.awareness
        );

        ydocRef.current = ydoc;
        providerRef.current = provider;
        bindingRef.current = binding;
    };


    useEffect(() => {

        return () => {

            bindingRef.current?.destroy();

            providerRef.current?.destroy();

            ydocRef.current?.destroy();

        };

    }, []);


    return (
        <Editor
            height="600px"
            defaultLanguage="javascript"
            defaultValue="// Start coding..."
            onMount={handleEditorMount}
        />
    );
};

export default CodeEditor;