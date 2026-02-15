"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
// Note: I need to create Progress component or use a simple div for now if it doesn't exist.
// I'll create a simple progress bar inline for now or create the component. 
// I'll assume I can create the Progress component quickly or use a custom one.

import { ArrowRight, Check, Sparkles } from "lucide-react"

// Types
type Step = "welcome" | "emotion" | "assessment" | "analyzing" | "result"

import { createClient } from "@/lib/supabase-browser"

export default function OnboardingPage() {
    const [step, setStep] = React.useState<Step>("welcome")
    const [progress, setProgress] = React.useState(10)
    const [selections, setSelections] = React.useState({
        emotion: "",
        assessment: ""
    })
    const [isSaving, setIsSaving] = React.useState(false)

    const supabase = createClient()

    // Handlers for transitions
    const handleStart = () => {
        setStep("emotion")
        setProgress(25)
    }

    const handleEmotionSelect = (emotion: string) => {
        setSelections(prev => ({ ...prev, emotion }))
        setStep("assessment")
        setProgress(50)
    }

    const handleAssessmentComplete = async (assessment: string) => {
        setSelections(prev => ({ ...prev, assessment }))
        setStep("analyzing")
        setProgress(85)

        // Save to Supabase
        setIsSaving(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                await supabase.from('profiles').upsert({
                    id: user.id,
                    onboarding_emotion: selections.emotion,
                    onboarding_assessment: assessment,
                    onboarding_completed: true,
                    updated_at: new Date().toISOString(),
                })
            }
        } catch (error) {
            console.error('Error saving onboarding data:', error)
        } finally {
            setIsSaving(false)
        }

        // Simulate generic analysis time
        setTimeout(() => {
            setStep("result")
            setProgress(100)
        }, 2000)
    }

    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            <AnimatePresence mode="wait">
                {step === "welcome" && <WelcomeStep key="welcome" onNext={handleStart} />}
                {step === "emotion" && <EmotionStep key="emotion" onNext={(e) => handleEmotionSelect(e)} />}
                {step === "assessment" && <AssessmentStep key="assessment" onNext={(a) => handleAssessmentComplete(a)} />}
                {step === "analyzing" && <AnalyzingStep key="analyzing" />}
                {step === "result" && <ResultStep key="result" />}
            </AnimatePresence>
        </div>
    )
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center space-y-6"
        >
            <h1 className="font-heading text-4xl font-bold">Hi there.</h1>
            <p className="text-xl text-muted-foreground font-light">
                This isn't about fixing you. <br />
                It's about finding the voice you already have.
            </p>
            <div className="pt-8">
                <Button size="lg" onClick={onNext} className="rounded-full px-8">
                    I'm Ready
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    )
}

function EmotionStep({ onNext }: { onNext: (emotion: string) => void }) {
    const emotions = ["Anxious", "Stuck", "Invisible", "Overwhelmed", "Hopeful"]

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="text-center">
                <h2 className="font-heading text-2xl font-bold">How are you feeling lately?</h2>
                <p className="text-muted-foreground">Pick the word that resonates most.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emotions.map((e) => (
                    <button
                        key={e}
                        onClick={() => onNext(e)}
                        className="p-4 rounded-xl border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left font-medium"
                    >
                        {e}
                    </button>
                ))}
            </div>
        </motion.div>
    )
}

function AssessmentStep({ onNext }: { onNext: (assessment: string) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="text-center">
                <h2 className="font-heading text-2xl font-bold">In a group setting, I usually...</h2>
            </div>

            <div className="space-y-3">
                {["Stay quiet and observe", "Speak only when asked", "Worry about what to say", "Try to blend in"].map((opt) => (
                    <button
                        key={opt}
                        onClick={() => onNext(opt)}
                        className="w-full p-4 rounded-xl border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left font-medium flex items-center justify-between group"
                    >
                        {opt}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </button>
                ))}
            </div>
        </motion.div>
    )
}

function AnalyzingStep() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 space-y-6"
        >
            <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-muted border-t-primary animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
            </div>
            <p className="text-lg font-medium animate-pulse">Building your growth profile...</p>
        </motion.div>
    )
}

function ResultStep() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 text-center"
        >
            <div className="inline-flex items-center justify-center p-3 bg-accent/20 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-accent-foreground" />
            </div>

            <div className="space-y-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your Archetype</h2>
                <h1 className="font-heading text-4xl font-bold text-foreground">The Silent Observer</h1>
            </div>

            <Card className="bg-card/50 border-primary/10">
                <CardContent className="p-6 text-left space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        You see everything, but developed a habit of holding back your brilliance.
                        Often you know the answer, but you let someone else say it.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex justify-between text-sm font-medium mb-2">
                            <span>Baseline Confidence</span>
                            <span>Level 1</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[20%]" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Link href="/dashboard" className="w-full">
                <Button size="lg" className="w-full rounded-full h-12 text-base">
                    Start My First Task
                </Button>
            </Link>
        </motion.div>
    )
}
