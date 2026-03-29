import { createClient } from '@/utils/supabase/client';

export async function updateSubmissionStatus(id: string, newStatus: string) {
    try {
        const supabase = createClient();
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
        const supabase = createClient();
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
