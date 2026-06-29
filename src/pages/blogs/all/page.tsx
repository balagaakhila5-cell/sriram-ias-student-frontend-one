'use client';

import Link from '@/components/common/AppLink';
import React, { useEffect, useRef, useState } from 'react';
import Image from '@/components/common/AppImage';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BlogList from '@/features/blogs/components/BlogList';
import BlogsCalendar from '@/features/blogs/components/BlogsCalendar';
import BlogsSidebar from '@/features/blogs/components/BlogsSidebar';
import { usePublicBlogs } from '@/features/blogs/hooks/usePublicBlogs';
import { useBlogLanguages } from '@/features/blogs/hooks/useBlogLanguages';
import { useSelectedBlogLanguage } from '@/features/blogs/hooks/useSelectedBlogLanguage';
import { BLOG_TRENDING_VIDEOS_SECTION_ID } from '@/features/blogs/services/blogDetailsService';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BLOGS_PAGE_SIZE = 12;

export default function AllBlogsPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(1);
  const { data: languages = [] } = useBlogLanguages();
  const { selectedLanguage } = useSelectedBlogLanguage({
    languages,
  });
  const {
    data: blogListData,
    isLoading: blogsLoading,
    isFetching: blogsFetching,
    isError: blogsError,
    error: blogsQueryError,
  } = usePublicBlogs({
    language: selectedLanguage?.languageName,
    page,
    limit: BLOGS_PAGE_SIZE,
    enabled: Boolean(selectedLanguage?.languageName) && languages.length > 0,
  });

  const blogs = blogListData?.blogs ?? [];
  const pagination = blogListData?.pagination;
  const showBlogLoading = blogsLoading || (blogsFetching && blogs.length === 0);

  useEffect(() => {
    setPage(1);
  }, [selectedLanguage?.languageName]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash !== `#${BLOG_TRENDING_VIDEOS_SECTION_ID}`) return;

    const scrollTarget = document.getElementById(BLOG_TRENDING_VIDEOS_SECTION_ID);
    if (!scrollTarget) return;

    window.requestAnimationFrame(() => {
      scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [showBlogLoading]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.blog-grid-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(1.2)',
            delay: (i % 6) * 0.06,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [blogs.length, page, showBlogLoading]);

  return (
    <>
      <Header />

      <main
        ref={mainRef}
        className="min-h-screen bg-white font-['Montserrat',sans-serif]"
      >
        <section className="relative h-[220px] w-full overflow-hidden sm:h-[260px] md:h-[300px]">
          <Image
            src="/assets/blogs/blogs-banner.png"
            alt="All Blogs"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-8 sm:px-8 sm:pb-10 md:px-10">
            <Link
              href="/blogs"
              className="mb-4 w-fit text-sm font-semibold text-white/90 transition hover:text-white"
            >
              ← Back to Blogs
            </Link>
            <h1 className="text-[32px] font-black uppercase leading-none sm:text-[40px] md:text-[48px]">
              <span className="bg-gradient-to-r from-white via-[#c9c4ff] to-[#8f8cff] bg-clip-text text-transparent">
                All Blogs
              </span>
            </h1>
          </div>
        </section>

        <section className="relative overflow-x-hidden px-4 py-12 lg:px-6 xl:px-8">
          <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: 'radial-gradient(#9C9C9C 2px, transparent 2px)',
                backgroundSize: '26px 26px',
              }}
            />
          </div>

          <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_350px]">
            <div className="min-w-0">
              <div className="mb-8">
                <h2 className="text-[28px] font-extrabold text-gray-900 md:text-[32px]">
                  Explore All Articles
                </h2>
                <p className="mt-2 text-[15px] font-medium text-gray-600">
                  Browse every blog post in one place.
                </p>
              </div>

              <div className="mb-8 lg:hidden">
                <BlogsCalendar />
              </div>

              <BlogList
                blogs={blogs}
                isLoading={showBlogLoading}
                isError={blogsError}
                errorMessage={blogsQueryError?.message}
                pagination={pagination}
                onPageChange={setPage}
                skeletonCount={BLOGS_PAGE_SIZE}
              />
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BlogsSidebar
                showTrendingVideos
                showTrendingVideoList
                showTrendingViewAll={false}
              />
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
