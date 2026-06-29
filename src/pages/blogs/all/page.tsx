'use client';

import Link from '@/components/common/AppLink';
import React, { useEffect, useRef } from 'react';
import Image from '@/components/common/AppImage';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BlogGridCard from '@/features/blogs/components/BlogGridCard';
import BlogsCalendar from '@/features/blogs/components/BlogsCalendar';
import BlogsSidebar from '@/features/blogs/components/BlogsSidebar';
import { usePublishedBlogs } from '@/features/blogs/hooks/useBlogs';
import { ALL_BLOGS } from '@/features/blogs/data/blogsCatalog';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AllBlogsPage() {
  const mainRef = useRef<HTMLElement>(null);
  const { data: apiBlogs = [], isLoading: blogsLoading } = usePublishedBlogs();
  const blogs = apiBlogs.length > 0 ? apiBlogs : ALL_BLOGS;

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
  }, []);

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

              {blogsLoading ? (
                <div className="rounded-xl border border-[#d8e8f5] bg-[#f7fbff] px-6 py-14 text-center text-[#246392]">
                  Loading blogs…
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {blogs.map((blog) => (
                    <BlogGridCard key={blog.id} blog={blog} />
                  ))}
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BlogsSidebar />
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
