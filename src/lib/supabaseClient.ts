import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            throw new Error(
                'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
            );
        }

        _supabase = createClient(supabaseUrl, supabaseKey);
    }

    return _supabase;
}

// Proxy that lazily initializes the Supabase client on first access.
// This prevents build-time errors for pages that don't use Supabase.
export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        const client = getSupabase();
        const value = (client as any)[prop];
        if (typeof value === 'function') {
            return value.bind(client);
        }
        return value;
    },
});
