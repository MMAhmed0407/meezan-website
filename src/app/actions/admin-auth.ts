import { supabase } from '@/lib/supabaseClient';

// ─── Admin Auth (Supabase Auth) ───

const ADMIN_EMAIL = 'info@meezanedu.com';

export async function loginAdmin(email: string, password: string) {
    if (email !== ADMIN_EMAIL) {
        return { success: false, error: 'Invalid credentials' };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, error: error.message || 'Invalid credentials' };
    }

    return { success: true, session: data.session };
}

export async function logoutAdmin() {
    await supabase.auth.signOut();
}

export async function checkAuth(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
}

export async function changePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        return { success: false, error: error.message || 'Failed to update password.' };
    }

    return { success: true };
}
