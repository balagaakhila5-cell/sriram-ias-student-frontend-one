export type BlogBookmark = {
  id: string;
  title: string;
  slug: string;
  date: string;
  time?: string;
  image: string;
  category?: string;
  bookmarkedAt: string;
};

export type BlogBookmarkInput = Omit<BlogBookmark, "bookmarkedAt">;
