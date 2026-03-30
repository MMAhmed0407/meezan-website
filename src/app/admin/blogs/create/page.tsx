'use client';

import { useEffect, useState } from 'react';
import { checkAuth, logoutAdmin } from '@/app/actions/admin-auth';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import BlogForm from '@/components/admin/blogs/BlogForm';
import Link from 'next/link';
import { LayoutDashboard, FileText, ChevronRight, Loader2 } from 'lucide-react';

export default function CreateBlogPage() {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
        async function init() {
            const authed = await checkAuth();
            setIsAuth(authed);
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
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <main className="flex-1 flex items-center justify-center p-4">
                    <AdminLoginForm onSuccess={() => setIsAuth(true)} />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl h-12 flex items-center justify-between px-4 lg:px-8">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Link href="/admin" className="hover:text-black flex items-center gap-1">
                        <LayoutDashboard className="w-4 h-4" /> Admin
                    </Link>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <Link href="/admin/blogs" className="hover:text-black flex items-center gap-1">
                        <FileText className="w-4 h-4" /> Blogs
                    </Link>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <span className="text-black">Create</span>
                </div>
                <button
                    onClick={async () => { await logoutAdmin(); setIsAuth(false); }}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100"
                >
                    Sign out
                </button>
            </header>

            <main className="container mx-auto px-4 py-6">
                <BlogForm />
            </main>
        </div>
    );
}
