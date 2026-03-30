'use client';

export const runtime = 'edge';

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Clock, Calendar } from "lucide-react";
import { getPublishedBlogs } from "@/app/actions/blog-actions";
import { format } from "date-fns";

type Blog = {
    id: string;
    title: string;
    slug: string;
    short_description: string | null;
    featured_image: string | null;
    category: string | null;
    publish_date: string | null;
    created_at: string;
};

export default function BlogPage() {
    const [publishedBlogs, setPublishedBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getPublishedBlogs();
            setPublishedBlogs(data as Blog[]);
            setIsLoading(false);
        }
        load();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full bg-brand-light pb-24 min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full" />
            </div>
        );
    }

    if (publishedBlogs.length === 0) {
        return (
            <div className="w-full bg-brand-light pb-24 text-center">
                <section className="bg-brand-light pt-8 pb-6 px-4">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-deeper-teal mb-3">Blog</h1>
                    <p className="mt-12 text-foreground/60 text-lg">No published articles yet. Please check back later!</p>
                </section>
            </div>
        );
    }

    const featuredPost = publishedBlogs[0];
    const gridPosts = publishedBlogs.slice(1);

    return (
        <div className="w-full bg-brand-light pb-24">
            {/* HERO */}
            <section className="bg-brand-light pt-8 pb-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-deeper-teal mb-3">Healthcare &amp; Education Blog — Meezan Institute</h1>
                    <p className="text-sm md:text-base text-foreground/70 max-w-2xl mb-6">
                        Stay informed with the latest thought leadership, course news, and career advice from Meezan Educational Institute.
                    </p>

                    <div className="relative w-full max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles, topics or categories..."
                            className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 transition-all font-sans text-sm"
                        />
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* FEATURED POST */}
                <Link href={`/blog/${featuredPost.slug}`} className="block group mb-8 md:mb-10">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border group-hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row">
                        <div className="w-full lg:w-3/5 h-[250px] sm:h-[350px] lg:h-[450px] relative overflow-hidden bg-gray-100">
                            {featuredPost.featured_image && (
                                <Image
                                    src={featuredPost.featured_image}
                                    alt={`Featured post: ${featuredPost.title}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority={true}
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                            )}
                        </div>
                        <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                            <span className="bg-brand-accent/20 text-brand-deeper-teal font-bold tracking-wider text-[10px] md:text-xs px-3 py-1.5 rounded-md uppercase w-fit mb-4 md:mb-6">
                                Featured • {featuredPost.category || 'Article'}
                            </span>
                            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-brand-deeper-teal mb-4 md:mb-6 group-hover:text-brand-teal transition-colors leading-tight">
                                {featuredPost.title}
                            </h2>
                            <p className="text-foreground/70 text-base md:text-lg mb-4 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                                {featuredPost.short_description || 'Read full article to learn more.'}
                            </p>

                            <div className="flex items-center gap-6 mt-auto">
                                <span className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60"><Calendar size={16} /> {featuredPost.publish_date ? format(new Date(featuredPost.publish_date), 'MMMM d, yyyy') : format(new Date(featuredPost.created_at), 'MMMM d, yyyy')}</span>
                                <span className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60"><Clock size={16} /> 5 Min Read</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPosts.map((post: any) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col h-full">
                            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border group-hover:shadow-lg transition-all duration-300 flex flex-col flex-1">
                                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                                    <span className="absolute top-4 left-4 z-10 bg-brand-accent text-brand-deeper-teal font-bold tracking-wide text-[10px] px-3 py-1 rounded-md shadow-sm uppercase">
                                        {post.category || 'Article'}
                                    </span>
                                    {post.featured_image && (
                                        <Image
                                            src={post.featured_image}
                                            alt={post.title}
                                            fill
                                            loading="lazy"
                                            priority={false}
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    )}
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-brand-deeper-teal mb-3 leading-snug group-hover:text-brand-teal transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.short_description || 'Read more...'}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-medium text-foreground/50">{post.publish_date ? format(new Date(post.publish_date), 'MMM d, yyyy') : format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                                        </div>
                                        <span className="text-brand-teal font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
