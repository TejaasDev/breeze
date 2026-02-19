"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Wind } from "lucide-react"

import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false)
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
        <motion.header
            className={cn(
                "fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 w-[90%] max-w-7xl rounded-2xl font-space-grotesk",
                scrolled ? "bg-white lofi-border lofi-shadow border-4" : "bg-white/50 backdrop-blur-sm lofi-border border-4"
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
                    <span className="text-xl font-black uppercase italic tracking-tight text-lofi-black">
                        Breeze
                    </span>
                </Link>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                <Link href="/#features" className="text-xs font-black uppercase tracking-widest text-lofi-black/60 hover:text-lofi-black transition-colors">
                    Features
                </Link>
                <Link href="/#philosophy" className="text-xs font-black uppercase tracking-widest text-lofi-black/60 hover:text-lofi-black transition-colors">
                    Why us?
                </Link>
            </nav>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link href="/dashboard">
                            <button className="hidden sm:inline-flex text-xs font-black uppercase tracking-widest px-4 py-2 hover:underline decoration-2 underline-offset-4">
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
                            <button className="hidden sm:inline-flex text-xs font-black uppercase tracking-widest px-4 py-2 hover:underline decoration-2 underline-offset-4">
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
        </motion.header>
    )
}
