import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

/**
 * Auth callback — handles OAuth code exchange.
 * SECURITY: The 'next' param is validated to prevent open redirect attacks.
 * An attacker could craft a URL like /auth/callback?next=https://evil.com
 * and redirect users post-login to a phishing page.
 */

// Whitelist of allowed redirect paths post-authentication
const ALLOWED_REDIRECTS = ['/dashboard', '/onboarding', '/settings', '/companion', '/community', '/growth']

function isValidRedirect(path: string): boolean {
    if (!path || typeof path !== 'string') return false
    // Must start with / (relative path), no protocol injection
    if (!path.startsWith('/')) return false
    if (path.startsWith('//')) return false
    if (path.includes('://')) return false
    if (path.includes('\\')) return false
    // Must be a known route
    return ALLOWED_REDIRECTS.some(allowed => path.startsWith(allowed))
}

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next')

    // Validate redirect target — default to /dashboard if invalid
    const redirectTo = (next && isValidRedirect(next)) ? next : '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return NextResponse.redirect(`${origin}${redirectTo}`)
        }
    }

    // Auth failed — redirect to login with generic error, not to the 'next' param
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
