import { supabase } from '@/lib/supabaseClient';

// --- Rate Limiting (in-memory, client-side) ---
const submissionMap = new Map<string, {
    count: number,
    firstSubmission: number,
    lastSubmission: number
}>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;   // 1 hour
const MAX_SUBMISSIONS_PER_HOUR = 3;
const MIN_GAP_BETWEEN_MS = 60 * 1000;           // 1 minute

// --- Profanity Filter ---
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

    // --- Client-side Validation ---
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

    // --- Rate Limiting (client-side, per-session) ---
    const clientKey = 'client';
    const now = Date.now();
    const record = submissionMap.get(clientKey);

    if (record) {
        if (now - record.lastSubmission < MIN_GAP_BETWEEN_MS) {
            return {
                success: false,
                error: 'Please wait a moment before submitting again.'
            };
        }

        if (now - record.firstSubmission < RATE_LIMIT_WINDOW_MS) {
            if (record.count >= MAX_SUBMISSIONS_PER_HOUR) {
                return {
                    success: false,
                    error: 'Too many submissions. Please try again later.'
                };
            }
            submissionMap.set(clientKey, {
                count: record.count + 1,
                firstSubmission: record.firstSubmission,
                lastSubmission: now,
            });
        } else {
            submissionMap.set(clientKey, {
                count: 1,
                firstSubmission: now,
                lastSubmission: now
            });
        }
    } else {
        submissionMap.set(clientKey, {
            count: 1,
            firstSubmission: now,
            lastSubmission: now
        });
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

    // --- Database Insert via Supabase ---
    try {
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert({
                full_name: sanitise(fullName),
                email: sanitise(email),
                phone: sanitise(phone),
                course: sanitise(course),
                message: sanitise(message),
                source,
                status: 'new',
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase submission error:', error);
            return { success: false, error: 'Failed to submit form' };
        }

        return { success: true, submission: data };
    } catch (error) {
        console.error('Submission error:', error);
        return { success: false, error: 'Failed to submit form' };
    }
}
