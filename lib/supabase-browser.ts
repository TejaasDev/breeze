import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Fallback if keys are missing during build time
    if (!url || !anonKey) {
        return createBrowserClient(
            url || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
            anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
        )
    }

    return createBrowserClient(url, anonKey)
}
