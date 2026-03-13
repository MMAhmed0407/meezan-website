'use server'

import prisma from '@/lib/prisma';

export async function submitContactForm(formData: FormData, source: string) {
    const fullName = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const course = formData.get('course') as string;
    const message = formData.get('message') as string;

    try {
        const submission = await prisma.contactSubmission.create({
            data: {
                fullName,
                email,
                phone,
                course,
                message,
                source,
            },
        });
        return { success: true, submission };
    } catch (error) {
        console.error('Prisma submission error:', error);
        return { success: false, error: 'Failed to submit form' };
    }
}
