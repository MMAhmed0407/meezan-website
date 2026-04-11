import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const BlogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  slug: z.string().optional(),
  shortDescription: z.string().optional(),
  category: z.enum(['news', 'education', 'tips', 'events']).optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  status: z.enum(['draft', 'published']).optional().default('draft'),
  publishDate: z.string().optional(),
  featuredImage: z.string().url().optional().or(z.literal('')),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().url().optional().or(z.literal('')),
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.API_SECRET_KEY;
  const authHeader = req.headers.get('authorization');

  if (!apiKey || !authHeader || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = BlogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Validation failed', details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Generate slug from title if not provided
  let slug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);

  try {
    const supabase = await createClient();

    // Ensure slug uniqueness by appending timestamp if taken
    const { data: existing } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const { data: blog, error } = await supabase
      .from('blogs')
      .insert({
        title: data.title,
        slug,
        content: data.content,
        shortDescription: data.shortDescription || null,
        category: data.category || null,
        tags: data.tags || [],
        author: data.author || 'Meezan Institute',
        status: data.status || 'draft',
        publishDate: data.publishDate ? new Date(data.publishDate).toISOString() : null,
        featuredImage: data.featuredImage || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        keywords: data.keywords || [],
        canonicalUrl: data.canonicalUrl || null,
        ogTitle: data.ogTitle || null,
        ogDescription: data.ogDescription || null,
        ogImage: data.ogImage || null,
      })
      .select()
      .single();

    if (error) {
      console.error('[API /api/blog] Error creating blog:', error);
      if (error.code === '23505') {
        return NextResponse.json({ success: false, error: 'Slug already exists.' }, { status: 409 });
      }
      return NextResponse.json({ success: false, error: 'Failed to create blog post.' }, { status: 500 });
    }

    revalidatePath('/admin/blogs');
    if (data.status === 'published') {
      revalidatePath('/blog');
    }

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error: any) {
    console.error('[API /api/blog] Error creating blog:', error);
    return NextResponse.json({ success: false, error: 'Failed to create blog post.' }, { status: 500 });
  }
}
