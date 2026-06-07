import type { BlogBookmark, BlogBookmarkInput } from "../types";

const STORAGE_PREFIX = "blogBookmarks";

export const BLOG_BOOKMARKS_UPDATED_EVENT = "blog-bookmarks-updated";

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}_${userId}`;
}

export function getBlogBookmarks(userId: string): BlogBookmark[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    return raw ? (JSON.parse(raw) as BlogBookmark[]) : [];
  } catch {
    return [];
  }
}

export function isBlogBookmarked(userId: string, bookmarkId: string): boolean {
  return getBlogBookmarks(userId).some((item) => item.id === bookmarkId);
}

export function toggleBlogBookmark(
  userId: string,
  bookmark: BlogBookmarkInput,
): boolean {
  const existing = getBlogBookmarks(userId);
  const alreadySaved = existing.some((item) => item.id === bookmark.id);

  const updated = alreadySaved
    ? existing.filter((item) => item.id !== bookmark.id)
    : [
        ...existing,
        {
          ...bookmark,
          bookmarkedAt: new Date().toISOString(),
        },
      ];

  window.localStorage.setItem(storageKey(userId), JSON.stringify(updated));
  window.dispatchEvent(new Event(BLOG_BOOKMARKS_UPDATED_EVENT));

  return !alreadySaved;
}

export function removeBlogBookmark(userId: string, bookmarkId: string) {
  const updated = getBlogBookmarks(userId).filter((item) => item.id !== bookmarkId);
  window.localStorage.setItem(storageKey(userId), JSON.stringify(updated));
  window.dispatchEvent(new Event(BLOG_BOOKMARKS_UPDATED_EVENT));
}
