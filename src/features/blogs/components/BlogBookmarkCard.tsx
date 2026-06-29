"use client";

import Image from "@/components/common/AppImage";
import Link from "@/components/common/AppLink";
import { ArrowRight, Bookmark } from "lucide-react";
import type { BlogBookmark } from "../types";

type BlogBookmarkCardProps = {
  bookmark: BlogBookmark;
  onRemove: () => void;
};

export default function BlogBookmarkCard({
  bookmark,
  onRemove,
}: BlogBookmarkCardProps) {
  return (
    <article className="group relative h-[220px] overflow-hidden rounded-[8px] shadow-md">
      <Image src={bookmark.image} alt={bookmark.title} fill className="object-cover" />

      <div className="absolute inset-0 bg-black/25" />

      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove bookmark"
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
      >
        <Bookmark size={22} className="fill-white text-white" />
      </button>

      <div className="absolute bottom-4 left-5 right-4">
        <h3 className="mb-3 text-[22px] font-extrabold leading-[1.45] text-white sm:text-[24px]">
          {bookmark.title}
        </h3>

        <p className="mb-2 text-[16px] font-bold text-white sm:text-[17px]">{bookmark.date}</p>

        {bookmark.time ? (
          <p className="mb-3 text-[16px] font-bold text-white sm:text-[17px]">{bookmark.time}</p>
        ) : null}

        <Link
          href={`/blogs/${bookmark.id}`}
          className="ml-auto flex h-[36px] w-fit min-w-[120px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white"
        >
          Read More <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
