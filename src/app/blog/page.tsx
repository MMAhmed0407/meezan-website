import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata = {
    title: "Blog | Meezan Educational Institute",
    description: "Insights, Tips & Updates from Meezan Educational Institute",
};

const blogPosts = [
    {
        slug: "5-habits-of-highly-effective-leaders",
        category: "Coaching",
        title: "5 Habits of Highly Effective Leaders",
        excerpt: "Discover the daily routines that separate extraordinary leaders from average managers in today's fast-paced corporate world.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
        date: "Oct 12, 2025",
        readTime: "5 min read"
    },
    {
        slug: "why-paramedical-careers-are-booming-in-2025",
        category: "Healthcare",
        title: "Why Paramedical Careers Are Booming in 2025",
        excerpt: "The healthcare sector is evolving rapidly. Here is why choosing a paramedical course is the safest bet for job security.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
        date: "Oct 05, 2025",
        readTime: "4 min read"
    },
    {
        slug: "how-ai-is-reshaping-the-world-of-data-analytics",
        category: "Technology",
        title: "How AI is Reshaping the World of Data Analytics",
        excerpt: "Artificial Intelligence isn't replacing analysts; it's giving them superpowers. A dive into the new era of Business Intelligence.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
        date: "Sep 28, 2025",
        readTime: "6 min read"
    },
    {
        slug: "the-critical-role-of-early-childhood-education",
        category: "Education",
        title: "The Critical Role of Early Childhood Education",
        excerpt: "A child's brain develops mostly before age five. Explore why trained pre-primary educators are more important than ever.",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80",
        date: "Sep 15, 2025",
        readTime: "7 min read"
    },
    {
        slug: "how-to-set-goals-you-will-actually-achieve",
        category: "Personal Development",
        title: "How to Set Goals You Will Actually Achieve",
        excerpt: "Stop making vague resolutions. Learn our framework for setting concrete, actionable, and measurable life goals.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
        date: "Sep 02, 2025",
        readTime: "4 min read"
    },
    {
        slug: "from-idea-to-launch-a-startup-beginners-guide",
        category: "Business",
        title: "From Idea to Launch: A Startup Beginner's Guide",
        excerpt: "Have a brilliant idea but don't know where to start? This comprehensive guide outlines the first 90 days of building a startup.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
        date: "Aug 20, 2025",
        readTime: "8 min read"
    }
];

export default function BlogPage() {
    const featuredPost = blogPosts[0];
    const gridPosts = blogPosts.slice(1);

    return (
        <div className="w-full bg-brand-light pb-24">
            {/* HERO */}
            <section className="bg-brand-light pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-brand-deeper-teal mb-6">Insights, Tips & Updates</h1>
                    <p className="text-base md:text-lg text-foreground/70 max-w-2xl mb-10">
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
                <Link href={`/blog/${featuredPost.slug}`} className="block group mb-12 md:mb-16">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border group-hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row">
                        <div className="w-full lg:w-3/5 h-[250px] sm:h-[350px] lg:h-[450px] relative overflow-hidden">
                            <Image
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>
                        <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                            <span className="bg-brand-accent/20 text-brand-deeper-teal font-bold tracking-wider text-[10px] md:text-xs px-3 py-1.5 rounded-md uppercase w-fit mb-4 md:mb-6">
                                Featured • {featuredPost.category}
                            </span>
                            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-brand-deeper-teal mb-4 md:mb-6 group-hover:text-brand-teal transition-colors leading-tight">
                                {featuredPost.title}
                            </h2>
                            <p className="text-foreground/70 text-base md:text-lg mb-6 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col h-full">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border group-hover:shadow-lg transition-all duration-300 flex flex-col flex-1">
                                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                                    <span className="absolute top-4 left-4 z-10 bg-brand-accent text-brand-deeper-teal font-bold tracking-wide text-[10px] px-3 py-1 rounded-md shadow-sm uppercase">
                                        {post.category}
                                    </span>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        loading="lazy"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
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
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
