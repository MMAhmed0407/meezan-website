'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { createBlog, updateBlog } from '@/app/actions/blog-actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import TipTapEditor from './TipTapEditor';
import ImageUpload from './ImageUpload';
import { Save, ExternalLink, Sparkles, Copy, X, Check } from 'lucide-react';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  shortDescription: z.string().max(160, 'Max 160 characters').optional().or(z.literal('')),
  content: z.string().min(1, 'Content is required'),
  metaTitle: z.string().max(60, 'Max 60 chars').optional().or(z.literal('')),
  metaDescription: z.string().max(160, 'Max 160 chars').optional().or(z.literal('')),
  keywords: z.string().optional().or(z.literal('')),
  canonicalUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  ogTitle: z.string().optional().or(z.literal('')),
  ogDescription: z.string().optional().or(z.literal('')),
  ogImage: z.string().optional().or(z.literal('')),
  featuredImage: z.string().optional().or(z.literal('')),
  category: z.string().optional().or(z.literal('')),
  tags: z.string().optional().or(z.literal('')),
  status: z.string().optional(),
  publishDate: z.string().optional().or(z.literal('')),
  author: z.string().optional().or(z.literal('')),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: any;
}

// Compact Input Component
const Input = ({ label, id, error, registerFn, ...props }: any) => (
  <div className="flex flex-col gap-0.5 w-full">
    <label htmlFor={id} className="text-xs font-semibold text-gray-700">
      {label}
    </label>
    <input
      id={id}
      {...registerFn}
      {...props}
      className={`h-8 px-2 text-sm border rounded bg-white focus:outline-none focus:ring-1 focus:ring-black ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && <span className="text-[10px] text-red-500 leading-none">{error.message}</span>}
  </div>
);

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideKeyword, setGuideKeyword] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [contentMode, setContentMode] = useState<'visual' | 'html'>('visual');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast.success('Prompt copied to clipboard');
  };

  const prompts = [
    {
      id: 'keyword-search',
      title: '1. Keyword Search (Website Knowledge)',
      content: `Search for trending and relevant keywords for a business providing digital growth, social media management, and branding services like Meezan. Focus on high-intent keywords for the Pakistani and Middle Eastern markets that are currently performing well in terms of SEO.`,
    },
    {
      id: 'field-gen',
      title: '2. Field Generation (Based on Keyword)',
      content: `Act as an expert SEO blog writer. Based on the keyword '${guideKeyword || '[KEYWORD]'}', generate the following fields for a blog post:
- Title (Catchy, SEO-friendly, under 60 chars)
- Slug (URL-friendly version of title)
- Short Description (Compelling summary, max 160 chars)
- Content (A detailed, high-quality blog post in HTML format. **IMPORTANT: Be smart and add proper vertical margins/spacing between paragraphs and sections (e.g., using <br/> or style='margin-bottom: 2rem'). The layout should feel open and professional.** Use proper headings (h2, h3), lists, and bold text. Focus on providing value and including the keyword naturally.)
- Meta Title (SEO title, max 60 chars)
- Meta Description (SEO description, max 160 chars)
- Keywords (5-10 comma-separated keywords)
- Category (Choose one: News, Education, Tips & Tricks, Events)
- Tags (5-10 comma-separated tags)
Output should be structured and easy to copy.`,
    },
    {
      id: 'image-gen',
      title: '3. Image Generation Prompt',
      content: `Generate a high-quality, professional, and modern prompt for an AI image generator (like Midjourney, DALL-E 3, or Leonardo.ai) to create a featured image for a blog post about '${guideKeyword || '[KEYWORD]'}'.

**Instructions for AI Image Generator:**
"Create a professional, minimalistic, and high-end digital agency style visual representing ${guideKeyword || '[KEYWORD]'}. Use a sophisticated color palette of deep charcoal black, crisp white, and subtle accents of gold or electric blue. The composition should be clean, using geometric shapes or abstract 3D elements that suggest digital growth and innovation. Studio lighting, sharp focus, 8k resolution, photorealistic but artistic, mirroring a premium tech brand."

**Note for User:**
Paste the prompt above into ChatGPT Plus, Midjourney, or DALL-E to generate your image. Then download and upload it to the "Featured Image" section here.`,
    },
  ];

  const defaultValues: Partial<BlogFormValues> = initialData
    ? {
        ...initialData,
        shortDescription: initialData.shortDescription || '',
        metaTitle: initialData.metaTitle || '',
        metaDescription: initialData.metaDescription || '',
        canonicalUrl: initialData.canonicalUrl || '',
        ogTitle: initialData.ogTitle || '',
        ogDescription: initialData.ogDescription || '',
        ogImage: initialData.ogImage || '',
        featuredImage: initialData.featuredImage || '',
        category: initialData.Category || '',
        author: initialData.author || '',
        keywords: initialData.keywords?.join(', ') || '',
        tags: initialData.tags?.join(', ') || '',
        status: initialData.published ? 'published' : 'draft',
        publishDate: initialData.publishDate ? new Date(initialData.publishDate).toISOString().split('T')[0] : '',
      }
    : {
        title: '',
        slug: '',
        shortDescription: '',
        content: '',
        metaTitle: '',
        metaDescription: '',
        keywords: '',
        canonicalUrl: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        featuredImage: '',
        category: '',
        tags: '',
        status: 'draft',
        publishDate: new Date().toISOString().split('T')[0],
        author: 'Admin',
      };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues,
  });

  const titleWatch = watch('title');

  // Auto-generate slug from title if it's a new post and slug hasn't been manually touched
  useEffect(() => {
    if (!initialData && titleWatch) {
      const generatedSlug = titleWatch
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [titleWatch, setValue, initialData]);

  const onSubmit = async (data: BlogFormValues) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Saving blog...');

    const payload = {
      ...data,
      keywords: data.keywords ? data.keywords.split(',').map((k) => k.trim()) : [],
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()) : [],
      publishDate: data.publishDate || null,
    };

    let res;
    if (initialData?.id) {
      res = await updateBlog(initialData.id, payload);
    } else {
      res = await createBlog(payload);
    }

    if (res.success) {
      toast.success(initialData ? 'Blog updated successfully' : 'Blog created successfully', {
        id: toastId,
      });
      router.push('/admin/blogs');
    } else {
      toast.error(res.error || 'Something went wrong', { id: toastId });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-6xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white p-2 rounded-md border border-gray-200 shadow-sm sticky top-16 z-40">
        <h1 className="text-lg font-bold text-gray-900 leading-none">
          {initialData ? 'Edit Blog' : 'Create Blog'}
        </h1>
        <div className="flex gap-2">
          {initialData?.slug && (
            <a
              href={`/blog/${initialData.slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Preview
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> AI Guide
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isSubmitting ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Section 1: Basic Info */}
          <section className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex flex-col gap-3">
            <h2 className="text-sm font-bold border-b pb-1">Basic Info</h2>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Title *" id="title" registerFn={register('title')} error={errors.title} />
              <Input label="Slug *" id="slug" registerFn={register('slug')} error={errors.slug} />
            </div>
            
            <div className="flex flex-col gap-0.5">
              <label htmlFor="shortDescription" className="text-xs font-semibold text-gray-700 flex justify-between">
                <span>Short Description (Max 160)</span>
                <span className="text-gray-400 font-normal">{watch('shortDescription')?.length || 0}/160</span>
              </label>
              <textarea
                id="shortDescription"
                {...register('shortDescription')}
                className={`p-2 text-sm border rounded bg-white min-h-[60px] focus:outline-none focus:ring-1 focus:ring-black ${
                  errors.shortDescription ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.shortDescription && <span className="text-[10px] text-red-500">{errors.shortDescription.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <label className="text-xs font-semibold text-gray-700">Content *</label>
                <div className="flex bg-gray-100 p-0.5 rounded-md border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setContentMode('visual')}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      contentMode === 'visual' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Visual
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentMode('html')}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      contentMode === 'html' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    HTML
                  </button>
                </div>
              </div>
              
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  contentMode === 'visual' ? (
                    <TipTapEditor value={field.value} onChange={field.onChange} />
                  ) : (
                    <textarea
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-full min-h-[300px] p-3 text-sm font-mono border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-gray-50"
                      placeholder="Paste your HTML content here..."
                    />
                  )
                )}
              />
              {errors.content && <span className="text-[10px] text-red-500">{errors.content.message}</span>}
            </div>
          </section>

          {/* Section 2: SEO Fields */}
          <section className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex flex-col gap-3">
            <h2 className="text-sm font-bold border-b pb-1">SEO & Social Meta</h2>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Meta Title (Max 60)" id="metaTitle" registerFn={register('metaTitle')} error={errors.metaTitle} />
              <Input label="Keywords (Comma separated)" id="keywords" registerFn={register('keywords')} error={errors.keywords} />
              <div className="col-span-2">
                <Input label="Canonical URL" id="canonicalUrl" registerFn={register('canonicalUrl')} error={errors.canonicalUrl} />
              </div>
              <div className="col-span-2 flex flex-col gap-0.5">
                <label className="text-xs font-semibold text-gray-700 flex justify-between">
                  <span>Meta Description (Max 160)</span>
                  <span className="text-gray-400 font-normal">{watch('metaDescription')?.length || 0}/160</span>
                </label>
                <textarea
                  {...register('metaDescription')}
                  className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black h-16"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="flex flex-col gap-4">
          {/* Section 3: Publishing */}
          <section className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex flex-col gap-3">
            <h2 className="text-sm font-bold border-b pb-1">Publishing</h2>
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-semibold text-gray-700">Status</label>
              <select
                {...register('status')}
                className="h-8 px-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <Input label="Publish Date" id="publishDate" type="date" registerFn={register('publishDate')} />
            <Input label="Author" id="author" registerFn={register('author')} />
          </section>

          {/* Section 4: Categorization */}
          <section className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex flex-col gap-3">
            <h2 className="text-sm font-bold border-b pb-1">Categorization</h2>
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-semibold text-gray-700">Category</label>
              <select
                {...register('category')}
                className="h-8 px-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select Category</option>
                <option value="news">News</option>
                <option value="education">Education</option>
                <option value="tips">Tips & Tricks</option>
                <option value="events">Events</option>
              </select>
            </div>
            <Input label="Tags (Comma separated)" id="tags" registerFn={register('tags')} placeholder="e.g. maths, studying" />
          </section>

          {/* Section 5: Featured Media */}
          <section className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex flex-col gap-3">
            <h2 className="text-sm font-bold border-b pb-1">Featured Image</h2>
            <Controller
              name="featuredImage"
              control={control}
              render={({ field }) => (
                <ImageUpload value={field.value || ''} onChange={field.onChange} label="Upload Featured Image" />
              )}
            />
          </section>
        </div>
      </div>

      {/* AI Guide Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold">AI Creation Guide</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Target Keyword</label>
                <input
                  type="text"
                  value={guideKeyword}
                  onChange={(e) => setGuideKeyword(e.target.value)}
                  placeholder="e.g. Social Media Management"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium"
                />
                <p className="text-[11px] text-gray-500">
                  Enter your main keyword to personalize the prompts below.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {prompts.map((prompt) => (
                  <div key={prompt.id} className="flex flex-col gap-2 bg-gray-50 rounded-lg border border-gray-200 p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-800">{prompt.title}</h3>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(prompt.content, prompt.id)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold transition-all ${
                          copied === prompt.id
                            ? 'bg-green-100 text-green-700'
                            : 'bg-white text-gray-600 hover:text-black hover:border-black border border-gray-300 shadow-sm'
                        }`}
                      >
                        {copied === prompt.id ? (
                          <>
                            <Check className="w-3 h-3" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy Prompt
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-white p-2.5 rounded border border-gray-200 text-[12px] font-mono text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {prompt.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 rounded-b-xl">
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="w-full py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
