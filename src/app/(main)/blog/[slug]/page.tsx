'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getBlogBySlug } from "@/app/actions/blog-actions";
import { format } from "date-fns";

type BlogPost = {
    id: string;
    title: string;
    slug: string;
    short_description: string | null;
    content: string;
    meta_title: string | null;
    meta_description: string | null;
    keywords: string[];
    canonical_url: string | null;
    og_title: string | null;
    og_description: string | null;
    og_image: string | null;
    featured_image: string | null;
    category: string | null;
    tags: string[];
    status: string;
    publish_date: string | null;
    author: string | null;
    created_at: string;
};

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function load() {
            if (!slug) return;
            const data = await getBlogBySlug(slug);
            if (!data) {
                setNotFound(true);
            } else {
                setPost(data as BlogPost);
                // Set document title
                document.title = data.meta_title || data.title || 'Blog Post';
            }
            setIsLoading(false);
        }
        load();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full" />
            </div>
        );
    }

    if (notFound || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
                    <p className="text-gray-500 mb-6">The blog post you are looking for does not exist.</p>
                    <Link href="/blog" className="text-brand-teal hover:underline font-semibold">Back to Blog</Link>
                </div>
            </div>
        );
    }

    const title = post.title;
    const publishDate = post.publish_date ? new Date(post.publish_date) : new Date(post.created_at);

    return (
        <article className="w-full bg-white pb-24" style={{ colorScheme: 'light' }}>

            {/* HEADER SECTION */}
            <header className="bg-gray-50/50 pt-20 pb-12 lg:pt-28 lg:pb-20 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-brand-teal font-semibold hover:text-brand-dark-teal transition-all mb-8 group text-sm no-underline">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                        Back to articles
                    </Link>

                    <div className="mb-6 flex justify-center">
                        <span className="inline-block bg-[#0B5E65]/10 text-[#0B5E65] font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
                            {post.category || 'Article'}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.2] mb-6 tracking-tight">
                        {title}
                    </h1>

                    {post.short_description && (
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-8 leading-relaxed font-medium">
                            {post.short_description}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-[#0B5E65] text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm">
                                {post.author ? post.author.charAt(0).toUpperCase() : 'M'}
                            </div>
                            <span className="text-gray-900">By {post.author || 'Meezan Institute'}</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-[#29B8C1]" /> {format(publishDate, 'MMMM d, yyyy')}</span>
                    </div>
                </div>
            </header>

            {/* FEATURED IMAGE */}
            {post.featured_image && (
                <div className="max-w-3xl mx-auto px-4 -mt-8 lg:-mt-12 mb-12 lg:mb-16">
                    <div className="relative aspect-[16/9] w-full rounded-2xl lg:rounded-[24px] overflow-hidden shadow-xl ring-1 ring-black/5">
                        <Image
                            src={post.featured_image}
                            alt={`Meezan Blog: ${title}`}
                            fill
                            priority={true}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                        />
                    </div>
                </div>
            )}

            {/* ARTICLE BODY */}
            <div className="max-w-3xl mx-auto px-4">
                <div className="prose prose-lg md:prose-xl prose-slate prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#29B8C1] prose-a:font-semibold hover:prose-a:text-[#0B5E65] prose-img:rounded-2xl prose-blockquote:border-l-[#29B8C1] prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl">
                    <div 
                      className="tiptap-content leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                </div>

                {/* TAGS */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2.5 pt-12 border-t border-gray-100 mt-20">
                      <Tag size={18} className="text-gray-400 mr-2" />
                      {post.tags.map((tag: string) => (
                          <span key={tag} className="bg-gray-50 text-gray-600 text-[11px] px-3.5 py-1.5 rounded-lg border border-gray-100 font-medium hover:bg-gray-100 transition-colors cursor-default">
                              {tag}
                          </span>
                      ))}
                  </div>
                )}
            </div>

            {/* CTA SECTION */}
            <section className="max-w-5xl mx-auto px-4 mt-24">
                <div className="bg-[#0B5E65] rounded-[32px] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-xl">
                    {/* Decorative glows */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#29B8C1]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left max-w-xl">
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                                Ready to advance your career?
                            </h2>
                            <p className="text-white/70 text-base md:text-lg mb-0 leading-relaxed">
                                Join 12,500+ students who have transformed their lives through our professional training programs.
                            </p>
                        </div>
                        <Link
                            href="/courses"
                            className="bg-[#29B8C1] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#0B5E65] transition-all shadow-lg hover:-translate-y-1 active:scale-95 whitespace-nowrap"
                        >
                            Explore Courses
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
