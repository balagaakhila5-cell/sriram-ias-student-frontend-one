import type { BlogBookmarkInput } from '../types';

const BLOG_META = {
  slug: 'discipline-beats-motivation',
  title: 'How to Stay Consistent Efficiently ?',
  date: 'March 23 , 2026',
  time: '12:30 PM',
} as const;

function makeBlog(id: string, image: string): BlogBookmarkInput {
  return {
    id,
    ...BLOG_META,
    image,
  };
}

export const FEATURED_BLOG = makeBlog(
  'blog-featured-main-cup',
  '/assets/blogs/main-cup.png',
);

export const PREVIEW_BLOGS: BlogBookmarkInput[] = [
  makeBlog('blog-grid-1', '/assets/blogs/book1.png'),
  makeBlog('blog-grid-2', '/assets/blogs/book2.png'),
  makeBlog('blog-grid-3', '/assets/blogs/cup-image.png'),
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
  ...EXTENDED_BLOG_IMAGES.map((image, index) =>
    makeBlog(`blog-all-${index}`, image),
  ),
];
