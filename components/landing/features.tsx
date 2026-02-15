"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BrainCircuit, Flag, Lock } from "lucide-react"

const features = [
    {
        icon: BrainCircuit,
        title: "Psychological Mapping",
        description: "AI analyzes your tone, patterns, and self-perception to build a unique growth profile.",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
    },
    {
        icon: Flag,
        title: "The Confidence Game",
        description: "Complete daily offline tasks. Earn XP. Track real-world growth through micro-actions.",
        color: "text-teal-500",
        bg: "bg-teal-500/10",
    },
    {
        icon: Lock,
        title: "Community Unlock",
        description: "Social access is earned, not given. Unlock group challenges as you grow.",
        color: "text-rose-500",
        bg: "bg-rose-500/10",
    },
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-muted/30">
            <div className="container px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold">
                        A structured path to self-trust.
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Breeze doesn't just listen. It pushes you gently into the real world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-none shadow-none bg-background/50 hover:bg-background transition-colors dark:bg-card/30 dark:hover:bg-card">
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${feature.bg} ${feature.color}`}>
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
