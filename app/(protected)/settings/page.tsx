"use client"

import { useTheme } from "next-themes"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Monitor, LogOut } from "lucide-react"

export default function SettingsPage() {
    const { setTheme, theme } = useTheme()

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <h1 className="font-heading text-3xl font-bold">Settings</h1>

            {/* Profile Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                        ME
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">Tejaas</h3>
                        <p className="text-sm text-muted-foreground">tejaas@example.com</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                </CardContent>
            </Card>

            {/* Theme Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => setTheme("light")}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                        >
                            <Sun className="h-6 w-6" />
                            <span className="text-sm font-medium">Light</span>
                        </button>
                        <button
                            onClick={() => setTheme("dark")}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                        >
                            <Moon className="h-6 w-6" />
                            <span className="text-sm font-medium">Dark</span>
                        </button>
                        <button
                            onClick={() => setTheme("system")}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${theme === 'system' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                        >
                            <Monitor className="h-6 w-6" />
                            <span className="text-sm font-medium">System</span>
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Subscription */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Membership</CardTitle>
                        <Badge variant="secondary">Free Tier</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        You are currently on the Free plan. Upgrade to unlock voice reflection, advanced insights, and more.
                    </p>
                    <Button variant="calm" className="w-full">Upgrade to Premium</Button>
                </CardContent>
            </Card>

            <div className="pt-8 text-center">
                <Button variant="destructive" className="w-full sm:w-auto">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
            </div>
        </div>
    )
}
