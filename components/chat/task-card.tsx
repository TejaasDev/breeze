"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface ChatTaskCardProps {
    title: string
    description: string
    xp: number
    onAccept: () => void
}

export function ChatTaskCard({ title, description, xp, onAccept }: ChatTaskCardProps) {
    return (
        <Card className="max-w-sm border-2 border-primary/10 shadow-lg bg-card/95 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">+{xp} XP</span>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <CardDescription className="text-sm leading-relaxed text-foreground/80">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Button onClick={onAccept} className="w-full rounded-full h-8 text-xs" variant="calm">
                    Accept Challenge
                    <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
            </CardFooter>
        </Card>
    )
}
