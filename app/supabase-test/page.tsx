"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseTest() {
    const [status, setStatus] = useState<string>('Checking...')

    useEffect(() => {
        async function testConnection() {
            try {
                const { data, error } = await supabase.from('test').select('*').limit(1)
                if (error && error.code !== 'PGRST116') { // PGRST116 means table not found, which is fine for connection test
                    if (error.code === '42P01') {
                        setStatus('Connected to Supabase! (Table "test" does not exist yet, which is expected)')
                    } else {
                        setStatus(`Error: ${error.message}`)
                    }
                } else {
                    setStatus('Connected to Supabase successfully!')
                }
            } catch (err) {
                setStatus(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`)
            }
        }
        testConnection()
    }, [])

    return (
        <div className="p-8 font-sans">
            <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
            <p className="p-4 bg-muted rounded-lg border">{status}</p>
            <div className="mt-8 space-y-4">
                <h2 className="text-xl font-semibold">Credentials Configured:</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}</li>
                    <li><strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing'}</li>
                </ul>
            </div>
        </div>
    )
}
