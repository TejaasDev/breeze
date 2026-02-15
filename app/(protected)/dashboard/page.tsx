"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-browser"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Trophy } from "lucide-react"

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        async function loadData() {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                setProfile(data)
            }
        }
        loadData()
    }, [])

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-heading text-3xl font-bold">Good morning, {user?.email?.split('@')[0] || 'Voyager'}.</h1>
                    <p className="text-muted-foreground">
                        {profile?.onboarding_emotion ? `Feeling ${profile.onboarding_emotion.toLowerCase()}? ` : ''}
                        You're growing quieter, but stronger.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-card px-4 py-2 rounded-full border shadow-sm">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-semibold">Streak: {profile?.streak || 0} Days</span>
                </div>
            </div>

            {/* Main Task Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-l-4 border-l-primary shadow-md overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <CheckCircle2 className="h-32 w-32" />
                    </div>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardDescription className="mb-1 uppercase tracking-wider text-xs font-semibold text-primary">Today's Mission</CardDescription>
                                <CardTitle className="text-2xl">The Coffee Shop Smile</CardTitle>
                            </div>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">+50 XP</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Go to a coffee shop or store. Make brief eye contact with the cashier and smile when you say "Thank you."
                            It doesn't have to be a conversation. Just a connection.
                        </p>

                        <div className="flex gap-4">
                            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
                                <Circle className="mr-2 h-4 w-4" />
                                Mark as Complete
                            </Button>
                            <Button variant="ghost" size="lg" className="rounded-full">
                                I'm stuck
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Secondary Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium text-muted-foreground">Weekly Confidence</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-heading">+12%</div>
                        <p className="text-xs text-muted-foreground mt-1">Better than last week</p>
                        {/* Graph placeholder */}
                        <div className="h-16 mt-4 flex items-end gap-1">
                            {[40, 30, 50, 45, 60, 75, 65].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-primary' : 'bg-muted'}`} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent/20 to-transparent border-accent/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium text-muted-foreground">Next Milestone</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-heading">Level 4: The Listener</div>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>350 / 500 XP</span>
                                <span>70%</span>
                            </div>
                            <div className="h-2 bg-background/50 rounded-full overflow-hidden border border-accent/10">
                                <div className="h-full bg-accent w-[70%]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
