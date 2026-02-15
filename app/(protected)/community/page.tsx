"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-browser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Send, User } from "lucide-react"

type Post = {
    id: string
    content: string
    created_at: string
    profiles: {
        email: string
    } | null
}

export default function CommunityPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [newPost, setNewPost] = useState("")
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        // Fetch initial posts
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('community_posts')
                .select(`
          id,
          content,
          created_at,
          user_id
        `)
                .order('created_at', { ascending: false })
                .limit(20)

            if (data) setPosts(data as any)
        }

        fetchPosts()

        // Subscribe to real-time updates
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'community_posts',
                },
                (payload) => {
                    setPosts((current) => [payload.new as Post, ...current])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newPost.trim()) return

        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("Not logged in")

            const { error } = await supabase.from('community_posts').insert({
                content: newPost,
                user_id: user.id
            })

            if (error) throw error
            setNewPost("")
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold font-heading">Community</h1>
                <p className="text-muted-foreground">Share your wins and support others quietly.</p>
            </div>

            <Card className="border-primary/10 shadow-sm overflow-hidden">
                <CardContent className="p-4">
                    <form onSubmit={handlePost} className="flex gap-2">
                        <Input
                            placeholder="Share something..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            className="rounded-xl bg-muted/50 border-transparent focus-visible:ring-primary/20"
                        />
                        <Button type="submit" size="icon" disabled={loading} className="rounded-xl shrink-0">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <AnimatePresence initial={false}>
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card border rounded-2xl p-4 shadow-sm"
                        >
                            <div className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground shrink-0">
                                    <User className="h-4 w-4" />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-medium text-muted-foreground">Anonymous Member</span>
                                        <span className="text-[10px] text-muted-foreground">
                                            {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-foreground leading-relaxed">{post.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
