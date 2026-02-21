"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    MessageCircle,
    TrendingUp,
    Users,
    Settings,
    Wind,
    Leaf,
    LogOut,
    User
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

const navItems = [
    { href: "/dashboard", label: "Today", icon: LayoutDashboard },
    { href: "/companion", label: "Companion", icon: MessageCircle },
    { href: "/growth", label: "Growth", icon: TrendingUp },
    { href: "/community", label: "Community", icon: Users, locked: true },
    { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const supabase = createClient()
    const router = useRouter()
    const [profile, setProfile] = useState<any>(null)

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                setProfile(data)
            }
        }
        loadProfile()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/")
        router.refresh()
    }

    return (
        <aside className="hidden md:flex flex-col w-72 bg-lofi-bg border-r-4 border-lofi-border h-screen sticky top-0 font-space-grotesk grid-background">
            <div className="p-8 flex-1">
                <div className="flex items-center gap-3 mb-10 text-lofi-text">
                    <motion.div
                        whileHover={{ rotate: -10 }}
                        className="rounded-2xl bg-lofi-card lofi-border p-1 text-lofi-black lofi-shadow w-12 h-12 flex items-center justify-center relative overflow-hidden"
                    >
                        <Image
                            src="/logo.png"
                            alt="Breeze Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </motion.div>
                    <span className="text-2xl font-black tracking-tight uppercase">Breeze</span>
                </div>

                <nav className="space-y-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.locked ? "#" : item.href}
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold uppercase transition-all lofi-border",
                                    isActive
                                        ? "bg-lofi-text text-lofi-bg lofi-shadow translate-y-[-2px]"
                                        : "bg-lofi-card text-lofi-text hover:bg-lofi-grey",
                                    item.locked && "opacity-40 cursor-not-allowed grayscale"
                                )}
                            >
                                <div className={cn(
                                    "stamp-icon",
                                    isActive ? "border-current" : "border-lofi-border text-lofi-text"
                                )}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <span className={cn(isActive ? "text-lofi-bg" : "text-lofi-text")}>
                                    {item.label}
                                </span>
                                {item.locked && (
                                    <span className="ml-auto text-[8px] font-black tracking-[0.2em] opacity-60">
                                        LOCKED
                                    </span>
                                )}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="p-6 border-t-4 border-lofi-border bg-lofi-card/50 backdrop-blur-sm text-lofi-text">
                <Link href="/settings" className="flex items-center gap-3 mb-4 group cursor-pointer">
                    <div className="h-10 w-10 shrink-0 rounded-full lofi-border bg-pastel-pink lofi-shadow overflow-hidden flex items-center justify-center group-hover:translate-y-[-2px] transition-transform">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-5 w-5 text-black" />
                        )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-black uppercase truncate group-hover:text-lofi-yellow transition-colors">{profile?.full_name || "Voyager"}</p>
                        <p className="text-[10px] font-black opacity-80 uppercase tracking-widest truncate">Level {Math.floor((profile?.xp || 0) / 100) + 1}</p>
                    </div>
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-lofi-card lofi-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all lofi-shadow"
                >
                    <LogOut className="h-3 w-3" />
                    Secure Logout
                </button>
            </div>
        </aside>
    )
}
