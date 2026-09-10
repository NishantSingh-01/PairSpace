import { useState, type FormEvent } from "react"
import { Braces, Mail, Lock, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface RegisterFormState {
    username: string
    email: string
    password: string
}

export default function Register() {
    const navigate = useNavigate()

    const [form, setForm] = useState<RegisterFormState>({
        username: "",
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
                err instanceof Error ? err.message : "Something went wrong"
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#070707f7] flex flex-col items-center justify-center px-4 font">

            <div className="flex items-center gap-3 mb-8 w-full max-w-md">
                <div className="w-9 h-9 rounded-lg bg-teal-400 flex items-center justify-center">
                    <Braces className="h-7 w-7 text-black " />
                </div>

                <span className="text-white font-bold text-lg">
                    PairSpace
                </span>
            </div>

            <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8">
                <h1 className="text-white text-2xl font-mono font-bold mb-1">
                    Create account
                </h1>

                <p className="text-gray-500 text-sm mb-6">
                    Join PairSpace and start collaborating
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label
                            htmlFor="username"
                            className="block text-xs tracking-wider text-gray-500 mb-2"
                        >
                            USERNAME
                        </label>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                            <input
                                id="username"
                                type="text"
                                required
                                autoComplete="username"
                                placeholder="your username"
                                value={form.username}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        username: e.target.value
                                    })
                                }
                                className="w-full bg-black border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-400 transition-colors"
                            />
                        </div>
                    </div>

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
                                autoComplete="new-password"
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
                        {isSubmitting ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-teal-400 hover:text-teal-300 transition-colors"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    )
}

