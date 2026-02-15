"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, MessageCircle, TrendingUp, Users, Settings, Wind } from "lucide-react"

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
        <aside className="hidden md:flex flex-col w-64 border-r bg-card/50 backdrop-blur-sm h-screen sticky top-0">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Wind className="h-5 w-5" />
                    </div>
                    <span className="font-heading text-xl font-bold tracking-tight">Breeze</span>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.locked ? "#" : item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                    item.locked && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                                {item.locked && <span className="ml-auto text-[10px] uppercase font-bold tracking-widest opacity-60">Locked</span>}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                        ME
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">Tejaas</p>
                        <p className="text-xs text-muted-foreground truncate">Level 3 • Silent Observer</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
