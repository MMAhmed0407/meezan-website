import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/global/SchemaOrg";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `https://meezanedu.com/blog/${params.slug}` },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://meezanedu.com/blog/${params.slug}`,
            type: 'article',
            publishedTime: post.publishedAt,
            images: [{ url: post.image || '/og-image.jpg', width: 1200, height: 630 }],
        },
    };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    const title = post.title;

    return (
        <article className="w-full bg-white pb-24">
            <BreadcrumbSchema crumbs={[
                { name: 'Home', url: '/' },
                { name: 'Blog', url: '/blog' },
                { name: title, url: `/blog/${params.slug}` }
            ]} />

            {/* HERO IMAGE */}
            <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
                {/* Placeholder generic image, would be dynamic based on slug */}
                <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                    alt={`Meezan Blog: ${title}`}
                    fill
                    priority={true}
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-brand-deeper-teal/60 backdrop-blur-[2px]" />

                <div className="absolute inset-0 flex items-center justify-center pt-20">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <span className="inline-block bg-brand-accent text-brand-deeper-teal font-bold text-xs px-3 py-1.5 rounded-md uppercase tracking-widest mb-6">
                            Insights
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6">
                            {title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white text-brand-deeper-teal flex items-center justify-center font-bold">A</div>
                                <span>Author: A2S Labs</span>
                            </div>
                            <span className="flex items-center gap-2"><Calendar size={16} /> October 2025</span>
                            <span className="flex items-center gap-2"><Clock size={16} /> 6 Min Read</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ARTICLE BODY */}
            <div className="max-w-3xl mx-auto px-4 py-8 lg:py-10 prose prose-lg prose-slate prose-headings:text-brand-deeper-teal prose-a:text-brand-teal prose-img:rounded-2xl">

                <Link href="/blog" className="inline-flex items-center gap-2 text-brand-teal font-semibold hover:text-brand-dark-teal transition-colors mb-8 no-underline text-sm" aria-label="Back to all blog articles">
                    <ArrowLeft size={16} /> Back to all articles
                </Link>

                <p className="lead text-xl text-foreground/80 leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-brand-deeper-teal">The Core Framework for Success</h2>
                <p className="mb-6 leading-relaxed">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                </p>

                <p className="mb-8 leading-relaxed">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                </p>

                <blockquote className="border-l-4 border-brand-accent bg-brand-light pl-6 py-4 my-12 rounded-r-lg italic text-2xl font-medium text-brand-deeper-teal shadow-sm">
                    "The greatest glory in living lies not in never falling, but in rising every time we fall."
                </blockquote>

                <h3 className="text-2xl font-bold mt-12 mb-6 text-brand-deeper-teal">Three Actionable Takeaways</h3>
                <ul className="space-y-4 mb-8 pl-6 list-disc marker:text-brand-teal">
                    <li className="pl-2">Focus on incremental, continuous daily progress rather than massive overnight leaps.</li>
                    <li className="pl-2">Surround yourself with mentors and peers who constructively challenge your assumptions.</li>
                    <li className="pl-2">Never stop investing in your own education, be it structural academic or practical skills.</li>
                </ul>

                <p className="mb-8 leading-relaxed">
                    At Meezan Educational Institute, we weave these core principles directly into our curriculum across all courses, whether you are studying Paramedical Sciences, Professional Training, or Teacher&apos;s Training programmes.
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-border mt-16">
                    <Tag size={18} className="text-foreground/40 shrink-0 mr-2" />
                    {["Education", "Career Focus", "Continuous Learning", "Strategy"].map(tag => (
                        <span key={tag} className="bg-brand-light text-foreground/70 text-xs px-3 py-1.5 rounded-full font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* CTA STRIP */}
            <section className="bg-brand-deeper-teal border-t border-[#1a1a2e] py-6 md:py-8 px-4 flex items-center justify-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-5xl mx-auto w-full">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold mb-1">Enjoyed this article?</h3>
                        <p className="text-base text-white/70 m-0">Take the next step in your career journey. Explore our comprehensive courses.</p>
                    </div>
                    <Link
                        href="/courses"
                        className="inline-block shrink-0 bg-brand-teal text-white px-6 py-3 rounded-full font-bold hover:bg-brand-dark-teal transition-all shadow-sm hover:-translate-y-0.5"
                    >
                        Explore Courses
                    </Link>
                </div>
            </section>

        </article>
    );
}
