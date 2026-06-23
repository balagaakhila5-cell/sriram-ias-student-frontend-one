"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "@/lib/appRouter";
import { useAuthStore } from "@/store/authStore";
import type { BlogBookmarkInput } from "../types";
import {
  BLOG_BOOKMARKS_UPDATED_EVENT,
  isBlogBookmarked,
  isBlogCardBookmarked,
  toggleBlogBookmark,
} from "../utils/blogBookmarks";

export type BlogBookmarkMode = "listing" | "detail";

export function getBlogShareUrl(slug: string) {
  return typeof window !== "undefined"
    ? `${window.location.origin}/blogs/${slug}`
    : `/blogs/${slug}`;
}

export function getBlogShareText(title: string) {
  return `Check out ${title} on Sriram's IAS`;
}

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

  const shareUrl = getBlogShareUrl(bookmark.slug);
  const shareText = getBlogShareText(bookmark.title);

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

  const showShareMessage = useCallback((message: string) => {
    setShareMessage(message);
    window.setTimeout(() => setShareMessage(null), 2500);
  }, []);

  const shareOnWhatsApp = useCallback(() => {
    const text = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  }, [shareText, shareUrl]);

  const shareOnFacebook = useCallback(() => {
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  }, [shareUrl]);

  const shareViaEmail = useCallback(() => {
    const subject = encodeURIComponent(bookmark.title);
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [bookmark.title, shareText, shareUrl]);

  const copyShareLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showShareMessage("Link copied to clipboard");
    } catch {
      showShareMessage("Unable to copy link");
    }
  }, [shareUrl, showShareMessage]);

  const handleBookmark = useCallback(() => {
    if (!requireStudentAuth() || !user?.id) return;

    toggleBlogBookmark(user.id, bookmark);

    if (mode === "detail") {
      setIsBookmarked(isBlogBookmarked(user.id, bookmark.slug));
    } else {
      setIsBookmarked(isBlogCardBookmarked(user.id, bookmark.id));
    }
  }, [bookmark, mode, requireStudentAuth, user?.id]);

  return {
    isBookmarked,
    shareMessage,
    handleBookmark,
    shareOnWhatsApp,
    shareOnFacebook,
    shareViaEmail,
    copyShareLink,
    isStudentReady: isHydrated && isStudent,
  };
}
