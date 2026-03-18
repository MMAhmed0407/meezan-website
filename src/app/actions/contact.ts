'use server'

import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

// --- Rate Limiting (in-memory) ---
const submissionMap = new Map<string, {
    count: number,
    firstSubmission: number,
    lastSubmission: number
}>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;   // 1 hour
const MAX_SUBMISSIONS_PER_HOUR = 3;
const MIN_GAP_BETWEEN_MS = 60 * 1000;           // 1 minute

// --- Profanity Filter (built-in) ---
const BLOCKED_WORDS = [
    'spam', 'scam', 'fake', 'test123',
    'asdf', 'qwerty', 'aaaa', 'xxxx',
    'fuck', 'shit', 'ass', 'damn', 'bitch',
    'bastard', 'dick', 'crap', 'cunt', 'piss',
    'slut', 'whore', 'nigger', 'faggot',
];

function isProfane(text: string): boolean {
    const lower = text.toLowerCase();
    return BLOCKED_WORDS.some(word =>
        new RegExp(`\\b${word}\\b`, 'i').test(lower)
    );
}

// --- Input Sanitisation ---
// SQL injection protection: Prisma uses parameterised queries —
// no raw SQL interpolation. No additional sanitisation needed for DB safety.
// This sanitise function only strips HTML/script injection attempts.
function sanitise(input: string): string {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim();
}

export async function submitContactForm(formData: FormData, source: string) {
    const fullName = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const course = formData.get('course') as string;
    const message = formData.get('message') as string;

    // --- Server-side Validation ---
    if (!fullName || fullName.length < 2 || fullName.length > 100) {
        return { success: false, error: 'Name must be between 2 and 100 characters.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return { success: false, error: 'Invalid email format.' };
    }

    if (!phone || phone.length < 10) {
        return { success: false, error: 'Please enter a valid phone number.' };
    }

    if (!course) {
        return { success: false, error: 'Please select a course.' };
    }

    if (!message || message.length < 10 || message.length > 500) {
        return { success: false, error: 'Message must be between 10 and 500 characters.' };
    }

    // --- Rate Limiting ---
    const headersList = await headers();
    const ip =
        headersList.get('x-forwarded-for')?.split(',')[0]
        || headersList.get('x-real-ip')
        || 'unknown';

    const now = Date.now();
    const record = submissionMap.get(ip);

    if (record) {
        // Check minimum gap between submissions
        if (now - record.lastSubmission < MIN_GAP_BETWEEN_MS) {
            return {
                success: false,
                error: 'Please wait a moment before submitting again.'
            };
        }

        // Check hourly limit
        if (now - record.firstSubmission < RATE_LIMIT_WINDOW_MS) {
            if (record.count >= MAX_SUBMISSIONS_PER_HOUR) {
                return {
                    success: false,
                    error: 'Too many submissions. Please try again later.'
                };
            }
            submissionMap.set(ip, {
                count: record.count + 1,
                firstSubmission: record.firstSubmission,
                lastSubmission: now,
            });
        } else {
            // Window expired — reset
            submissionMap.set(ip, {
                count: 1,
                firstSubmission: now,
                lastSubmission: now
            });
        }
    } else {
        submissionMap.set(ip, {
            count: 1,
            firstSubmission: now,
            lastSubmission: now
        });
    }

    // Clean up old entries every 100 requests
    if (submissionMap.size > 100) {
        for (const [key, value] of submissionMap) {
            if (now - value.firstSubmission > RATE_LIMIT_WINDOW_MS) {
                submissionMap.delete(key);
            }
        }
    }

    // --- Profanity Filter ---
    if (isProfane(fullName)) {
        return {
            success: false,
            error: 'Please use appropriate language in the name field.'
        };
    }

    if (isProfane(message)) {
        return {
            success: false,
            error: 'Please keep your message respectful and appropriate.'
        };
    }

    // --- Database Insert (with sanitised inputs) ---
    try {
        const submission = await prisma.contactSubmission.create({
            data: {
                fullName: sanitise(fullName),
                email: sanitise(email),
                phone: sanitise(phone),
                course: sanitise(course),
                message: sanitise(message),
                source,
            },
        });
        return { success: true, submission };
    } catch (error) {
        console.error('Prisma submission error:', error);
        return { success: false, error: 'Failed to submit form' };
    }
}
