import { supabase } from '@/lib/supabaseClient';

// ─── Blog CRUD (Client-side Supabase) ───

export async function createBlog(data: any) {
  try {
    const { data: blog, error } = await supabase
      .from('blogs')
      .insert({
        title: data.title,
        slug: data.slug,
        short_description: data.shortDescription || null,
        content: data.content,
        meta_title: data.metaTitle || null,
        meta_description: data.metaDescription || null,
        keywords: data.keywords || [],
        canonical_url: data.canonicalUrl || null,
        og_title: data.ogTitle || null,
        og_description: data.ogDescription || null,
        og_image: data.ogImage || null,
        featured_image: data.featuredImage || null,
        category: data.category || null,
        tags: data.tags || [],
        status: data.status || 'draft',
        publish_date: data.publishDate ? new Date(data.publishDate).toISOString() : null,
        author: data.author || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating blog:', error);
      if (error.code === '23505') {
        return { success: false, error: 'A blog with this slug already exists.' };
      }
      return { success: false, error: 'Failed to create blog post.' };
    }

    return { success: true, data: blog };
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return { success: false, error: 'Failed to create blog post.' };
  }
}

export async function updateBlog(id: string, data: any) {
  try {
    const { data: blog, error } = await supabase
      .from('blogs')
      .update({
        title: data.title,
        slug: data.slug,
        short_description: data.shortDescription || null,
        content: data.content,
        meta_title: data.metaTitle || null,
        meta_description: data.metaDescription || null,
        keywords: data.keywords || [],
        canonical_url: data.canonicalUrl || null,
        og_title: data.ogTitle || null,
        og_description: data.ogDescription || null,
        og_image: data.ogImage || null,
        featured_image: data.featuredImage || null,
        category: data.category || null,
        tags: data.tags || [],
        status: data.status || 'draft',
        publish_date: data.publishDate ? new Date(data.publishDate).toISOString() : null,
        author: data.author || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog:', error);
      if (error.code === '23505') {
        return { success: false, error: 'A blog with this slug already exists.' };
      }
      return { success: false, error: 'Failed to update blog post.' };
    }

    return { success: true, data: blog };
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return { success: false, error: 'Failed to update blog post.' };
  }
}

export async function deleteBlog(id: string) {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog:', error);
      return { success: false, error: 'Failed to delete blog' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, error: 'Failed to delete blog' };
  }
}

export async function getBlogs() {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }

    return blogs || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogById(id: string) {
  try {
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      return null;
    }

    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// ─── Public Methods ───

export async function getPublishedBlogs() {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Error fetching published blogs:', error);
      return [];
    }

    return blogs || [];
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    return [];
  }
}

export async function toggleBlogStatus(id: string, newStatus: string) {
  try {
    const { error } = await supabase
      .from('blogs')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling blog status:', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error toggling blog status:', error);
    return { error: error.message };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }

    return blog;
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
}
