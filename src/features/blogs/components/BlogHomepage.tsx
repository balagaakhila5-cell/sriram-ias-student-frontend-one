'use client';

import Link from '@/components/common/AppLink';
import { useMemo } from 'react';
import BlogGridCard from '@/features/blogs/components/BlogGridCard';
import BlogList from '@/features/blogs/components/BlogList';
import FeaturedBlog from '@/features/blogs/components/FeaturedBlog';
import BlogCategorySelector from '@/features/blogs/components/BlogCategorySelector';
import { BlogFeaturedSkeleton } from '@/features/blogs/components/BlogListSkeleton';
import type { BlogCategory } from '@/features/blogs/types/blogCategory';
import {
  getGsPaperWiseBlogs,
  type BlogHomepageViewModel,
} from '@/features/blogs/utils/mapBlogHomepageBundle';

type BlogHomepageProps = {
  bundle?: BlogHomepageViewModel;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  selectedCategory: BlogCategory | null;
  onSelectCategory: (category: BlogCategory) => void;
  hideFeatured?: boolean;
};

export default function BlogHomepage({
  bundle,
  isLoading = false,
  isError = false,
  errorMessage,
  selectedCategory,
  onSelectCategory,
  hideFeatured = false,
}: BlogHomepageProps) {
  const categoryBlogs = useMemo(
    () => getGsPaperWiseBlogs(bundle, selectedCategory?.value ?? null),
    [bundle, selectedCategory?.value],
  );

  const categoryEmptyMessage = selectedCategory?.label
    ? `No ${selectedCategory.label} Blogs Available`
    : 'No Blogs Available';

  if (isLoading) {
    return (
      <>
        {!hideFeatured ? <BlogFeaturedSkeleton /> : null}
        <BlogList skeletonCount={3} blogs={[]} isLoading showPagination={false} />
        <div className="mt-16">
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-[46px] min-w-[130px] animate-pulse rounded-[8px] bg-slate-200"
              />
            ))}
          </div>
          <BlogList skeletonCount={6} blogs={[]} isLoading showPagination={false} />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-10 text-center text-sm font-medium text-red-700">
        {errorMessage || 'Unable to load blog homepage. Please try again.'}
      </div>
    );
  }

  if (!bundle) {
    return null;
  }

  return (
    <>
      {!hideFeatured && bundle.featured ? <FeaturedBlog blog={bundle.featured} /> : null}

      {bundle.previewBlogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bundle.previewBlogs.map((blog) => (
            <BlogGridCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <BlogList blogs={[]} showPagination={false} />
      )}

      <div className="mt-8 flex justify-end">
        <Link
          href="/blogs/all"
          className="inline-flex h-[46px] min-w-[150px] items-center justify-center rounded-full bg-gradient-to-r from-[#2BA7DF] to-[#052F44] text-[18px] font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
        >
          View All
        </Link>
      </div>

      <section className="mt-16">
        <div className="mb-8 w-full text-center">
          <h2 className="global-section-heading font-black uppercase leading-none">
            EXPLORE GS PAPER WISE
          </h2>
        </div>

        <BlogCategorySelector
          categories={bundle.categories}
          selectedCategory={selectedCategory}
          onSelect={onSelectCategory}
          className="mb-10"
        />

        <BlogList
          key={selectedCategory?.value ?? 'homepage-category'}
          blogs={categoryBlogs}
          showPagination={false}
          skeletonCount={6}
          emptyMessage={categoryEmptyMessage}
        />
      </section>
    </>
  );
}
