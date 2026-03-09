import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.meezanedu.com';

    const routes = ['', '/courses', '/about', '/blog'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    const blogSlugs = [
        '5-habits-of-highly-effective-leaders',
        'why-paramedical-careers-are-booming-in-2025',
        'how-ai-is-reshaping-the-world-of-data-analytics',
        'the-critical-role-of-early-childhood-education',
        'how-to-set-goals-you-will-actually-achieve',
        'from-idea-to-launch-a-startup-beginners-guide',
    ];

    const blogRoutes = blogSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
}
