import type { BlogBookmarkInput } from '@/features/blogs/types';
import type { BlogCategory } from '@/features/blogs/types/blogCategory';
import type {
  BlogHomepageBundle,
  HomepageBundleBlog,
} from '@/features/blogs/types/blogHomepage';
import { mapPublicBlogToCard } from '@/features/blogs/utils/mapPublicBlogToCard';

export type BlogHomepageViewModel = {
  featured: BlogBookmarkInput | null;
  previewBlogs: BlogBookmarkInput[];
  categories: BlogCategory[];
  gsPaperWise: Record<string, BlogBookmarkInput[]>;
};

function mapBundleBlogToCard(
  blog: HomepageBundleBlog,
  options: { isFeatured?: boolean } = {},
): BlogBookmarkInput {
  return {
    ...mapPublicBlogToCard(blog),
    description: blog.description?.trim() || undefined,
    isMainBlog: options.isFeatured ?? Boolean(blog.isMainBlog),
  };
}

function mapBundleBlogList(blogs: HomepageBundleBlog[]): BlogBookmarkInput[] {
  return blogs.map((blog) => mapBundleBlogToCard(blog));
}

export function mapCategoryStringsToBlogCategories(categories: string[]): BlogCategory[] {
  return categories
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({ label: name, value: name }));
}

export function mapBlogHomepageBundle(bundle: BlogHomepageBundle): BlogHomepageViewModel {
  const gsPaperWise: Record<string, BlogBookmarkInput[]> = {};

  Object.entries(bundle.gsPaperWise || {}).forEach(([category, blogs]) => {
    gsPaperWise[category] = Array.isArray(blogs) ? mapBundleBlogList(blogs) : [];
  });

  return {
    featured: bundle.featured ? mapBundleBlogToCard(bundle.featured, { isFeatured: true }) : null,
    previewBlogs: mapBundleBlogList(Array.isArray(bundle.previewBlogs) ? bundle.previewBlogs : []),
    categories: mapCategoryStringsToBlogCategories(
      Array.isArray(bundle.categories) ? bundle.categories : [],
    ),
    gsPaperWise,
  };
}

export function getGsPaperWiseBlogs(
  bundle: BlogHomepageViewModel | undefined,
  categoryValue: string | null,
): BlogBookmarkInput[] {
  if (!bundle || !categoryValue) return [];
  return bundle.gsPaperWise[categoryValue] ?? [];
}
