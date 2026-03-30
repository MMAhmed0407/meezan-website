'use client';

import { useEffect, useState } from 'react';
import { checkAuth, logoutAdmin } from '@/app/actions/admin-auth';
import { getBlogs, deleteBlog } from '@/app/actions/blog-actions';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import Link from 'next/link';
import { FileText, LayoutDashboard, Loader2, Plus } from 'lucide-react';
import BlogListView from '@/components/admin/blogs/BlogListView';

type Blog = {
    id: string;
    title: string;
    slug: string;
    status: string;
    publishDate: string | null;
};

export default function AdminBlogsPage() {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        async function init() {
            const authed = await checkAuth();
            setIsAuth(authed);
            if (authed) {
                const data = await getBlogs();
                setBlogs(data as Blog[]);
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
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <main className="flex-1 flex items-center justify-center p-4">
                    <AdminLoginForm onSuccess={() => setIsAuth(true)} />
                </main>
            </div>
        );
    }

    const handleDelete = async (id: string) => {
        const result = await deleteBlog(id);
        if (result.success) {
            setBlogs(prev => prev.filter(b => b.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-12 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-sm font-medium text-gray-800 hover:text-black flex items-center gap-1">
                            <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                        </Link>
                        <span className="text-sm font-medium text-gray-500 border-l border-gray-200 pl-4 flex items-center gap-1">
                            <FileText className="w-4 h-4" /> Blog Management
                        </span>
                    </div>
                    <button
                        onClick={async () => { await logoutAdmin(); setIsAuth(false); }}
                        className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
                    >
                        Sign out
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-none">Blogs</h1>
                        <p className="mt-1 text-xs text-gray-600">Total: {blogs.length} posts</p>
                    </div>
                    <Link
                        href="/admin/blogs/create"
                        className="flex items-center gap-1.5 bg-black text-white py-1.5 px-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Create Blog
                    </Link>
                </div>

                <BlogListView blogs={blogs} onDelete={handleDelete} />
            </main>
        </div>
    );
}
