"use client";

import { useEffect, useState } from "react";

import TestCard from "@/features/studentPortal/components/TestCard";

import type { TestItem } from "@/features/studentPortal/data/tests";

export default function BookmarksPage() {

  const [bookmarks, setBookmarks] =
    useState<TestItem[]>([]);

  useEffect(() => {

    const storedBookmarks = JSON.parse(
      localStorage.getItem("bookmarkedTests") || "[]"
    );

    setBookmarks(storedBookmarks);

  }, []);

  const removeBookmark = (
  id: TestItem["id"]
) => {

  const updated = bookmarks.filter(
    (item) => item.id !== id
  );

  setBookmarks(updated);

  localStorage.setItem(
    "bookmarkedTests",
    JSON.stringify(updated)
  );
};

  return (
    <div className="space-y-6">

      <h1 className="student-portal-heading">
        My Bookmarks
      </h1>

      {bookmarks.length > 0 ? (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {bookmarks.map((test) => (

            <TestCard
              key={test.id}
              test={test}
              bookmarked={true}
              onToggleBookmark={() =>
                removeBookmark(test.id)
              }
            />

          ))}

        </div>

      ) : (

        <div className="flex h-[300px] items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

          <p className="text-[15px] text-[#7A858E]">
            No bookmarked tests available.
          </p>

        </div>

      )}
    </div>
  );
}