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

import Image from "next/image"

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
                    "fixed top-4 left-0 right-0 mx-auto z-50 flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-300 w-[92%] max-w-7xl rounded-2xl font-space-grotesk",
                    scrolled ? "bg-lofi-bg lofi-border lofi-shadow border-4" : "bg-lofi-bg/80 backdrop-blur-md lofi-border border-4"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <motion.div
                            whileHover={{ rotate: 10 }}
                            className="rounded-xl bg-lofi-card lofi-border p-1 text-lofi-black w-10 h-10 flex items-center justify-center relative overflow-hidden"
                        >
                            <Image
                                src="/logo.png"
                                alt="Breeze Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </motion.div>
                        <span className="text-lg md:text-xl font-black uppercase tracking-tight text-lofi-text">
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

                <div className="flex items-center gap-1 md:gap-4">
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
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-lofi-bg grid-background flex flex-col items-center justify-center p-6 font-space-grotesk"
                    >
                        {/* Custom Close Button in Overlay */}
                        <button
                            className="absolute top-8 right-8 p-3 bg-lofi-card lofi-border rounded-full lofi-shadow"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="h-8 w-8 text-lofi-text" />
                        </button>

                        <nav className="flex flex-col items-center gap-8 mb-16">
                            <Link
                                href="/#features"
                                className="text-4xl font-black uppercase italic tracking-tighter text-lofi-text hover:text-lofi-yellow transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="/#philosophy"
                                className="text-4xl font-black uppercase italic tracking-tighter text-lofi-text hover:text-lofi-yellow transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Why us?
                            </Link>
                            {user && (
                                <Link
                                    href="/dashboard"
                                    className="text-4xl font-black uppercase italic tracking-tighter text-lofi-text hover:text-lofi-yellow transition-colors"
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
