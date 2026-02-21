"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-browser"
import { motion } from "framer-motion"
import Image from "next/image"
import {
    Trophy,
    Bell,
    Sprout,
    Heart,
    Flame,
    Lightbulb,
    Sun,
    Leaf,
    Wind,
    ArrowUpRight,
    TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

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
        <div className="space-y-8 font-space-grotesk pb-12">
            {/* Header Section */}
            <header className="flex justify-between items-center">
                <div className="text-charcoal flex items-center gap-3">
                    <div className="w-12 h-12 bg-lofi-card lofi-border rounded-xl flex items-center justify-center p-1 relative overflow-hidden lofi-shadow md:hidden">
                        <Image
                            src="/logo.png"
                            alt="Breeze Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight uppercase text-charcoal">Breeze</h1>
                        <p className="text-sm font-black text-charcoal/80">
                            Good morning, {user?.email?.split('@')[0] || 'Voyager'}
                        </p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-lofi-card lofi-border rounded-full flex items-center justify-center lofi-shadow text-charcoal"
                >
                    <Bell className="w-6 h-6" />
                </motion.button>
            </header>

            {/* Bloom Status / Main Stats Card */}
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-mint-green lofi-border rounded-[30px] p-8 lofi-shadow relative overflow-hidden border-2 border-deep-mint/50 shadow-[inset_0_0_40px_rgba(74,222,128,0.1)]"
                >
                    <div className="flex flex-col items-center text-center relative z-10 text-deep-mint">
                        <div className="relative mb-6">
                            <div className="w-40 h-40 bg-lofi-card/40 border-2 border-deep-mint/50 rounded-full p-1 overflow-hidden lofi-shadow">
                                <img
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                    src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                                />
                            </div>
                            <div className="absolute -bottom-2 -left-2 bg-lofi-card/60 backdrop-blur-md border-2 border-deep-mint/60 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest lofi-shadow text-deep-mint">
                                LVL {Math.floor((profile?.xp || 0) / 100) + 1}
                            </div>
                        </div>
                        <h2 className="text-4xl font-black uppercase mb-1 tracking-tight">BLOOM STATUS</h2>
                        <p className="text-sm font-black opacity-80 uppercase tracking-widest mb-6">
                            {profile?.streak > 0 ? `Growing ${profile.streak * 5}% faster this week!` : "Ready to start growing?"}
                        </p>

                        <div className="w-full bg-lofi-text/10 border-2 border-deep-mint/40 h-8 rounded-full overflow-hidden mb-3 lofi-shadow shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(profile?.xp % 100) || 30}%` }}
                                className="bg-deep-mint h-full shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                            />
                        </div>
                        <div className="flex justify-between w-full text-xs font-black uppercase tracking-widest">
                            <span>Seedling</span>
                            <span>Sprout</span>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 text-deep-mint/10 transform rotate-12">
                        <Sprout className="w-32 h-32" />
                    </div>
                </motion.div>
            </section>

            {/* Quick Stats Grid */}
            <section className="grid grid-cols-2 gap-6">
                <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-pastel-pink/20 lofi-border lofi-glass p-6 rounded-[28px] lofi-shadow flex flex-col items-start gap-4 border-2 border-deep-pink/30 hover:bg-pastel-pink/30 transition-all"
                >
                    <div className="bg-lofi-card/50 border-2 border-deep-pink p-2 rounded-xl text-deep-pink lofi-shadow">
                        <Heart className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-lofi-text/60 mb-1">Vitality</h3>
                        <p className="text-4xl font-black text-lofi-text">84%</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-pastel-yellow/20 lofi-border lofi-glass p-6 rounded-[28px] lofi-shadow flex flex-col items-start gap-4 border-2 border-deep-yellow/30 hover:bg-pastel-yellow/30 transition-all"
                >
                    <div className="bg-lofi-card/50 border-2 border-deep-yellow p-2 rounded-xl text-deep-yellow lofi-shadow">
                        <Flame className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-lofi-text/60 mb-1">Streak</h3>
                        <p className="text-4xl font-black text-lofi-text">{profile?.streak || 12}</p>
                    </div>
                </motion.div>
            </section>

            {/* Mood Cycle Chart */}
            <section>
                <div className="flex justify-between items-end mb-4 px-2">
                    <h3 className="text-2xl font-black uppercase text-lofi-text tracking-tight">Mood Cycle</h3>
                    <div className="flex bg-lofi-card/40 backdrop-blur-md lofi-border p-1 rounded-xl text-[10px] font-black uppercase text-lofi-text border-2 border-lofi-border/50 lofi-shadow">
                        <button className="px-5 py-2 bg-lofi-text text-lofi-bg rounded-lg shadow-lg">Wk</button>
                        <button className="px-5 py-2 opacity-50 hover:opacity-100 transition-opacity">Mo</button>
                        <button className="px-5 py-2 opacity-50 hover:opacity-100 transition-opacity">Yr</button>
                    </div>
                </div>
                <div className="bg-lofi-card/50 lofi-border lofi-glass p-10 rounded-[40px] border-2 border-lofi-border/30 relative h-64 flex items-center justify-center overflow-hidden">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M0,80 C50,50 100,120 150,70 C200,20 250,90 300,60 C350,30 400,80 400,80"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="5"
                            className="text-deep-mint opacity-80"
                        />
                        <motion.circle
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            cx="150" cy="70" fill="currentColor" r="8"
                            className="text-deep-mint shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                        />
                    </svg>
                    <div className="absolute bottom-6 left-12 right-12 flex justify-between text-xs font-black text-lofi-text opacity-40 uppercase tracking-widest">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>
            </section>

            {/* Daily Boost / Mission Section */}
            <section>
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-lofi-card border-2 border-deep-mint/50 p-8 rounded-[30px] lofi-shadow flex gap-6 items-start"
                >
                    <div className="shrink-0">
                        <div className="bg-mint-green border-2 border-deep-mint/40 p-3 rounded-2xl text-deep-mint lofi-shadow">
                            <Lightbulb className="w-8 h-8" />
                        </div>
                    </div>
                    <div className="flex-1 text-deep-mint">
                        <h4 className="font-black uppercase text-base mb-2 tracking-tight">Today's Mission</h4>
                        <p className="text-lg font-black leading-snug">
                            {profile?.current_task || "The Coffee Shop Smile: Briefly visit a store and smile at the cashier."}
                        </p>
                        <button className="mt-4 text-sm font-black uppercase underline decoration-4 underline-offset-4 hover:text-lofi-yellow transition-colors flex items-center gap-2">
                            Go to Mission <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Vibe Gallery */}
            <section>
                <h3 className="text-2xl font-black uppercase text-charcoal mb-6">Vibe Gallery</h3>
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Reflect", icon: Wind, color: "bg-deep-mint/10", border: "border-deep-mint/30", rotate: "-rotate-2", text: "text-deep-mint" },
                        { label: "Meditate", icon: Leaf, color: "bg-deep-pink/10", border: "border-deep-pink/30", rotate: "rotate-3", text: "text-deep-pink" },
                        { label: "Focus", icon: TrendingUp, color: "bg-deep-yellow/10", border: "border-deep-yellow/30", rotate: "-rotate-1", text: "text-deep-yellow" },
                        { label: "Breathe", icon: Wind, color: "bg-lofi-card/20", border: "border-lofi-border/30", rotate: "rotate-2", text: "text-lofi-text" },
                    ].map((vibe, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ rotate: 0, scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                            className={`${vibe.color} ${vibe.border} border-2 min-w-[140px] aspect-square lofi-glass rounded-3xl p-6 flex flex-col justify-between lofi-shadow transition-all`}
                        >
                            <div className={cn("bg-lofi-card/50 border-2 border-current p-2 rounded-xl self-start lofi-shadow", vibe.text)}>
                                <vibe.icon className="w-6 h-6" />
                            </div>
                            <span className={cn("text-xs font-black uppercase tracking-widest", vibe.text)}>{vibe.label}</span>
                        </motion.div>
                    ))}
                </section>
            </section>
        </div>
    )
}
