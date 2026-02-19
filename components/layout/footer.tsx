"use client"

import Link from "next/link"
import { Wind } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
    return (
        <footer className="bg-lofi-black text-white pt-24 pb-12 font-space-grotesk">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <motion.div
                                whileHover={{ rotate: 10 }}
                                className="rounded-full bg-lofi-yellow lofi-border p-2 text-lofi-black"
                            >
                                <Wind className="h-5 w-5" />
                            </motion.div>
                            <span className="text-2xl font-black uppercase italic tracking-tighter">
                                Breeze
                            </span>
                        </div>
                        <p className="text-sm font-medium opacity-60 leading-tight">
                            Structured confidence training disguised as a game. <br />Grow quietly, rise loudly.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-6">Product</h4>
                        <ul className="space-y-4 text-sm font-bold uppercase">
                            <li><Link href="#" className="hover:text-lofi-yellow transition-colors italic">Features</Link></li>
                            <li><Link href="#" className="hover:text-lofi-yellow transition-colors italic">Methodology</Link></li>
                            <li><Link href="#" className="hover:text-lofi-yellow transition-colors italic">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-6">Company</h4>
                        <ul className="space-y-4 text-sm font-bold uppercase">
                            <li><Link href="#" className="hover:text-lofi-yellow transition-colors italic">About</Link></li>
                            <li><Link href="#" className="hover:text-lofi-yellow transition-colors italic">Blog</Link></li>
                            <li><Link href="#" className="hover:text-lofi-yellow transition-colors italic">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm font-bold uppercase">
                            <li><Link href="#" className="hover:text-lofi-yellow transition-colors italic">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-lofi-yellow transition-colors italic">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                        © {new Date().getFullYear()} BREEZE INC. BUILT FOR GROWTH.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors cursor-pointer">
                            <span className="text-[10px] font-black italic">X</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors cursor-pointer">
                            <span className="text-[10px] font-black italic">IG</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
