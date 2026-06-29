export type BlogBookmark = {
  id: string;
  title: string;
  slug: string;
  date: string;
  time?: string;
  image: string;
  category?: string;
  language?: string;
  readTime?: string;
  description?: string;
  tags?: string[];
  isMainBlog?: boolean;
  youtubeVideoUrl?: string | null;
  /** Listing card that was bookmarked (detail uses blog-{slug}). */
  sourceCardId?: string;
  bookmarkedAt: string;
};

export type BlogBookmarkInput = Omit<BlogBookmark, "bookmarkedAt">;

export type { BlogLanguage, SelectedBlogLanguage } from "./types/blogLanguage";
export type { BlogCategory, SelectedBlogCategory } from "./types/blogCategory";
export type {
  PublicBlog,
  PublicBlogListParams,
  PublicBlogListPagination,
  PublicBlogListResult,
  BlogListApiResponse,
} from "./types/publicBlog";
export type {
  FeaturedBlog,
  FeaturedBlogParams,
  FeaturedBlogApiResponse,
} from "./types/featuredBlog";
export type {
  BlogDetails,
  BlogDetailsParams,
  BlogDetailsApiResponse,
  BlogTableOfContent,
} from "./types/blogDetails";
export type {
  BlogHomepageBundle,
  BlogHomepageParams,
  BlogHomepageApiResponse,
  HomepageBundleBlog,
} from "./types/blogHomepage";
