'use server';

import prisma from '@/lib/prisma';
import { checkAuth } from './admin-auth';
import { revalidatePath } from 'next/cache';

export async function getSubmissions() {
    const isAuth = await checkAuth();
    if (!isAuth) {
        throw new Error('Unauthorized');
    }

    try {
        const submissions = await prisma.contactSubmission.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return submissions;
    } catch (error) {
        console.error('Failed to fetch submissions:', error);
        return [];
    }
}

export async function updateSubmissionStatus(id: string, newStatus: string) {
    const isAuth = await checkAuth();
    if (!isAuth) {
        return { success: false, error: 'Unauthorized' };
    }

    try {
        await prisma.contactSubmission.update({
            where: { id },
            data: { status: newStatus },
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to update status:', error);
        return { success: false, error: 'Database update failed' };
    }
}

export async function deleteSubmission(id: string) {
    const isAuth = await checkAuth();
    if (!isAuth) {
        return { success: false, error: 'Unauthorized' };
    }

    try {
        await prisma.contactSubmission.delete({
            where: { id },
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete submission:', error);
        return { success: false, error: 'Database deletion failed' };
    }
}
