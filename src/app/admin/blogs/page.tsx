import { checkAuth, logoutAdmin } from '@/app/actions/admin-auth';
import { getBlogs, deleteBlog } from '@/app/actions/blog-actions';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, FileText, LayoutDashboard } from 'lucide-react';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import DeleteBlogButton from '@/components/admin/blogs/DeleteBlogButton';
import ToggleStatusButton from '@/components/admin/blogs/ToggleStatusButton';

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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-200 text-[#475569]">
              <tr>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-left">Title</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-center w-32 font-mono">Status</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-center w-40 hidden md:table-cell">Publish Date</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-center w-32 font-mono">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {blogs.map((blog: any) => (
                <tr key={blog.id} className="group hover:bg-gray-50/80 transition-all duration-200">
                  <td className="py-3 px-4 align-middle text-left">
                    <div className="font-bold text-gray-900 truncate max-w-[200px] md:max-w-md group-hover:text-black transition-colors" title={blog.title}>
                      {blog.title}
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium truncate mt-0.5 font-mono select-all">/{blog.slug}</div>
                  </td>
                  <td className="py-3 px-4 align-middle text-center">
                    <div className="flex justify-center">
                      <ToggleStatusButton id={blog.id} currentStatus={blog.status} />
                    </div>
                  </td>
                  <td className="py-3 px-4 align-middle text-center hidden md:table-cell">
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md min-w-[100px] inline-block">
                      {blog.publishDate ? format(new Date(blog.publishDate), 'MMM d, yyyy') : '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4 align-middle text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                        title="View Post"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="p-1.5 text-gray-400 hover:bg-gray-100 hover:text-black rounded-lg transition-colors border border-transparent hover:border-gray-200"
                        title="Edit Post"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteBlogButton id={blog.id} onDelete={handleDelete} />
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 text-sm">
                    No blogs found. Create your first blog post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
