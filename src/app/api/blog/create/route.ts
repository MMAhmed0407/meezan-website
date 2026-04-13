/*
  ENVIRONMENT VARIABLE REQUIRED:
  Add the following to your .env.local file:
    N8N_API_KEY=your_secure_random_secret_here

  Also add the same key to your Cloudflare Pages dashboard:
    Settings → Environment Variables → N8N_API_KEY

  Generate a strong secret with: openssl rand -hex 32
*/

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { createClient } from '@/utils/supabase/server';

interface BlogRequestBody {
  title: string;
  slug: string;
  shortDescription?: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  featuredImage?: string;
  featuredImageBase64?: string;
  category?: string;
  tags?: string[];
  status: string;
  publishDate?: string;
  author?: string;
}

interface BlogPostPayload {
  title: string;
  slug: string;
  shortDescription?: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  status: string;
  publishDate?: string;
  author?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const apiKey = request.headers.get('x-api-key');
  
  if (!apiKey || apiKey !== process.env.N8N_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: BlogRequestBody = await request.json();

    let imagePath: string | undefined = body.featuredImage;

    // Handle base64 image parsing and uploading
    if (body.featuredImageBase64) {
      const buffer = Buffer.from(body.featuredImageBase64, 'base64');
      const filename = `${body.slug}-${Date.now()}.jpg`;
      const publicBlogImagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
      
      // Ensure the directory exists
      await mkdir(publicBlogImagesDir, { recursive: true });
      // Write the binary data to the file
      await writeFile(path.join(publicBlogImagesDir, filename), buffer);
      
      imagePath = `/images/blog/${filename}`;
    }

    const payload: BlogPostPayload = {
      title: body.title,
      slug: body.slug,
      shortDescription: body.shortDescription,
      content: body.content,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      keywords: body.keywords,
      canonicalUrl: body.canonicalUrl,
      ogTitle: body.ogTitle,
      ogDescription: body.ogDescription,
      ogImage: body.ogImage,
      featuredImage: imagePath,
      category: body.category,
      tags: body.tags,
      status: body.status,
      publishDate: body.publishDate,
      author: body.author,
    };

    const supabase = await createClient();
    const { error } = await supabase.from('blogs').insert(payload);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      slug: body.slug,
      featuredImage: imagePath || null,
    }, { status: 201 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred while processing the request.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
