"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12",
                scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Wind className="h-5 w-5" />
                    </div>
                    <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                        Breeze
                    </span>
                </Link>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    How it Works
                </Link>
                <Link href="/#philosophy" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Philosophy
                </Link>
                <Link href="/#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Membership
                </Link>
            </nav>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link href="/dashboard">
                            <Button variant="ghost" className="hidden sm:inline-flex">
                                Dashboard
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={handleLogout} className="hidden sm:inline-flex">
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="ghost" className="hidden sm:inline-flex">
                                Login
                            </Button>
                        </Link>
                        <Link href="/onboarding">
                            <Button variant="calm">
                                Start Journey
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </motion.header>
    )
}
