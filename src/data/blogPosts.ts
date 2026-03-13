export interface BlogPost {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    publishedAt?: string;
    coverImage?: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "5-habits-of-highly-effective-leaders",
        category: "Coaching",
        title: "5 Habits of Highly Effective Leaders",
        excerpt: "Discover the daily routines that separate extraordinary leaders from average managers in today's fast-paced corporate world.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
        date: "Oct 12, 2025",
        readTime: "5 min read",
        publishedAt: "2025-10-12T09:00:00Z"
    },
    {
        slug: "why-paramedical-careers-are-booming-in-2025",
        category: "Healthcare",
        title: "Why Paramedical Careers Are Booming in 2025",
        excerpt: "The healthcare sector is evolving rapidly. Here is why choosing a paramedical course is the safest bet for job security.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
        date: "Oct 05, 2025",
        readTime: "4 min read",
        publishedAt: "2025-10-05T09:00:00Z"
    },
    {
        slug: "how-ai-is-reshaping-the-world-of-data-analytics",
        category: "Technology",
        title: "How AI is Reshaping the World of Data Analytics",
        excerpt: "Artificial Intelligence isn't replacing analysts; it's giving them superpowers. A dive into the new era of Business Intelligence.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
        date: "Sep 28, 2025",
        readTime: "6 min read",
        publishedAt: "2025-09-28T09:00:00Z"
    },
    {
        slug: "the-critical-role-of-early-childhood-education",
        category: "Education",
        title: "The Critical Role of Early Childhood Education",
        excerpt: "A child's brain develops mostly before age five. Explore why trained pre-primary educators are more important than ever.",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80",
        date: "Sep 15, 2025",
        readTime: "7 min read",
        publishedAt: "2025-09-15T09:00:00Z"
    },
    {
        slug: "how-to-set-goals-you-will-actually-achieve",
        category: "Personal Development",
        title: "How to Set Goals You Will Actually Achieve",
        excerpt: "Stop making vague resolutions. Learn our framework for setting concrete, actionable, and measurable life goals.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
        date: "Sep 02, 2025",
        readTime: "4 min read",
        publishedAt: "2025-09-02T09:00:00Z"
    },
    {
        slug: "from-idea-to-launch-a-startup-beginners-guide",
        category: "Business",
        title: "From Idea to Launch: A Startup Beginner's Guide",
        excerpt: "Have a brilliant idea but don't know where to start? This comprehensive guide outlines the first 90 days of building a startup.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
        date: "Aug 20, 2025",
        readTime: "8 min read",
        publishedAt: "2025-08-20T09:00:00Z"
    }
];
