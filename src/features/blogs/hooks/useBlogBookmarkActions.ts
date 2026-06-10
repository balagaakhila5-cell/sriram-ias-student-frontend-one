"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import type { BlogBookmarkInput } from "../types";
import {
  BLOG_BOOKMARKS_UPDATED_EVENT,
  isBlogBookmarked,
  isBlogCardBookmarked,
  toggleBlogBookmark,
} from "../utils/blogBookmarks";

export type BlogBookmarkMode = "listing" | "detail";

export function useBlogBookmarkActions(
  bookmark: BlogBookmarkInput,
  mode: BlogBookmarkMode = "listing",
) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const isStudent = isAuthenticated && user?.role === "student";

  const readBookmarked = useCallback(() => {
    if (!user?.id) return false;
    if (mode === "detail") {
      return isBlogBookmarked(user.id, bookmark.slug);
    }
    return isBlogCardBookmarked(user.id, bookmark.id);
  }, [bookmark.id, bookmark.slug, mode, user?.id]);

  useEffect(() => {
    if (!user?.id) {
      setIsBookmarked(false);
      return;
    }

    setIsBookmarked(readBookmarked());

    const sync = () => {
      if (user?.id) {
        setIsBookmarked(readBookmarked());
      }
    };

    window.addEventListener(BLOG_BOOKMARKS_UPDATED_EVENT, sync);
    return () => window.removeEventListener(BLOG_BOOKMARKS_UPDATED_EVENT, sync);
  }, [readBookmarked, user?.id]);

  const requireStudentAuth = useCallback(() => {
    if (!isHydrated) return false;

    if (!isStudent || !user?.id) {
      const currentPath =
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}`
          : pathname || "/blogs";
      const redirect = encodeURIComponent(currentPath);
      router.push(`/login?redirect=${redirect}`);
      return false;
    }

    return true;
  }, [isHydrated, isStudent, pathname, router, user?.id]);

  const handleBookmark = useCallback(() => {
    if (!requireStudentAuth() || !user?.id) return;

    toggleBlogBookmark(user.id, bookmark);

    if (mode === "detail") {
      setIsBookmarked(isBlogBookmarked(user.id, bookmark.slug));
    } else {
      setIsBookmarked(isBlogCardBookmarked(user.id, bookmark.id));
    }
  }, [bookmark, mode, requireStudentAuth, user?.id]);

  const handleShare = useCallback(async () => {
    if (!requireStudentAuth()) return;

    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/blogs/${bookmark.slug}`
        : `/blogs/${bookmark.slug}`;

    const sharePayload = {
      title: bookmark.title,
      text: `Check out ${bookmark.title} on Sriram's IAS`,
      url: shareUrl,
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(sharePayload);
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareMessage("Link copied to clipboard");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage("Link copied to clipboard");
      } catch {
        setShareMessage("Unable to share right now");
      }
    }

    window.setTimeout(() => setShareMessage(null), 2500);
  }, [bookmark.slug, bookmark.title, requireStudentAuth]);

  return {
    isBookmarked,
    shareMessage,
    handleBookmark,
    handleShare,
    isStudentReady: isHydrated && isStudent,
  };
}
