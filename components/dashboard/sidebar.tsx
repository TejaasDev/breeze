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
    Leaf
} from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
    { href: "/dashboard", label: "Today", icon: LayoutDashboard },
    { href: "/companion", label: "Companion", icon: MessageCircle },
    { href: "/growth", label: "Growth", icon: TrendingUp },
    { href: "/community", label: "Community", icon: Users, locked: true },
    { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="hidden md:flex flex-col w-72 bg-lofi-cream border-r-4 border-lofi-black h-screen sticky top-0 font-space-grotesk grid-background">
            <div className="p-8 flex-1">
                <div className="flex items-center gap-3 mb-10">
                    <motion.div
                        whileHover={{ rotate: -10 }}
                        className="rounded-full bg-lofi-yellow lofi-border p-2 text-lofi-black lofi-shadow"
                    >
                        <Wind className="h-6 w-6" />
                    </motion.div>
                    <span className="text-2xl font-black tracking-tight uppercase italic">Breeze</span>
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
                                        ? "bg-lofi-black text-white lofi-shadow translate-y-[-2px]"
                                        : "bg-white text-lofi-black hover:bg-slate-50",
                                    item.locked && "opacity-40 cursor-not-allowed grayscale"
                                )}
                            >
                                <div className={cn(
                                    "stamp-icon",
                                    isActive ? "border-white" : "border-lofi-black"
                                )}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <span className={cn(isActive ? "text-white" : "text-lofi-black")}>
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

            <div className="p-8 border-t-4 border-lofi-black bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full lofi-border bg-pastel-pink lofi-shadow flex items-center justify-center text-sm font-black text-lofi-black">
                        P
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-black uppercase truncate">Professor</p>
                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest truncate">Level 14 • Bloom Status</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
