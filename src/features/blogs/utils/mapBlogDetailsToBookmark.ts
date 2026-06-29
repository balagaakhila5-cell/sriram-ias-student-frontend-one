import type { BlogBookmarkInput } from '@/features/blogs/types';
import type { BlogDetails } from '@/features/blogs/types/blogDetails';

export function mapBlogDetailsToBookmark(blog: BlogDetails): BlogBookmarkInput {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title.trim() || 'Blog',
    date: blog.date.trim(),
    time: blog.time.trim() || undefined,
    image: blog.image.trim(),
    category: blog.category.trim() || undefined,
    language: blog.language.languageName.trim() || undefined,
    readTime: blog.readTime.trim() || undefined,
    tags: blog.tags,
    isMainBlog: false,
  };
}
