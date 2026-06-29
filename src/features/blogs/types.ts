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
  isMainBlog?: boolean;
  /** Listing card that was bookmarked (detail uses blog-{slug}). */
  sourceCardId?: string;
  bookmarkedAt: string;
};

export type BlogBookmarkInput = Omit<BlogBookmark, "bookmarkedAt">;
