"use client"

import { motion } from "framer-motion"
import { BrainCircuit, Flag, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
    {
        icon: BrainCircuit,
        title: "Psychological Mapping",
        description: "AI analyzes your tone, patterns, and self-perception to build a unique growth profile.",
        color: "bg-pastel-pink",
    },
    {
        icon: Flag,
        title: "The Confidence Game",
        description: "Complete daily offline tasks. Earn XP. Track real-world growth through micro-actions.",
        color: "bg-mint-green",
    },
    {
        icon: Lock,
        title: "Community Unlock",
        description: "Social access is earned, not given. Unlock group challenges as you grow.",
        color: "bg-pastel-yellow",
    },
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-lofi-cream grid-background font-space-grotesk border-t-8 border-lofi-black">
            <div className="container px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                        A structured path <br /> to self-trust.
                    </h2>
                    <p className="text-lg font-medium opacity-70">
                        Breeze doesn't just listen. It pushes you gently into the real world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white lofi-border p-8 rounded-[2.5rem] lofi-shadow group hover:-translate-y-2 transition-transform"
                        >
                            <div className={cn(
                                "w-16 h-16 rounded-2xl lofi-border flex items-center justify-center mb-8 lofi-shadow transition-transform group-hover:rotate-6",
                                feature.color
                            )}>
                                <feature.icon className="h-8 w-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight italic">
                                {feature.title}
                            </h3>
                            <p className="text-base font-medium opacity-70 leading-tight">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
