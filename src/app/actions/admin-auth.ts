'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

const ADMIN_EMAIL = 'info@meezanedu.com';
const COOKIE_NAME = 'admin_session';

/** Gets the current admin password from DB. Creates the singleton row if missing. */
async function getAdminPassword(): Promise<string> {
    const config = await prisma.adminConfig.upsert({
        where: { id: 'singleton' },
        update: {},
        create: { id: 'singleton', password: 'Meezan@123' },
    });
    return config.password;
}

export async function loginAdmin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const currentPassword = await getAdminPassword();

    if (email === ADMIN_EMAIL && password === currentPassword) {
        (await cookies()).set(COOKIE_NAME, 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        });
        return { success: true };
    }

    return { success: false, error: 'Invalid credentials' };
}

export async function changePassword(formData: FormData) {
    const oldPassword = (formData.get('oldPassword') as string)?.trim();
    const newPassword = (formData.get('newPassword') as string)?.trim();
    const confirmPassword = (formData.get('confirmPassword') as string)?.trim();

    if (!oldPassword || !newPassword || !confirmPassword) {
        return { success: false, error: 'All fields are required.' };
    }

    if (newPassword.length < 6) {
        return { success: false, error: 'New password must be at least 6 characters.' };
    }

    if (newPassword !== confirmPassword) {
        return { success: false, error: 'New passwords do not match.' };
    }

    const currentPassword = await getAdminPassword();

    if (oldPassword !== currentPassword) {
        return { success: false, error: 'Current password is incorrect.' };
    }

    await prisma.adminConfig.update({
        where: { id: 'singleton' },
        data: { password: newPassword },
    });

    return { success: true };
}

export async function logoutAdmin() {
    (await cookies()).delete(COOKIE_NAME);
    redirect('/');
}

export async function checkAuth() {
    const session = (await cookies()).get(COOKIE_NAME);
    return session?.value === 'authenticated';
}
