import { useState, type FormEvent } from "react"
import { Code2, Mail, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface LoginFormState {
    email: string
    password: string
}

export default function Login() {
    const navigate = useNavigate()

    const [form, setForm] = useState<LoginFormState>({
        email: "",
        password: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsSubmitting(true)

        try {
            // Simulate an API call
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-4 font-mono">
            <div className="flex items-center gap-3 mb-8 w-full max-w-md">
                <div className="w-9 h-9 rounded-lg bg-teal-400 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>

                <span className="text-white font-bold text-lg">
                    PairSpace
                </span>
            </div>

            <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8">
                <h1 className="text-white text-2xl font-bold mb-1">
                    Welcome back
                </h1>

                <p className="text-gray-500 text-sm mb-6">
                    Sign in to your workspaces
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs tracking-wider text-gray-500 mb-2"
                        >
                            EMAIL
                        </label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value
                                    })
                                }
                                className="w-full bg-black border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-400 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs tracking-wider text-gray-500 mb-2"
                        >
                            PASSWORD
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                            <input
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value
                                    })
                                }
                                className="w-full bg-black border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-400 transition-colors"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-400 hover:bg-teal-300 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm rounded-lg py-3 transition-colors"
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    New here?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-teal-400 hover:text-teal-300 transition-colors"
                    >
                        Create one
                    </button>
                </p>
            </div>
        </div>
    )
}

