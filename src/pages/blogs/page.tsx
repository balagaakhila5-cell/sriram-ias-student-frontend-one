'use client';

import Link from '@/components/common/AppLink';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from '@/components/common/AppImage';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { ArrowRight } from 'lucide-react';
import BlogActionButtons from '@/features/blogs/components/BlogActionButtons';
import BlogGridCard from '@/features/blogs/components/BlogGridCard';
import BlogsCalendar from '@/features/blogs/components/BlogsCalendar';
import BlogsSidebar from '@/features/blogs/components/BlogsSidebar';
import { usePublishedBlogs } from '@/features/blogs/hooks/useBlogs';
import { FEATURED_BLOG, PREVIEW_BLOGS } from '@/features/blogs/data/blogsCatalog';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GS_TABS = ['GS I', 'GS II', 'GS III', 'GS IV', 'STRATEGY'] as const;
type GsTab = (typeof GS_TABS)[number];

const GS_CARD_META = {
  title: 'How to Stay Consistent Efficiently ?',
  date: 'March 23 , 2026',
  time: '12:30 PM',
} as const;

const gsPaperImages = [
  '/assets/blogs/book1.png',
  '/assets/blogs/book2.png',
  '/assets/blogs/hand-image.png',
  '/assets/blogs/hand-image.png',
  '/assets/blogs/image-4.png',
  '/assets/blogs/cup-image.png',
  '/assets/blogs/book1.png',
  '/assets/blogs/book2.png',
  '/assets/blogs/hand-image.png',
  '/assets/blogs/hand-image.png',
  '/assets/blogs/image-4.png',
  '/assets/blogs/cup-image.png',
  '/assets/blogs/book1.png',
  '/assets/blogs/book2.png',
  '/assets/blogs/hand-image.png',
];

const gsPaperCardsByTab: Record<GsTab, typeof gsPaperImages> = {
  'GS I': gsPaperImages,
  'GS II': gsPaperImages,
  'GS III': gsPaperImages,
  'GS IV': gsPaperImages,
  STRATEGY: gsPaperImages,
};

