/**
 * security.ts — Zero Trust input sanitization & validation utilities.
 * Every user-controlled string passes through here before touching the DOM or database.
 */

// Strip HTML tags to prevent stored XSS via profile fields
export function sanitizeText(input: string): string {
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
}

// Validate a URL is from an allowed image origin — blocks javascript: and data: URI injection
const ALLOWED_IMAGE_HOSTS = [
    "api.dicebear.com",
    "avatars.githubusercontent.com",
    "lh3.googleusercontent.com",
];

export function isAllowedImageUrl(url: string): boolean {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:") return false;

        // Check if the hostname matches or is a subdomain of supabase.co
        if (parsed.hostname.endsWith(".supabase.co")) return true;

        return ALLOWED_IMAGE_HOSTS.includes(parsed.hostname);
    } catch {
        return false;
    }
}

// Validate display name — alphanumeric, spaces, basic punctuation only
export function isValidDisplayName(name: string): boolean {
    if (!name || name.length > 50) return false;
    // Allow letters, numbers, spaces, hyphens, underscores, periods, apostrophes
    return /^[\p{L}\p{N}\s\-_.'']+$/u.test(name);
}

// Validate email format (basic client-side check, Supabase handles real validation)
export function isValidEmail(email: string): boolean {
    if (!email || email.length > 254) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password strength check — minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 digit
export function isStrongPassword(password: string): boolean {
    if (password.length < 8 || password.length > 128) return false;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    return hasUpper && hasLower && hasDigit;
}

// Rate limiter state for client-side brute force protection
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
    key: string,
    maxAttempts: number = 5,
    windowMs: number = 60000
): { allowed: boolean; remainingAttempts: number; retryAfterMs: number } {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
        return { allowed: true, remainingAttempts: maxAttempts - 1, retryAfterMs: 0 };
    }

    if (entry.count >= maxAttempts) {
        return {
            allowed: false,
            remainingAttempts: 0,
            retryAfterMs: entry.resetTime - now,
        };
    }

    entry.count++;
    return {
        allowed: true,
        remainingAttempts: maxAttempts - entry.count,
        retryAfterMs: 0,
    };
}

// Generic error message to prevent information leakage
export function obfuscateAuthError(error: string): string {
    const lowerError = error.toLowerCase();

    if (lowerError.includes("invalid login") || lowerError.includes("invalid password")) {
        return "Invalid email or password. Please try again.";
    }
    if (lowerError.includes("email not confirmed")) {
        return "Please check your email for a confirmation link.";
    }
    if (lowerError.includes("rate limit") || lowerError.includes("too many")) {
        return "Too many attempts. Please wait a moment before trying again.";
    }
    if (lowerError.includes("user already registered")) {
        return "An account with this email may already exist. Try logging in instead.";
    }

    // Default: never expose raw Supabase/Postgres errors to the client
    return "Something went wrong. Please try again later.";
}

// Validate redirect paths — prevents open redirect attacks
export function isValidRedirectPath(path: string): boolean {
    // Must start with / and not contain protocol markers or double slashes
    if (!path.startsWith("/")) return false;
    if (path.startsWith("//")) return false;
    if (path.includes("://")) return false;
    if (path.includes("\\")) return false;

    // Block known dangerous paths
    const blocked = ["/auth/callback", "/api/"];
    return !blocked.some((b) => path.startsWith(b));
}
