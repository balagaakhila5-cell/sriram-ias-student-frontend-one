"use client";

import { useCallback, useEffect, useState } from "react";

import TestCard from "@/features/studentPortal/components/TestCard";
import BlogBookmarkCard from "@/features/blogs/components/BlogBookmarkCard";
import {
  BLOG_BOOKMARKS_UPDATED_EVENT,
  getBlogBookmarks,
  removeBlogBookmark,
} from "@/features/blogs/utils/blogBookmarks";
import type { BlogBookmark } from "@/features/blogs/types";
import type { TestItem } from "@/features/studentPortal/data/tests";
import { useAuthStore } from "@/store/authStore";

export default function BookmarksPage() {
  const user = useAuthStore((state) => state.user);
  const [bookmarkedTests, setBookmarkedTests] = useState<TestItem[]>([]);
  const [blogBookmarks, setBlogBookmarks] = useState<BlogBookmark[]>([]);

  const loadBlogBookmarks = useCallback(() => {
    if (!user?.id) {
      setBlogBookmarks([]);
      return;
    }

    setBlogBookmarks(getBlogBookmarks(user.id));
  }, [user?.id]);

  useEffect(() => {
    const storedTests = JSON.parse(
      localStorage.getItem("bookmarkedTests") || "[]",
    ) as TestItem[];

    setBookmarkedTests(storedTests);
    loadBlogBookmarks();

    const syncBlogs = () => loadBlogBookmarks();
    window.addEventListener(BLOG_BOOKMARKS_UPDATED_EVENT, syncBlogs);

    return () => {
      window.removeEventListener(BLOG_BOOKMARKS_UPDATED_EVENT, syncBlogs);
    };
  }, [loadBlogBookmarks]);

  const removeTestBookmark = (id: TestItem["id"]) => {
    const updated = bookmarkedTests.filter((item) => item.id !== id);

    setBookmarkedTests(updated);
    localStorage.setItem("bookmarkedTests", JSON.stringify(updated));
  };

  const removeBlog = (id: string) => {
    if (!user?.id) return;

    removeBlogBookmark(user.id, id);
    loadBlogBookmarks();
  };

  const hasAnyBookmarks = bookmarkedTests.length > 0 || blogBookmarks.length > 0;

  return (
    <div className="space-y-10">
      <h1 className="student-portal-heading">My Bookmarks</h1>

      {blogBookmarks.length > 0 ? (
        <section className="space-y-5">
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Bookmarked Blogs</h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {blogBookmarks.map((bookmark) => (
              <BlogBookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onRemove={() => removeBlog(bookmark.id)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {bookmarkedTests.length > 0 ? (
        <section className="space-y-5">
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Bookmarked Tests</h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {bookmarkedTests.map((test) => (
              <TestCard
                key={test.id}
                test={test}
                bookmarked={true}
                onToggleBookmark={() => removeTestBookmark(test.id)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {!hasAnyBookmarks ? (
        <div className="flex h-[300px] items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
          <p className="text-[15px] text-[#7A858E]">
            No bookmarks yet. Save blogs or tests to see them here.
          </p>
        </div>
      ) : null}
    </div>
  );
}
