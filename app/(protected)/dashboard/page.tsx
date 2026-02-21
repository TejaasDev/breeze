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
    ArrowUpRight
} from "lucide-react"

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
        <div className="space-y-8 font-space-grotesk">
            {/* Header Section */}
            <header className="flex justify-between items-center">
                <div className="text-lofi-text flex items-center gap-3">
                    <div className="w-10 h-10 bg-lofi-card lofi-border rounded-xl flex items-center justify-center p-1 relative overflow-hidden lofi-shadow md:hidden">
                        <Image
                            src="/logo.png"
                            alt="Breeze Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight uppercase">Breeze</h1>
                        <p className="text-sm font-medium opacity-70">
                            Good morning, {user?.email?.split('@')[0] || 'Voyager'}
                        </p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-lofi-card lofi-border rounded-full flex items-center justify-center lofi-shadow"
                >
                    <Bell className="w-6 h-6 text-lofi-text" />
                </motion.button>
            </header>

            {/* Bloom Status / Main Stats Card */}
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-mint-green dark:bg-mint-green/20 lofi-border rounded-[30px] p-8 lofi-shadow relative overflow-hidden"
                >
                    <div className="flex flex-col items-center text-center relative z-10 text-lofi-text dark:text-white">
                        <div className="relative mb-6">
                            <div className="w-36 h-36 bg-lofi-card lofi-border rounded-full p-1 overflow-hidden">
                                <img
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                    src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || 'default'}`}
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-lofi-card lofi-border px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest lofi-shadow text-lofi-text">
                                LVL {Math.floor((profile?.xp || 0) / 100) + 1}
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold uppercase mb-1">Bloom Status</h2>
                        <p className="text-sm font-medium mb-6 italic opacity-80">
                            {profile?.streak > 0 ? `Growing ${profile.streak * 5}% faster this week!` : "Ready to start growing?"}
                        </p>

                        <div className="w-full bg-lofi-card/50 lofi-border h-6 rounded-full overflow-hidden mb-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(profile?.xp % 100) || 30}%` }}
                                className="bg-lofi-black dark:bg-white h-full"
                            />
                        </div>
                        <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-tighter opacity-60">
                            <span>Seedling</span>
                            <span>Sprout</span>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-10 transform rotate-12 text-lofi-text">
                        <Sprout className="w-24 h-24" />
                    </div>
                </motion.div>
            </section>

            {/* Quick Stats Grid */}
            <section className="grid grid-cols-2 gap-4">
                <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-pastel-pink dark:bg-pastel-pink/20 lofi-border p-5 rounded-[24px] lofi-shadow flex flex-col items-start gap-2"
                >
                    <div className="stamp-icon text-lofi-text">
                        <Heart className="w-6 h-6" />
                    </div>
                    <div className="text-lofi-text dark:text-white">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1">Confidence</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">{profile?.confidence_score || 0}</span>
                            <span className="text-xs font-bold hand-drawn text-emerald-600">+4%</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-pastel-yellow dark:bg-pastel-yellow/20 lofi-border p-5 rounded-[24px] lofi-shadow flex flex-col items-start gap-2"
                >
                    <div className="stamp-icon text-lofi-text">
                        <Flame className="w-6 h-6" />
                    </div>
                    <div className="text-lofi-text dark:text-white">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1">Streak</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">{profile?.streak || 0}</span>
                            <span className="text-xs font-bold hand-drawn">days</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Mood Cycle Chart */}
            <section>
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-xl font-bold uppercase italic text-lofi-text">Mood Cycle</h3>
                    <div className="flex bg-lofi-card lofi-border p-1 rounded-xl text-[10px] font-bold uppercase text-lofi-text">
                        <button className="px-3 py-1 bg-lofi-border text-lofi-bg rounded-lg">Wk</button>
                        <button className="px-3 py-1 opacity-40">Mo</button>
                        <button className="px-3 py-1 opacity-40">Yr</button>
                    </div>
                </div>
                <div className="bg-lofi-card lofi-border p-6 rounded-[30px] lofi-shadow relative h-48 flex items-center justify-center overflow-hidden">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M0,80 C50,50 100,120 150,70 C200,20 250,90 300,60 C350,30 400,80 400,80"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="opacity-90 text-lofi-text"
                        />
                        <motion.circle
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            cx="150" cy="70" fill="currentColor" r="6"
                            className="text-lofi-text"
                        />
                    </svg>
                    <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] font-bold text-lofi-text opacity-50 uppercase">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                        <span>Sun</span>
                    </div>
                </div>
            </section>

            {/* Daily Boost / Mission Section */}
            <section>
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-lofi-card lofi-border p-6 rounded-[24px] lofi-shadow flex gap-4 items-start"
                >
                    <div className="shrink-0">
                        <div className="stamp-icon bg-mint-green dark:bg-mint-green/80 text-lofi-black">
                            <Lightbulb className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="flex-1 text-lofi-text">
                        <h4 className="font-bold uppercase text-sm mb-1">Today's Mission</h4>
                        <p className="text-sm font-medium leading-tight opacity-80">
                            {profile?.current_task || "The Coffee Shop Smile: Briefly visit a store and smile at the cashier."}
                        </p>
                        <button className="mt-3 text-xs font-bold uppercase underline decoration-2 underline-offset-4 hover:text-lofi-yellow transition-colors flex items-center gap-1">
                            Go to Mission <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Vibe Gallery */}
            <section>
                <h3 className="text-xl font-bold uppercase italic mb-4 text-lofi-text">Vibe Gallery</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 text-lofi-text">
                    <motion.div
                        whileHover={{ rotate: 0 }}
                        className="min-w-[120px] aspect-square bg-lofi-card lofi-border rounded-2xl p-4 flex flex-col justify-between lofi-shadow rotate-[-2deg] transition-transform"
                    >
                        <div className="stamp-icon self-start">
                            <Sun className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Radiant</span>
                    </motion.div>

                    <motion.div
                        whileHover={{ rotate: 0 }}
                        className="min-w-[120px] aspect-square bg-lofi-card lofi-border rounded-2xl p-4 flex flex-col justify-between lofi-shadow rotate-[1deg] transition-transform"
                    >
                        <div className="stamp-icon self-start">
                            <Leaf className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Peaceful</span>
                    </motion.div>

                    <motion.div
                        whileHover={{ rotate: 0 }}
                        className="min-w-[120px] aspect-square bg-lofi-card lofi-border rounded-2xl p-4 flex flex-col justify-between lofi-shadow rotate-[-1deg] transition-transform"
                    >
                        <div className="stamp-icon self-start">
                            <Wind className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Dynamic</span>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
