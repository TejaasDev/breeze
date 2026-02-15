"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Upload, Sparkles, Wind } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatTaskCard } from "@/components/chat/task-card"

type Message = {
    id: string
    role: "user" | "ai"
    content: string
    type?: "text" | "task" | "reflection"
}

export default function CompanionPage() {
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: "1",
            role: "ai",
            content: "Hello, Tejaas. How did the coffee shop task feel yesterday?",
            type: "text"
        }
    ])
    const [input, setInput] = React.useState("")
    const [isTyping, setIsTyping] = React.useState(false)

    const handleSend = () => {
        if (!input.trim()) return

        const newMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input
        }

        setMessages(prev => [...prev, newMsg])
        setInput("")
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
            setIsTyping(false)
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "That sounds like a great step forward. Did you notice any physical tension when you walked in?",
                type: "text"
            }])
        }, 2000)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex-1 overflow-y-auto space-y-6 p-4">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex w-full",
                            msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div className={cn(
                            "flex max-w-[80%] md:max-w-[70%] items-end gap-2",
                            msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}>
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                msg.role === "ai" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                            )}>
                                {msg.role === "ai" ? <Wind className="h-4 w-4" /> : "ME"}
                            </div>

                            <div className={cn(
                                "p-4 rounded-2xl text-sm leading-relaxed shadow-sm max-w-sm",
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-card border rounded-tl-none"
                            )}>
                                {msg.type === 'task' ? (
                                    <ChatTaskCard
                                        title="Quick Challenge"
                                        description={msg.content}
                                        xp={20}
                                        onAccept={() => console.log("Task Accepted")}
                                    />
                                ) : (
                                    msg.content
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 ml-10"
                    >
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce delay-0" />
                            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce delay-150" />
                            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce delay-300" />
                        </div>
                        <span className="text-xs text-muted-foreground">Breeze is thinking...</span>
                    </motion.div>
                )}
            </div>

            <div className="pt-4 border-t">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                    }}
                    className="flex gap-2 items-center bg-card p-2 rounded-xl border shadow-sm focus-within:ring-1 focus-within:ring-primary/20 transition-all"
                >
                    <Button type="button" size="icon" variant="ghost" className="shrink-0 text-muted-foreground">
                        <Upload className="h-4 w-4" />
                    </Button>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your reflection here..."
                        className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent px-2"
                    />
                    <Button type="submit" size="icon" disabled={!input.trim()} className={cn("shrink-0 transition-opacity", !input.trim() ? "opacity-50" : "opacity-100")}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}
