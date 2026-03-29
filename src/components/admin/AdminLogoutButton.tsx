'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AdminLogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.refresh(); // Triggers server-side re-render, dropping back to login
    }

    return (
        <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
        >
            Sign out
        </button>
    );
}
