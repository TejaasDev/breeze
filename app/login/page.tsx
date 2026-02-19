"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Heart, CloudLightning, Leaf, Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const supabase = createClient()
    const router = useRouter()

    const handleGoogleLogin = async () => {
        setLoading(true)
        setError(null)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            })
            if (error) throw error
        } catch (err: any) {
            setError(err.message)
            setLoading(false)
        }
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                alert("Check your email for the confirmation link!")
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                router.push("/dashboard")
                router.refresh()
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-lofi-bg p-4 font-quicksand transition-colors duration-300">
            {/* Main Phone-style Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[390px] min-h-[700px] sm:min-h-[780px] bg-lofi-card rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden border-[6px] sm:border-[8px] border-lofi-text relative flex flex-col grid-background"
            >
                {/* Status Bar Decor */}
                <div className="px-8 pt-6 pb-2 flex justify-between items-center text-sm font-bold text-lofi-text z-10">
                    <span>9:41</span>
                    <div className="flex gap-1.5 items-center opacity-80">
                        <div className="w-5 h-2.5 border border-lofi-text rounded-sm relative">
                            <div className="absolute left-0 top-0 h-full bg-lofi-text w-[80%]" />
                        </div>
                    </div>
                </div>

                {/* Decorative Floating Icons */}
                <div className="absolute top-20 left-6 text-lofi-text opacity-20">
                    <Sun className="w-8 h-8" />
                </div>
                <div className="absolute top-28 right-8 text-lofi-text opacity-20">
                    <Heart className="w-6 h-6" />
                </div>
                <div className="absolute bottom-40 left-8 text-lofi-text opacity-10">
                    <CloudLightning className="w-6 h-6" />
                </div>

                {/* Logo Section */}
                <div className="relative h-1/4 flex flex-col items-center justify-center pt-8">
                    <motion.div
                        whileHover={{ rotate: 10 }}
                        className="w-24 h-24 bg-lofi-card lofi-border rounded-full flex items-center justify-center stamp-border"
                    >
                        <Leaf className="w-12 h-12 text-lofi-text" />
                    </motion.div>
                </div>

                {/* Content Section */}
                <div className="flex-1 px-8 flex flex-col z-10">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-display font-bold text-lofi-text mb-1 tracking-tight">Breeze</h1>
                        <p className="text-lofi-text font-medium opacity-60">
                            {isSignUp ? "Join the Growth Journey" : "Your Growth Companion"}
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleAuth}>
                        <div className="relative group">
                            <input
                                className="w-full px-6 py-4 bg-lofi-card border-2 border-lofi-text rounded-full focus:ring-4 focus:ring-lofi-yellow/20 outline-none text-lofi-text text-lg font-medium placeholder:text-lofi-grey transition-all"
                                placeholder="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <input
                                className="w-full px-6 py-4 bg-lofi-card border-2 border-lofi-text rounded-full focus:ring-4 focus:ring-lofi-yellow/20 outline-none text-lofi-text text-lg font-medium placeholder:text-lofi-grey transition-all"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-lofi-text opacity-60 hover:opacity-100 transition-opacity"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-destructive text-sm font-bold text-center px-4"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98, y: 0 }}
                            className="w-full bg-lofi-yellow border-[3px] border-lofi-text lofi-shadow hover:translate-y-[-2px] text-lofi-black font-display font-black py-4 rounded-full transition-all text-xl mt-4 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                isSignUp ? "Create Account" : "Log In"
                            )}
                        </motion.button>
                    </form>

                    {/* Footer Auth Navigation */}
                    <div className="mt-auto mb-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1.5px] flex-1 bg-lofi-text opacity-20"></div>
                            <span className="text-lofi-text opacity-40 text-[10px] font-black uppercase tracking-[0.2em]">Or continue with</span>
                            <div className="h-[1.5px] flex-1 bg-lofi-text opacity-20"></div>
                        </div>

                        <div className="flex justify-center gap-6">
                            <motion.button
                                whileHover={{ y: -2 }}
                                onClick={handleGoogleLogin}
                                className="w-14 h-14 rounded-full border-2 border-lofi-text flex items-center justify-center bg-lofi-card/50 hover:bg-lofi-card transition-colors"
                            >
                                <svg className="h-6 w-6" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </motion.button>
                        </div>

                        <p className="text-center mt-8 text-lofi-text text-sm font-medium">
                            {isSignUp ? "Already a sprout?" : "New to the garden?"}{" "}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="font-bold underline decoration-2 hover:text-lofi-yellow transition-colors"
                            >
                                {isSignUp ? "Log In" : "Join the Community"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Home Indicator Decor */}
                <div className="flex justify-center pb-4">
                    <div className="w-32 h-1.5 bg-lofi-text rounded-full opacity-10"></div>
                </div>
            </motion.div>
        </div>
    )
}
