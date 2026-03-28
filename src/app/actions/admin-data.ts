import { supabase } from '@/lib/supabaseClient';

// ─── Admin Data (Supabase Client) ───

export async function getSubmissions() {
    try {
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Failed to fetch submissions:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Failed to fetch submissions:', error);
        return [];
    }
}

export async function updateSubmissionStatus(id: string, newStatus: string) {
    try {
        const { error } = await supabase
            .from('contact_submissions')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error('Failed to update status:', error);
            return { success: false, error: 'Database update failed' };
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to update status:', error);
        return { success: false, error: 'Database update failed' };
    }
}

export async function deleteSubmission(id: string) {
    try {
        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Failed to delete submission:', error);
            return { success: false, error: 'Database deletion failed' };
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to delete submission:', error);
        return { success: false, error: 'Database deletion failed' };
    }
}
