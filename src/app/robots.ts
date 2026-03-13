import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal/', '/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://meezanedu.com/sitemap.xml',
    host: 'https://meezanedu.com',
  }
}
