"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
            </div>

            <div className="container px-6 md:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium text-muted-foreground bg-muted/30 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse" />
                        Breeze v1.0 (MVP) is ready
                    </div>

                    <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1]">
                        Grow Quietly. <br />
                        <span className="text-muted-foreground">Rise Loudly.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        Not social media. Not therapy. <br />
                        Structured confidence training disguised as a game.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link href="/onboarding">
                            <Button size="lg" className="rounded-full px-8 text-base h-12 shadow-lg shadow-primary/20">
                                Start My Journey
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12 bg-transparent hover:bg-muted/50">
                                How it Works
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
