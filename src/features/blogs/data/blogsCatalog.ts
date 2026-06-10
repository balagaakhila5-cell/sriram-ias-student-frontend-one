import type { BlogBookmarkInput } from '../types';
import { getBlogBookmarkId } from '../utils/blogBookmarks';

const BLOG_META = {
  slug: 'discipline-beats-motivation',
  title: 'How to Stay Consistent Efficiently ?',
  date: 'March 23 , 2026',
  time: '12:30 PM',
} as const;

function makeBlog(image: string): BlogBookmarkInput {
  return {
    id: getBlogBookmarkId(BLOG_META.slug),
    ...BLOG_META,
    image,
  };
}

export const FEATURED_BLOG = makeBlog('/assets/blogs/main-cup.png');

export const PREVIEW_BLOGS: BlogBookmarkInput[] = [
  makeBlog('/assets/blogs/book1.png'),
  makeBlog('/assets/blogs/book2.png'),
  makeBlog('/assets/blogs/cup-image.png'),
];

const EXTENDED_BLOG_IMAGES = [
  '/assets/blogs/hand-image.png',
  '/assets/blogs/image-4.png',
  '/assets/blogs/book1.png',
  '/assets/blogs/book2.png',
  '/assets/blogs/cup-image.png',
  '/assets/blogs/hand-image.png',
  '/assets/blogs/image-4.png',
  '/assets/blogs/main-cup.png',
  '/assets/blogs/book1.png',
  '/assets/blogs/book2.png',
  '/assets/blogs/cup-image.png',
  '/assets/blogs/hand-image.png',
  '/assets/blogs/image-4.png',
];

export const ALL_BLOGS: BlogBookmarkInput[] = [
  FEATURED_BLOG,
  ...PREVIEW_BLOGS,
  ...EXTENDED_BLOG_IMAGES.map((image) => makeBlog(image)),
];

export type TrendingBlogArticle = {
  title: string;
  href: string;
};

export function getTrendingBlogArticles(limit = 6): TrendingBlogArticle[] {
  return ALL_BLOGS.slice(0, limit).map((blog) => ({
    title: blog.title,
    href: `/blogs/${blog.slug}`,
  }));
}

export const TRENDING_BLOG_ARTICLES = getTrendingBlogArticles(6);
