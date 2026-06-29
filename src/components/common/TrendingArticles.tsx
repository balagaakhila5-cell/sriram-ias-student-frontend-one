'use client';

import Link from "@/components/common/AppLink";
import React, { useMemo } from "react";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";
import { usePublishedBlogs } from "@/features/blogs/hooks/useBlogs";

export interface TrendingArticleItem {
  title: string;
  href: string;
}

interface TrendingArticlesProps {
  articles?: TrendingArticleItem[];
  viewAllHref?: string;
}

const ArticleIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <rect width="32" height="32" rx="6" fill="#F0F0F0" />
    <rect x="8" y="9" width="16" height="2" rx="1" fill="#9E9E9E" />
    <rect x="8" y="13" width="16" height="2" rx="1" fill="#9E9E9E" />
    <rect x="8" y="17" width="12" height="2" rx="1" fill="#9E9E9E" />
    <rect x="8" y="21" width="9" height="2" rx="1" fill="#9E9E9E" />
  </svg>
);

const TrendingArticles = ({
  articles,
  viewAllHref = "/blogs/all",
}: TrendingArticlesProps) => {
  const { data: apiBlogs = [] } = usePublishedBlogs();

  const resolvedArticles = useMemo(() => {
    if (articles) return articles;
    return apiBlogs.slice(0, 6).map((blog) => ({
      title: blog.title,
      href: `/blogs/${blog.id}`,
    }));
  }, [articles, apiBlogs]);

  if (resolvedArticles.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
      {/* Heading */}
      <h2 className="mb-5 text-center text-[30px] font-extrabold leading-none md:text-[34px]">
        <span className={`${RESOURCE_PAGE_HEADING_GRADIENT} -ml-3.5 -mr-2`}>
          Trending Articles
        </span>

      </h2>

      {/* Article list */}
      <ul className="divide-y divide-gray-100">
        {resolvedArticles.map((article, index) => (
          <li key={`${article.href}-${index}`}>
            <Link
              href={article.href}
              className="flex items-start gap-3 py-3 transition-colors duration-200 hover:bg-gray-50 rounded-lg px-1"
            >
              <ArticleIcon />
              <span className="text-[13.5px] font-medium leading-snug text-gray-700 pt-1">
                {article.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* View All */}
      <div className="mt-4 text-center">
        <Link
          href={viewAllHref}
          className="text-[14px] font-semibold text-[#4D90D2] underline underline-offset-2 hover:text-[#3a78bb] transition-colors duration-200"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default TrendingArticles;
