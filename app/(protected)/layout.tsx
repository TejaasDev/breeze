"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-muted/20">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto max-w-5xl p-6 md:p-12 space-y-8">
                    {children}
                </div>
            </main>
            <MobileNav />
        </div>
    )
}
