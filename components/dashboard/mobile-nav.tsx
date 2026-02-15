"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, MessageCircle, TrendingUp, Users, Settings } from "lucide-react"

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
        <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-lg px-6 py-3 flex justify-between items-center z-50">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.locked ? "#" : item.href}
                        className={cn(
                            "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground",
                            item.locked && "opacity-50"
                        )}
                    >
                        <item.icon className={cn("h-6 w-6", isActive && "fill-current")} />
                        {item.locked && <span className="sr-only">Locked</span>}
                    </Link>
                )
            })}
        </nav>
    )
}
