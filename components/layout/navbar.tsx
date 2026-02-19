"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Wind, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [user, setUser] = React.useState<any>(null)
    const pathname = usePathname()
    const supabase = createClient()
    const router = useRouter()

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)

        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            window.removeEventListener("scroll", handleScroll)
            subscription.unsubscribe()
        }
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-300 w-[92%] md:w-[90%] max-w-7xl rounded-2xl font-space-grotesk",
                    scrolled ? "bg-lofi-bg lofi-border lofi-shadow border-4" : "bg-lofi-bg/50 backdrop-blur-sm lofi-border border-4"
                )}
                initial={{ y: -100, x: "-50%" }}
                animate={{ y: 0, x: "-50%" }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ rotate: 10 }}
                            className="rounded-full bg-lofi-yellow lofi-border p-1.5 text-lofi-black"
                        >
                            <Wind className="h-5 w-5" />
                        </motion.div>
                        <span className="text-xl font-black uppercase italic tracking-tight text-lofi-text">
                            Breeze
                        </span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/#features" className="text-xs font-black uppercase tracking-widest text-lofi-text/60 hover:text-lofi-text transition-colors">
                        Features
                    </Link>
                    <Link href="/#philosophy" className="text-xs font-black uppercase tracking-widest text-lofi-text/60 hover:text-lofi-text transition-colors">
                        Why us?
                    </Link>
                </nav>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden sm:flex items-center gap-4">
                        {user ? (
                            <>
                                <Link href="/dashboard">
                                    <button className="text-xs font-black uppercase tracking-widest px-4 py-2 hover:underline decoration-2 underline-offset-4 text-lofi-text">
                                        Dashboard
                                    </button>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-lofi-black text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest lofi-shadow hover:translate-y-[-2px] transition-transform"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="text-xs font-black uppercase tracking-widest px-4 py-2 hover:underline decoration-2 underline-offset-4 text-lofi-text">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/login">
                                    <button className="bg-lofi-yellow text-lofi-black lofi-border px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest lofi-shadow hover:translate-y-[-2px] transition-transform">
                                        JOIN NOW
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    <ThemeToggle />

                    <button
                        className="md:hidden p-2 text-lofi-text hover:bg-lofi-grey rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-40 md:hidden bg-lofi-bg flex flex-col items-center justify-center p-6 pt-24 font-space-grotesk"
                    >
                        <nav className="flex flex-col items-center gap-8 mb-12">
                            <Link
                                href="/#features"
                                className="text-3xl font-black uppercase italic tracking-tighter text-lofi-text hover:text-lofi-yellow transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="/#philosophy"
                                className="text-3xl font-black uppercase italic tracking-tighter text-lofi-text hover:text-lofi-yellow transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Why us?
                            </Link>
                            {user && (
                                <Link
                                    href="/dashboard"
                                    className="text-3xl font-black uppercase italic tracking-tighter text-lofi-text hover:text-lofi-yellow transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            )}
                        </nav>

                        <div className="w-full max-w-sm flex flex-col gap-4">
                            {!user ? (
                                <>
                                    <Link href="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full bg-lofi-yellow text-lofi-black lofi-border py-4 rounded-2xl text-xl font-black uppercase tracking-widest lofi-shadow">
                                            JOIN NOW
                                        </button>
                                    </Link>
                                    <Link href="/login" className="w-full text-center" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="text-lg font-black uppercase tracking-widest text-lofi-text hover:underline decoration-2 underline-offset-8">
                                            Login
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full bg-lofi-black text-white py-4 rounded-2xl text-xl font-black uppercase tracking-widest lofi-shadow"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
