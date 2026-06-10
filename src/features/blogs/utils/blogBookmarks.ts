import type { BlogBookmark, BlogBookmarkInput } from "../types";

const STORAGE_PREFIX = "blogBookmarks";

export const BLOG_BOOKMARKS_UPDATED_EVENT = "blog-bookmarks-updated";

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}_${userId}`;
}

/** Detail-page bookmark id for an article slug. */
export function getBlogBookmarkId(slug: string): string {
  return `blog-${slug}`;
}

function entryCardId(entry: BlogBookmark): string {
  return entry.sourceCardId ?? entry.id;
}

function normalizeStoredBookmarks(entries: BlogBookmark[]): BlogBookmark[] {
  const seen = new Set<string>();
  const normalized: BlogBookmark[] = [];

  entries.forEach((entry) => {
    const cardId = entryCardId(entry);
    if (!cardId || seen.has(cardId)) return;

    seen.add(cardId);
    normalized.push({
      ...entry,
      id: cardId,
      sourceCardId: cardId,
    });
  });

  return normalized;
}

function persistBookmarks(userId: string, entries: BlogBookmark[]) {
  window.localStorage.setItem(storageKey(userId), JSON.stringify(entries));
}

export function getBlogBookmarks(userId: string): BlogBookmark[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    const parsed = raw ? (JSON.parse(raw) as BlogBookmark[]) : [];
    const normalized = normalizeStoredBookmarks(parsed);

    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      persistBookmarks(userId, normalized);
    }

    return normalized;
  } catch {
    return [];
  }
}

/** Detail page — bookmarked if saved from detail or any listing card for this slug. */
export function isBlogBookmarked(userId: string, slug: string): boolean {
  const detailId = getBlogBookmarkId(slug);

  return getBlogBookmarks(userId).some(
    (item) => item.slug === slug || entryCardId(item) === detailId,
  );
}

/** Listing card — filled only when this exact card was bookmarked. */
export function isBlogCardBookmarked(userId: string, cardId: string): boolean {
  if (!cardId) return false;

  return getBlogBookmarks(userId).some(
    (item) => entryCardId(item) === cardId,
  );
}

export function toggleBlogBookmark(
  userId: string,
  bookmark: BlogBookmarkInput,
): boolean {
  const cardId = bookmark.id;
  const existing = getBlogBookmarks(userId);
  const index = existing.findIndex((item) => entryCardId(item) === cardId);
  const alreadySaved = index >= 0;

  const updated = alreadySaved
    ? existing.filter((item) => entryCardId(item) !== cardId)
    : [
        ...existing,
        {
          ...bookmark,
          id: cardId,
          sourceCardId: cardId,
          bookmarkedAt: new Date().toISOString(),
        },
      ];

  persistBookmarks(userId, updated);
  window.dispatchEvent(new Event(BLOG_BOOKMARKS_UPDATED_EVENT));

  return !alreadySaved;
}

/** Remove one bookmark entry by its card id. */
export function removeBlogBookmark(userId: string, cardId: string) {
  const updated = getBlogBookmarks(userId).filter(
    (item) => entryCardId(item) !== cardId,
  );
  persistBookmarks(userId, updated);
  window.dispatchEvent(new Event(BLOG_BOOKMARKS_UPDATED_EVENT));
}
