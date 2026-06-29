import type { BlogBookmarkInput } from '@/features/blogs/types';
import type { FeaturedBlog } from '@/features/blogs/types/featuredBlog';

export function mapFeaturedBlogToCard(blog: FeaturedBlog): BlogBookmarkInput {
  return {
    id: blog.id,
    title: blog.title.trim() || 'Blog',
    slug: blog.slug.trim() || blog.id,
    date: blog.date.trim(),
    time: blog.time.trim() || undefined,
    image: blog.image.trim(),
    category: blog.category.trim() || undefined,
    readTime: blog.readTime.trim() || undefined,
    description: blog.description,
    tags: Array.isArray(blog.tags) ? blog.tags.filter(Boolean) : [],
    isMainBlog: true,
    youtubeVideoUrl: blog.youtubeVideoUrl ?? null,
  };
}
