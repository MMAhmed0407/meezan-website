import { createClient } from '@/utils/supabase/client';

export async function loginAdmin(email: string, password: string) {
    const supabase = createClient();
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
    const supabase = createClient();
    await supabase.auth.signOut();
}

export async function checkAuth(): Promise<boolean> {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
}

export async function changePassword(newPassword: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        return { success: false, error: error.message || 'Failed to update password.' };
    }

    return { success: true };
}
