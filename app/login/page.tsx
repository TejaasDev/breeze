"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Heart, CloudLightning, Leaf, Eye, EyeOff, Loader2, Sparkles, ArrowRight } from "lucide-react"

import Image from "next/image"

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
        <div className="min-h-screen flex bg-lofi-bg font-quicksand">
            {/* Left Side: Decorative & Brand (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-lofi-yellow/20 relative overflow-hidden border-r-[4px] border-lofi-text grid-background">
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-12"
                    >
                        <div className="w-14 h-14 bg-lofi-card lofi-border rounded-xl flex items-center justify-center stamp-shadow relative overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Breeze Logo"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-2xl font-display font-black tracking-tight text-lofi-text">Breeze</span>
                    </motion.div>

                    <div className="max-w-md">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-6xl font-display font-black text-lofi-text mb-6 leading-tight"
                        >
                            Your digital <br />
                            <span className="text-lofi-yellow lofi-outline-text">sanctuary</span> for growth.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-lofi-text opacity-70 font-medium"
                        >
                            Log in to continue your journey of mindfulness, reflection, and personal evolution.
                        </motion.p>
                    </div>
                </div>

                <div className="relative z-10 flex gap-4">
                    <div className="px-6 py-3 bg-lofi-card lofi-border rounded-full flex items-center gap-2 text-sm font-bold shadow-md">
                        <Sparkles className="w-4 h-4 text-lofi-yellow fill-lofi-yellow" />
                        <span>AI-Powered Companion</span>
                    </div>
                    <div className="px-6 py-3 bg-lofi-card lofi-border rounded-full flex items-center gap-2 text-sm font-bold shadow-md">
                        <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                        <span>Wellness First</span>
                    </div>
                </div>

                {/* Decorative floating icons */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[10%] opacity-20"
                >
                    <Sun className="w-32 h-32 text-lofi-text" />
                </motion.div>
                <div className="absolute bottom-[-5%] left-[10%] opacity-10">
                    <CloudLightning className="w-48 h-48 text-lofi-text" />
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden grid-background lg:bg-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[450px]"
                >
                    {/* Brand Mobile Only */}
                    <div className="flex flex-col items-center lg:hidden mb-12">
                        <div className="w-20 h-20 bg-lofi-card lofi-border rounded-2xl flex items-center justify-center stamp-shadow mb-4 relative overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Breeze Logo"
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-3xl font-display font-black text-lofi-text">Breeze</h1>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-4xl font-display font-black text-lofi-text mb-2">
                            {isSignUp ? "Start Growing" : "Welcome Back"}
                        </h2>
                        <p className="text-lofi-text opacity-60 font-medium text-lg">
                            {isSignUp
                                ? "Join the community and track your progress."
                                : "The garden has missed you. Log in to your space."}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <motion.button
                            whileHover={{ y: -2, scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-lofi-card border-[3px] border-lofi-text lofi-shadow rounded-2xl font-bold text-lofi-text hover:bg-lofi- cream transition-all"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </motion.button>

                        <div className="flex items-center gap-4">
                            <div className="h-[2px] flex-1 bg-lofi-text opacity-10"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lofi-text opacity-30 whitespace-nowrap">Or use email</span>
                            <div className="h-[2px] flex-1 bg-lofi-text opacity-10"></div>
                        </div>

                        <form className="space-y-4" onSubmit={handleAuth}>
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase tracking-wider text-lofi-text opacity-70 ml-1">Email Address</label>
                                <input
                                    className="w-full px-6 py-4 bg-lofi-card border-[3px] border-lofi-text rounded-2xl focus:ring-4 focus:ring-lofi-yellow/20 outline-none text-lofi-text text-lg font-medium placeholder:text-lofi-grey transition-all"
                                    placeholder="your@email.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase tracking-wider text-lofi-text opacity-70 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        className="w-full px-6 py-4 bg-lofi-card border-[3px] border-lofi-text rounded-2xl focus:ring-4 focus:ring-lofi-yellow/20 outline-none text-lofi-text text-lg font-medium placeholder:text-lofi-grey transition-all"
                                        placeholder="••••••••"
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
                                        {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-rose-50 border-2 border-rose-200 text-rose-600 p-4 rounded-xl text-sm font-bold text-center"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98, y: 0 }}
                                className="w-full bg-lofi-yellow border-[3px] border-lofi-text lofi-shadow hover:translate-y-[-2px] text-zinc-900 font-display font-black py-4 px-6 rounded-2xl transition-all text-xl mt-4 flex items-center justify-center gap-3 group"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        {isSignUp ? "Plant Your Seed" : "Enter the Garden"}
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <p className="text-center mt-10 text-lofi-text font-medium text-lg">
                            {isSignUp ? "Already a sprout?" : "New to the garden?"}{" "}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="font-bold underline decoration-[3px] underline-offset-4 decoration-lofi-yellow hover:text-lofi-yellow transition-colors"
                            >
                                {isSignUp ? "Log In" : "Join the Community"}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