export default function BlogsPage() {
  const [activeGsTab, setActiveGsTab] = useState<GsTab>('GS I');
  const mainRef = useRef<HTMLElement>(null);
  const { data: apiBlogs = [], isLoading: blogsLoading } = usePublishedBlogs();

  const featuredBlog = useMemo(() => {
    if (apiBlogs.length > 0) {
      const mainBlog = apiBlogs.find((blog) => blog.isMainBlog);
      return mainBlog || apiBlogs[0];
    }
    return FEATURED_BLOG;
  }, [apiBlogs]);

  const previewBlogs = useMemo(() => {
    if (apiBlogs.length > 0) {
      const withoutFeatured = apiBlogs.filter((blog) => blog.id !== featuredBlog.id);
      return withoutFeatured.slice(0, 3);
    }
    return PREVIEW_BLOGS;
  }, [apiBlogs, featuredBlog]);

  const gsTabBlogs = useMemo(() => {
    const filtered = apiBlogs.filter((blog) => blog.category === activeGsTab);
    if (filtered.length > 0) return filtered;
    return null;
  }, [apiBlogs, activeGsTab]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-main-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-main-card',
            start: 'top 85%',
            once: true,
          },
        }
      );

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
            delay: i * 0.06,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />

      <main ref={mainRef} className="min-h-screen bg-white font-['Montserrat',sans-serif]">
        {/* Banner */}
        <section className="relative h-[280px] w-full overflow-hidden sm:h-[320px] md:h-[360px]">
          <Image
            src="/assets/blogs/blogs-banner.png"
            alt="Blogs Banner"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 flex h-full items-end px-4 pb-8 sm:px-8 sm:pb-10 md:px-10">
            <h1 className="text-[40px] font-black uppercase leading-none sm:text-[48px] md:text-[56px]">
              <span className="bg-gradient-to-r from-white via-[#c9c4ff] to-[#8f8cff] bg-clip-text text-transparent">
                BLOGS
              </span>
            </h1>
          </div>
        </section>

        <section className="relative overflow-x-hidden px-4 py-12 lg:px-6 xl:px-8">
          {/* Dotted Background */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: 'radial-gradient(#9C9C9C 2px, transparent 2px)',
                backgroundSize: '26px 26px',
              }}
            />
          </div>

          {/* Main Layout */}
          <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_350px]">
            {/* LEFT CONTENT */}
            <div className="min-w-0">
              <div className="mb-7 lg:hidden">
                <BlogsCalendar />
              </div>

              {blogsLoading ? (
                <div className="mb-7 flex min-h-[320px] items-center justify-center rounded-[7px] border border-[#d8e8f5] bg-[#f7fbff] text-[#246392]">
                  Loading blogs…
                </div>
              ) : (
                <>
                  <div className="blog-main-card group relative mb-7 h-[320px] overflow-hidden rounded-[7px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:scale-[1.06] hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)] sm:h-[340px]">
                    <Image
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      fill
                      priority
                      sizes="900px"
                      className="object-cover"
                    />

                    <div className="absolute right-7 top-7">
                      <BlogActionButtons bookmark={featuredBlog} size="md" className="gap-3" />
                    </div>

                    <div className="absolute left-[38px] top-[62px] max-w-[480px]">
                      <h2 className="mb-4 text-[40px] font-extrabold leading-[1.35] text-white sm:text-[42px]">
                        {featuredBlog.title}
                      </h2>

                      <p className="mb-4 text-[18px] font-bold text-white sm:text-[20px]">
                        {featuredBlog.date}
                      </p>

                      {featuredBlog.time ? (
                        <p className="text-[18px] font-bold text-white sm:text-[20px]">
                          {featuredBlog.time}
                        </p>
                      ) : null}
                    </div>

                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="absolute bottom-[18px] right-[22px] flex h-[38px] min-w-[124px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#159DE2] hover:text-white"
                    >
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {previewBlogs.map((blog) => (
                      <BlogGridCard key={blog.id} blog={blog} />
                    ))}
                  </div>
                </>
              )}

              {/* View All */}
              <div className="mt-8 flex justify-end">
                <Link
                  href="/blogs/all"
                  className="inline-flex h-[46px] min-w-[150px] items-center justify-center rounded-full bg-gradient-to-r from-[#2BA7DF] to-[#052F44] text-[18px] font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
                >
                  View All
                </Link>
              </div>

              {/* Explore GS Paper Wise */}
              <section className="mt-16">
                <div className="mb-8 w-full text-center">
                  <h2 className="global-section-heading font-black uppercase leading-none">
                    EXPLORE GS PAPER WISE
                  </h2>
                </div>

                <div className="mb-10 flex flex-wrap justify-center gap-4">
                  {GS_TABS.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveGsTab(tab)}
                      className={`h-[46px] min-w-[130px] rounded-[8px] text-[18px] font-semibold shadow-md transition-all duration-300 ${
                        activeGsTab === tab
                          ? 'bg-gradient-to-r from-[#37AEEB] to-[#032C42] text-white'
                          : 'bg-white text-black hover:bg-[#F5F5F5]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div
                  key={activeGsTab}
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                  {gsTabBlogs
                    ? gsTabBlogs.map((blog) => (
                        <BlogGridCard key={blog.id} blog={blog} />
                      ))
                    : gsPaperCardsByTab[activeGsTab].map((image, index) => (
                    <div
                      key={`${activeGsTab}-${index}`}
                      className="blog-grid-card group relative h-[260px] overflow-hidden rounded-[8px] shadow-md transition-all duration-500 ease-out hover:scale-[1.08] hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)]"
                    >
                      <Image
                        src={image}
                        alt="GS Paper"
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-black/25" />

                      <div className="absolute bottom-4 left-5 right-4">
                        <h3 className="mb-3 text-[22px] font-extrabold leading-[1.45] text-white sm:text-[24px]">
                          {GS_CARD_META.title}
                        </h3>

                        <p className="mb-2 text-[16px] font-bold text-white sm:text-[17px]">
                          {GS_CARD_META.date}
                        </p>

                        <p className="text-[16px] font-bold text-white sm:text-[17px]">
                          {GS_CARD_META.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BlogsSidebar showTrendingVideos />
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}