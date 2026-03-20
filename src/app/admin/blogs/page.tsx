import { checkAuth, logoutAdmin } from '@/app/actions/admin-auth';
import { getBlogs, deleteBlog } from '@/app/actions/blog-actions';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import Link from 'next/link';
import { FileText, LayoutDashboard } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import BlogListView from '@/components/admin/blogs/BlogListView';
import { Plus } from 'lucide-react';

export default async function AdminBlogsPage() {
  const isAuth = await checkAuth();

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <main className="flex-1 flex items-center justify-center p-4">
          <AdminLoginForm />
        </main>
      </div>
    );
  }

  const blogs = await getBlogs();

  const handleDelete = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    if (id) {
      await deleteBlog(id);
      revalidatePath('/admin/blogs');
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
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              Sign out
            </button>
          </form>
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
