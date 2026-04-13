/*
  ENVIRONMENT VARIABLE REQUIRED:
  Add the following to your .env.local file:
    N8N_API_KEY=your_secure_random_secret_here
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

  Also add both keys to your Netlify dashboard:
    Site configuration → Environment Variables

  Generate a strong API secret with: openssl rand -hex 32
*/
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

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

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey || apiKey !== process.env.N8N_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: BlogRequestBody = await request.json();

    let imagePath: string | undefined = body.featuredImage;

    if (body.featuredImageBase64) {
      const buffer = Buffer.from(body.featuredImageBase64, 'base64');
      const filename = `${body.slug}-${Date.now()}.jpg`;
      const publicBlogImagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
      await mkdir(publicBlogImagesDir, { recursive: true });
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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

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
    const message = error instanceof Error
      ? error.message
      : 'Unknown error occurred while processing the request.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}