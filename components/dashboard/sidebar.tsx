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
import Image from "next/image"
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

            <div className="p-8 border-t-4 border-lofi-border bg-lofi-card/50 backdrop-blur-sm text-lofi-text">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full lofi-border bg-pastel-pink lofi-shadow flex items-center justify-center text-sm font-black text-black">
                        P
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-black uppercase truncate">Professor</p>
                        <p className="text-[10px] font-black opacity-80 uppercase tracking-widest truncate">Level 14 • Bloom Status</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
