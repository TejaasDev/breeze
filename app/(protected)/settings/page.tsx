"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Monitor, LogOut, User, Camera, Save, X, Loader2, ShieldAlert } from "lucide-react"
import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { isAllowedImageUrl, isValidDisplayName, sanitizeText } from "@/lib/security"

export default function SettingsPage() {
    const { setTheme, theme } = useTheme()
    const supabase = createClient()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [validationError, setValidationError] = useState<string | null>(null)
    const [editForm, setEditForm] = useState({
        full_name: "",
        avatar_url: ""
    })

    useEffect(() => {
        async function loadSettings() {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                setProfile(profileData)
                if (profileData) {
                    setEditForm({
                        full_name: profileData.full_name || "",
                        avatar_url: profileData.avatar_url || ""
                    })
                }
            }
            setLoading(false)
        }
        loadSettings()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/")
        router.refresh()
    }

    const handleSaveProfile = async () => {
        setValidationError(null)

        // Validate display name
        const trimmedName = editForm.full_name.trim()
        if (trimmedName && !isValidDisplayName(trimmedName)) {
            setValidationError("Name can only contain letters, numbers, spaces, and basic punctuation (max 50 chars).")
            return
        }

        // Validate avatar URL — prevents javascript: URI and arbitrary domain injection
        const trimmedUrl = editForm.avatar_url.trim()
        if (trimmedUrl && !isAllowedImageUrl(trimmedUrl)) {
            setValidationError("Avatar URL must be a valid HTTPS link from a trusted source (Supabase, Google, GitHub, or DiceBear).")
            return
        }

        setSaving(true)

        // Sanitize before database write
        const sanitizedName = trimmedName ? sanitizeText(trimmedName) : ""

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                full_name: sanitizedName,
                avatar_url: trimmedUrl,
                updated_at: new Date().toISOString()
            })

        if (error) {
            // Don't expose raw database errors to the user
            setValidationError("Failed to save profile. Please try again.")
        } else {
            setProfile({ ...profile, full_name: sanitizedName, avatar_url: trimmedUrl })
            setIsEditing(false)
            router.refresh()
        }
        setSaving(false)
    }

    // Safe avatar renderer — only renders whitelisted URLs
    const renderAvatar = (url: string | null | undefined) => {
        if (url && isAllowedImageUrl(url)) {
            return <img src={url} alt="Profile" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        }
        return <User className="h-12 w-12 text-lofi-text" />
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-lofi-text" />
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-2xl mx-auto pb-20 font-space-grotesk">
            <h1 className="text-4xl font-black uppercase tracking-tight text-lofi-text">Settings</h1>

            {/* Profile Section */}
            <Card className="lofi-border lofi-shadow border-4 overflow-hidden">
                <CardHeader className="bg-lofi-card border-b-4 border-lofi-border">
                    <CardTitle className="text-xl font-black uppercase flex justify-between items-center text-lofi-text">
                        Profile
                        {!isEditing && (
                            <Button
                                onClick={() => {
                                    setIsEditing(true)
                                    setValidationError(null)
                                }}
                                variant="outline"
                                size="sm"
                                className="lofi-border font-black uppercase text-xs"
                            >
                                Edit Profile
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-lofi-card dark:bg-lofi-card-bg">
                    <AnimatePresence mode="wait">
                        {isEditing ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="display-name" className="text-xs font-black uppercase tracking-widest text-lofi-text/60">Display Name</label>
                                        <input
                                            id="display-name"
                                            value={editForm.full_name}
                                            onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                                            className="w-full p-4 bg-lofi-bg lofi-border rounded-xl font-bold text-lofi-text focus:outline-none focus:ring-2 focus:ring-lofi-yellow"
                                            placeholder="Enter your name"
                                            maxLength={50}
                                            autoComplete="name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="avatar-url" className="text-xs font-black uppercase tracking-widest text-lofi-text/60">Avatar URL</label>
                                        <input
                                            id="avatar-url"
                                            value={editForm.avatar_url}
                                            onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })}
                                            className="w-full p-4 bg-lofi-bg lofi-border rounded-xl font-bold text-lofi-text focus:outline-none focus:ring-2 focus:ring-lofi-yellow"
                                            placeholder="https://example.com/avatar.jpg"
                                            maxLength={500}
                                            type="url"
                                        />
                                        <span className="text-[10px] font-bold text-lofi-text/40 ml-1">Only HTTPS URLs from Supabase, Google, GitHub, or DiceBear are allowed.</span>
                                    </div>
                                </div>

                                {validationError && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2 p-3 bg-rose-50 border-2 border-rose-200 rounded-xl text-rose-600 text-sm font-bold"
                                    >
                                        <ShieldAlert className="w-4 h-4 shrink-0" />
                                        {validationError}
                                    </motion.div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        onClick={handleSaveProfile}
                                        disabled={saving}
                                        className="flex-1 bg-lofi-yellow text-zinc-900 lofi-border font-black uppercase lofi-shadow hover:translate-y-[-2px]"
                                    >
                                        {saving ? <Loader2 className="animate-spin h-5 w-5" /> : <> <Save className="mr-2 h-5 w-5" /> Save Changes</>}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setIsEditing(false)
                                            setValidationError(null)
                                        }}
                                        variant="outline"
                                        className="lofi-border font-black uppercase text-lofi-text"
                                    >
                                        <X className="mr-2 h-5 w-5" /> Cancel
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col sm:flex-row items-center gap-6"
                            >
                                <div className="relative">
                                    <div className="h-24 w-24 rounded-full lofi-border border-4 bg-pastel-pink lofi-shadow overflow-hidden flex items-center justify-center">
                                        {renderAvatar(profile?.avatar_url)}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-lofi-yellow lofi-border p-1.5 rounded-full lofi-shadow border-zinc-900">
                                        <Camera className="h-4 w-4 text-zinc-900" />
                                    </div>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-2xl font-black uppercase text-lofi-text tracking-tight">
                                        {profile?.full_name || "New Voyager"}
                                    </h3>
                                    <p className="text-sm font-bold text-lofi-text opacity-70 italic">
                                        {user?.email}
                                    </p>
                                    <div className="mt-3 flex gap-2 justify-center sm:justify-start">
                                        <Badge className="bg-mint-green text-charcoal lofi-border uppercase text-[10px] font-black tracking-widest px-3 py-1">
                                            LVL {Math.floor((profile?.xp || 0) / 100) + 1}
                                        </Badge>
                                        <Badge className="bg-pastel-yellow text-charcoal lofi-border uppercase text-[10px] font-black tracking-widest px-3 py-1">
                                            {profile?.streak || 0}-DAY STREAK
                                        </Badge>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card className="lofi-border lofi-shadow border-4 overflow-hidden">
                <CardHeader className="bg-lofi-card border-b-4 border-lofi-border">
                    <CardTitle className="text-xl font-black uppercase text-lofi-text">Appearance</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-lofi-card dark:bg-lofi-card-bg">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { id: "light", icon: Sun, label: "Day" },
                            { id: "dark", icon: Moon, label: "Night" },
                            { id: "system", icon: Monitor, label: "System" }
                        ].map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => setTheme(mode.id)}
                                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-4 transition-all lofi-shadow ${theme === mode.id
                                    ? 'bg-lofi-text text-lofi-bg border-lofi-text translate-y-[-4px]'
                                    : 'bg-lofi-bg border-lofi-border text-lofi-text opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <mode.icon className="h-8 w-8" />
                                <span className="text-xs font-black uppercase tracking-widest">{mode.label}</span>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Membership */}
            <Card className="lofi-border lofi-shadow border-4 overflow-hidden">
                <CardHeader className="bg-lofi-card border-b-4 border-lofi-border">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-black uppercase text-lofi-text">Membership</CardTitle>
                        <Badge className="bg-lofi-yellow text-zinc-900 lofi-border uppercase text-[10px] font-black px-4 py-1.5 lofi-shadow tracking-[0.2em] border-zinc-900">FREE</Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4 bg-lofi-card dark:bg-lofi-card-bg">
                    <p className="text-sm font-bold text-lofi-text leading-relaxed italic">
                        You are currently exploring Breeze on the Seedling plan. <br />
                        Upgrade to unlock Forest Insights, Voice Journaling, and deeper growth metrics.
                    </p>
                    <Button className="w-full bg-lofi-text text-lofi-bg lofi-border font-black uppercase tracking-widest py-6 lofi-shadow hover:translate-y-[-2px] transition-transform">
                        UPGRADE TO PREMIUM
                    </Button>
                </CardContent>
            </Card>

            <div className="pt-12">
                <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full py-8 lofi-border border-4 font-black uppercase tracking-[0.3em] text-xl lofi-shadow-destructive bg-rose-500 hover:bg-rose-600 border-black text-white"
                >
                    <LogOut className="mr-4 h-6 w-6" />
                    DISCONNECT
                </Button>
            </div>
        </div>
    )
}
