"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, Lock } from "lucide-react"

export default function GrowthPage() {
    const badges = [
        { name: "First Step", description: "Complete your first task", unlocked: true, icon: "🌱" },
        { name: "Week Warrior", description: "7 day streak", unlocked: false, icon: "🔥" },
        { name: "Voice Activated", description: "Record a voice reflection", unlocked: false, icon: "🎤" },
        { name: "Social Butterfly", description: "Complete 10 social tasks", unlocked: false, icon: "🦋" },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="font-heading text-3xl font-bold">Your Growth</h1>
                <Badge variant="calm" className="text-sm px-3 py-1">Level 3: Silent Observer</Badge>
            </div>

            {/* Level Progress */}
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Current Level Progress</p>
                            <h2 className="text-4xl font-bold font-heading text-primary">350 <span className="text-xl text-muted-foreground font-normal">/ 500 XP</span></h2>
                        </div>
                        <Trophy className="h-10 w-10 text-amber-500 opacity-80" />
                    </div>
                    <div className="h-3 bg-background rounded-full overflow-hidden border border-primary/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-primary"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Confidence Graph */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-accent-foreground" />
                        Confidence Projection
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48 flex items-end gap-2 pt-8">
                        {[30, 35, 32, 45, 50, 65, 50, 60, 75, 70, 85, 90].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className={`flex-1 rounded-t-sm ${i > 8 ? 'bg-primary/20 dashed-border' : 'bg-primary'}`}
                            >
                                {i === 11 && (
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap">
                                        Goal
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Month 1</span>
                        <span>Projected</span>
                    </div>
                </CardContent>
            </Card>

            {/* Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, i) => (
                    <Card key={i} className={`text-center p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 ${badge.unlocked ? 'border-primary/20 bg-primary/5' : 'opacity-60 grayscale bg-muted/20'}`}>
                        <div className="text-4xl mb-2">{badge.unlocked ? badge.icon : <Lock className="h-8 w-8 text-muted-foreground mx-auto" />}</div>
                        <h3 className="font-semibold text-sm">{badge.name}</h3>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}
