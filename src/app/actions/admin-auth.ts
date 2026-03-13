'use server';

import { cookies } from 'next/headers';

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '123';
const COOKIE_NAME = 'admin_session';

export async function loginAdmin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // In a real app, use a secure session token. 
        // For this hardcoded scenario, a simple verified cookie suffices.
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

export async function logoutAdmin() {
    (await cookies()).delete(COOKIE_NAME);
}

export async function checkAuth() {
    const session = (await cookies()).get(COOKIE_NAME);
    return session?.value === 'authenticated';
}
