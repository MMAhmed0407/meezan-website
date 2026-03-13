import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Clock, Calendar } from "lucide-react";
import { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { BreadcrumbSchema } from "@/components/global/SchemaOrg";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Articles on healthcare, education, psychology, coaching, and career development from Meezan Educational Institute Hyderabad.',
    alternates: { canonical: 'https://meezanedu.com/blog' },
    openGraph: { url: 'https://meezanedu.com/blog' },
}

// Removing local blogPosts array and using imported one instead


export default function BlogPage() {
    const featuredPost = blogPosts[0];
    const gridPosts = blogPosts.slice(1);

    return (
        <div className="w-full bg-brand-light pb-24">
            <BreadcrumbSchema crumbs={[
                { name: 'Home', url: '/' },
                { name: 'Blog', url: '/blog' }
            ]} />
            {/* HERO */}
            <section className="bg-brand-light pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-deeper-teal mb-6">Healthcare & Education Blog — Meezan Institute</h1>
                    <p className="text-base md:text-lg text-foreground/70 max-w-2xl mb-8">
                        Stay informed with the latest thought leadership, course news, and career advice from Meezan Educational Institute.
                    </p>

                    <div className="relative w-full max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles, topics or categories..."
                            className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 transition-all font-sans text-sm md:text-base"
                        />
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* FEATURED POST */}
                <Link href={`/blog/${featuredPost.slug}`} className="block group mb-8 md:mb-10">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border group-hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row">
                        <div className="w-full lg:w-3/5 h-[250px] sm:h-[350px] lg:h-[450px] relative overflow-hidden">
                            <Image
                                src={featuredPost.image}
                                alt={`Featured post: ${featuredPost.title}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority={true}
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                        </div>
                        <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                            <span className="bg-brand-accent/20 text-brand-deeper-teal font-bold tracking-wider text-[10px] md:text-xs px-3 py-1.5 rounded-md uppercase w-fit mb-4 md:mb-6">
                                Featured • {featuredPost.category}
                            </span>
                            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-brand-deeper-teal mb-4 md:mb-6 group-hover:text-brand-teal transition-colors leading-tight">
                                {featuredPost.title}
                            </h2>
                            <p className="text-foreground/70 text-base md:text-lg mb-4 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex items-center gap-6 mt-auto">
                                <span className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60"><Calendar size={16} /> {featuredPost.date}</span>
                                <span className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60"><Clock size={16} /> {featuredPost.readTime}</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col h-full">
                            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border group-hover:shadow-lg transition-all duration-300 flex flex-col flex-1">
                                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                                    <span className="absolute top-4 left-4 z-10 bg-brand-accent text-brand-deeper-teal font-bold tracking-wide text-[10px] px-3 py-1 rounded-md shadow-sm uppercase">
                                        {post.category}
                                    </span>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        loading="lazy"
                                        priority={false}
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-brand-deeper-teal mb-3 leading-snug group-hover:text-brand-teal transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-medium text-foreground/50">{post.date}</span>
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
