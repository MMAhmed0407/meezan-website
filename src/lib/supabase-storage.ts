import { createClient } from '@/utils/supabase/client';

/**
 * Uploads an image to Supabase Storage 'blog-images' bucket
 * Returns the public URL of the uploaded image
 */
export async function uploadBlogImage(file: File): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return { error: uploadError.message };
    }

    const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);

    return { url: data.publicUrl };
  } catch (error: any) {
    console.error('Storage Exception:', error);
    return { error: error.message || 'Unknown error occurred during upload' };
  }
}

/**
 * Deletes an image from the 'blog-images' bucket
 */
export async function deleteBlogImage(url: string): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const pathParts = url.split('/blog-images/');
    if (pathParts.length < 2) return { success: true };
    
    const filePath = pathParts[1];
    
    const { error } = await supabase.storage.from('blog-images').remove([filePath]);
    if (error) {
      return { error: error.message };
    }
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to delete image' };
  }
}
