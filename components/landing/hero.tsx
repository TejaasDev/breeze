"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Wind, Leaf, Sun } from "lucide-react"

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-lofi-cream grid-background font-space-grotesk">
            <div className="container px-6 md:px-12 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center rounded-full lofi-border px-6 py-2 text-xs font-black uppercase tracking-widest text-lofi-black bg-white lofi-shadow">
                        <Sparkles className="w-4 h-4 mr-2 text-lofi-yellow fill-lofi-yellow" />
                        Confidence Unleashed
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-lofi-black uppercase leading-[0.9]">
                        Grow <span className="italic">Quietly.</span> <br />
                        <span className="text-white drop-shadow-[2px_2px_0px_#1A1A1A]">Rise Loudly.</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-lofi-black max-w-2xl mx-auto font-medium leading-tight opacity-80">
                        Not social media. Not therapy. <br />
                        Structured training disguised as a game.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-lofi-yellow text-lofi-black lofi-border px-10 py-5 rounded-[2rem] text-lg font-black uppercase lofi-shadow flex items-center gap-3"
                            >
                                Start My Journey
                                <ArrowRight className="h-5 w-5" />
                            </motion.button>
                        </Link>
                        <Link href="#features">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-lofi-black lofi-border px-10 py-5 rounded-[2rem] text-lg font-black uppercase lofi-shadow"
                            >
                                How it Works
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Floating Elements */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 opacity-30 pointer-events-none hidden lg:block"
            >
                <div className="lofi-border p-4 rounded-3xl bg-pastel-pink lofi-shadow">
                    <Leaf className="w-12 h-12 text-lofi-black" />
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 opacity-30 pointer-events-none hidden lg:block"
            >
                <div className="lofi-border p-4 rounded-3xl bg-mint-green lofi-shadow">
                    <Sun className="w-12 h-12 text-lofi-black" />
                </div>
            </motion.div>

            <div className="absolute top-10 right-[15%] opacity-20 transform rotate-12 pointer-events-none">
                <Wind className="w-32 h-32" />
            </div>
        </section>
    )
}
