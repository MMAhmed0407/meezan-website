'use client';

import { useEffect, useState } from 'react';
import { checkAuth, logoutAdmin } from '@/app/actions/admin-auth';
import { getSubmissions } from '@/app/actions/admin-data';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import AdminSubmissionsTable from '@/components/admin/AdminSubmissionsTable';
import AdminChangePasswordForm from '@/components/admin/AdminChangePasswordForm';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

type Submission = {
    id: string;
    created_at: string;
    full_name: string;
    email: string;
    phone: string | null;
    course: string | null;
    message: string;
    source: string;
    status: string;
};

export default function AdminPage() {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
        async function init() {
            const authed = await checkAuth();
            setIsAuth(authed);
            if (authed) {
                const subs = await getSubmissions();
                setSubmissions(subs as Submission[]);
            }
        }
        init();
    }, []);

    if (isAuth === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
            </div>
        );
    }

    if (!isAuth) {
        return <AdminLoginForm onSuccess={() => setIsAuth(true)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Minimal Admin Header */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="relative w-[100px] h-8 sm:h-10">
                            <Image
                                src="/images/meezan-logo.png"
                                alt="Meezan Educational Institute"
                                fill
                                className="object-contain"
                                priority
                            />
                        </Link>
                        <span className="text-sm font-medium text-gray-500 border-l border-gray-200 pl-4">
                            Admin Dashboard
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AdminChangePasswordForm />
                        <button
                            onClick={async () => { await logoutAdmin(); setIsAuth(false); }}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex flex-col gap-6">
                {/* Blog Management Card */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-none">Blog Management</h2>
                        <p className="mt-1 text-sm text-gray-600">Create, edit, publish, and manage all your website's journal posts.</p>
                    </div>
                    <Link href="/admin/blogs" className="mt-3 sm:mt-0 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                        Manage Blogs
                    </Link>
                </div>


                <div className="mb-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Contact Submissions</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage all leads from the contact forms. Total: {submissions.length}
                    </p>
                </div>

                <AdminSubmissionsTable initialSubmissions={submissions} />
            </main>
        </div>
    );
}
