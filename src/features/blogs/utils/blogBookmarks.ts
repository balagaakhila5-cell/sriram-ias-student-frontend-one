import type { BlogBookmark, BlogBookmarkInput } from "../types";

const STORAGE_PREFIX = "blogBookmarks";

export const BLOG_BOOKMARKS_UPDATED_EVENT = "blog-bookmarks-updated";

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}_${userId}`;
}

/** Canonical bookmark id — one bookmark per blog slug across list + detail pages. */
export function getBlogBookmarkId(slug: string): string {
  return `blog-${slug}`;
}

function normalizeBookmarkEntry(
  bookmark: BlogBookmarkInput,
): BlogBookmarkInput {
  return {
    ...bookmark,
    id: getBlogBookmarkId(bookmark.slug),
  };
}

function dedupeBySlug(entries: BlogBookmark[]): BlogBookmark[] {
  const bySlug = new Map<string, BlogBookmark>();

  entries.forEach((entry) => {
    const slug = entry.slug;
    const existing = bySlug.get(slug);
    if (!existing) {
      bySlug.set(slug, { ...entry, id: getBlogBookmarkId(slug) });
      return;
    }

    bySlug.set(slug, {
      ...existing,
      ...entry,
      id: getBlogBookmarkId(slug),
      bookmarkedAt: existing.bookmarkedAt || entry.bookmarkedAt,
    });
  });

  return Array.from(bySlug.values());
}

export function getBlogBookmarks(userId: string): BlogBookmark[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    const parsed = raw ? (JSON.parse(raw) as BlogBookmark[]) : [];
    return dedupeBySlug(parsed);
  } catch {
    return [];
  }
}

export function isBlogBookmarked(userId: string, slug: string): boolean {
  return getBlogBookmarks(userId).some((item) => item.slug === slug);
}

export function toggleBlogBookmark(
  userId: string,
  bookmark: BlogBookmarkInput,
): boolean {
  const normalized = normalizeBookmarkEntry(bookmark);
  const existing = getBlogBookmarks(userId);
  const alreadySaved = existing.some(
    (item) => item.slug === normalized.slug,
  );

  const updated = alreadySaved
    ? existing.filter((item) => item.slug !== normalized.slug)
    : [
        ...existing,
        {
          ...normalized,
          bookmarkedAt: new Date().toISOString(),
        },
      ];

  window.localStorage.setItem(storageKey(userId), JSON.stringify(updated));
  window.dispatchEvent(new Event(BLOG_BOOKMARKS_UPDATED_EVENT));

  return !alreadySaved;
}

export function removeBlogBookmark(userId: string, slugOrId: string) {
  const slug = slugOrId.startsWith("blog-")
    ? slugOrId.slice("blog-".length)
    : slugOrId;

  const updated = getBlogBookmarks(userId).filter((item) => item.slug !== slug);
  window.localStorage.setItem(storageKey(userId), JSON.stringify(updated));
  window.dispatchEvent(new Event(BLOG_BOOKMARKS_UPDATED_EVENT));
}
