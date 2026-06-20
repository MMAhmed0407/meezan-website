"use client";

import { useEffect } from "react";
import Link from "next/link";
import posthog from "posthog-js";

interface BlogPostTrackerProps {
    slug: string;
    title: string;
    category?: string;
    author?: string;
}

export function BlogPostTracker({ slug, title, category, author }: BlogPostTrackerProps) {
    useEffect(() => {
        posthog.capture('blog_post_viewed', {
            slug,
            title,
            category: category ?? null,
            author: author ?? null,
        });
    }, [slug, title, category, author]);

    return null;
}

export function BlogExploreCTAButton() {
    return (
        <Link
            href="/courses"
            className="bg-[#29B8C1] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#0B5E65] transition-all shadow-lg hover:-translate-y-1 active:scale-95 whitespace-nowrap"
            onClick={() => posthog.capture('explore_courses_clicked_from_blog')}
        >
            Explore Courses
        </Link>
    );
}
