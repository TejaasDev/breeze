"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, MessageCircle, TrendingUp, Users, Settings } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard },
    { href: "/companion", icon: MessageCircle },
    { href: "/growth", icon: TrendingUp },
    { href: "/community", icon: Users, locked: true },
    { href: "/settings", icon: Settings },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px]">
            <nav className="bg-lofi-card lofi-border rounded-[2rem] px-4 py-2 flex justify-between items-center lofi-shadow border-2 transition-colors duration-300">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.locked ? "#" : item.href}
                            className={cn(
                                "relative p-3 rounded-2xl transition-all",
                                isActive ? "bg-lofi-text text-lofi-bg" : "text-lofi-text hover:bg-lofi-grey",
                                item.locked && "opacity-40 grayscale pointer-events-none"
                            )}
                        >
                            <item.icon className={cn("h-6 w-6")} />
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-active"
                                    className="absolute -top-1 -right-1 w-2 h-2 bg-lofi-yellow rounded-full lofi-border"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
