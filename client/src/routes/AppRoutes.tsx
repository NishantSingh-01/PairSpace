import { Routes, Route } from "react-router-dom"
import Login from "../pages/auth/login"
import Register from "../pages/auth/Register"
import Home from "../pages/Home/Home"
import NotFound from "../pages/NotFound"
import CodeEditor from "../features/code-editor/CodeEditor"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editor" element={<CodeEditor roomId="random123" />} />
            <Route path="/room/:id" element={<CodeEditor roomId="random123" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
