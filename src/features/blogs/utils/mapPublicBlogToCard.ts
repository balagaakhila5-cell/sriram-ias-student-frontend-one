import type { BlogBookmarkInput } from '@/features/blogs/types';
import type { PublicBlog } from '@/features/blogs/types/publicBlog';

export function mapPublicBlogToCard(blog: PublicBlog): BlogBookmarkInput {
  return {
    id: blog.id,
    title: blog.title.trim() || 'Blog',
    slug: blog.slug.trim() || blog.id,
    date: blog.date.trim(),
    time: blog.time.trim() || undefined,
    image: blog.image.trim(),
    category: blog.category.trim() || undefined,
    readTime: blog.readTime.trim() || undefined,
    tags: Array.isArray(blog.tags) ? blog.tags.filter(Boolean) : [],
    isMainBlog: Boolean(blog.isMainBlog),
    youtubeVideoUrl: blog.youtubeVideoUrl ?? null,
  };
}

export function mapPublicBlogsToCards(blogs: PublicBlog[]): BlogBookmarkInput[] {
  return blogs.map(mapPublicBlogToCard);
}
