import "./App.css"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"

const App = () => {
    return (
        <AuthProvider>
            <Toaster position="top-right" richColors theme="dark" />
            <AppRoutes />
        </AuthProvider>
    )
}

export default App