'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Edit, LayoutList, LayoutGrid, FileText, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import DeleteBlogButton from './DeleteBlogButton';
import ToggleStatusButton from './ToggleStatusButton';

type Blog = {
    id: string;
    title: string;
    slug: string;
    status: string;
    publishDate: string | null | Date;
};

type Props = {
    blogs: Blog[];
    onDelete: (formData: FormData) => Promise<void>;
};

export default function BlogListView({ blogs, onDelete }: Props) {
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

    /* ─────────────── Card Grid ─────────────── */
    const CardGrid = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {blogs.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 text-sm">
                    No blogs found. Create your first blog post!
                </div>
            )}
            {blogs.map((blog) => (
                <div
                    key={blog.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col gap-3"
                >
                    {/* Title + slug */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">
                                {blog.title}
                            </h3>
                            <ToggleStatusButton id={blog.id} currentStatus={blog.status} />
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 mt-1 truncate">
                            /{blog.slug}
                        </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span>
                            {blog.publishDate
                                ? format(new Date(blog.publishDate), 'MMM d, yyyy')
                                : 'No date set'}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
                            title="View Post"
                        >
                            <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                        <Link
                            href={`/admin/blogs/${blog.id}/edit`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                            title="Edit Post"
                        >
                            <Edit className="w-3.5 h-3.5" /> Edit
                        </Link>
                        <DeleteBlogButton id={blog.id} onDelete={onDelete} />
                    </div>
                </div>
            ))}
        </div>
    );

    /* ─────────────── Table ─────────────── */
    const Table = () => (
        <div className="overflow-x-auto">
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
                    {blogs.map((blog) => (
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
                                    <DeleteBlogButton id={blog.id} onDelete={onDelete} />
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
    );

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* View toggle — desktop only */}
            <div className="hidden md:flex items-center justify-end gap-1 px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                <span className="text-xs text-gray-400 mr-2 font-medium">View:</span>
                <button
                    onClick={() => setViewMode('table')}
                    title="Table view"
                    className={`p-1.5 rounded-md transition-all ${
                        viewMode === 'table'
                            ? 'bg-gray-900 text-white shadow-sm'
                            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                    <LayoutList className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setViewMode('card')}
                    title="Card view"
                    className={`p-1.5 rounded-md transition-all ${
                        viewMode === 'card'
                            ? 'bg-gray-900 text-white shadow-sm'
                            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                    <LayoutGrid className="w-4 h-4" />
                </button>
            </div>

            {/* Mobile: always cards; Desktop: respect viewMode */}
            <div className="md:hidden">
                <CardGrid />
            </div>
            <div className="hidden md:block">
                {viewMode === 'table' ? <Table /> : <CardGrid />}
            </div>
        </div>
    );
}
