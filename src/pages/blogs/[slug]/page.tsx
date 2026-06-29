'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from '@/lib/appRouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from '@/components/common/AppImage';
import Link from '@/components/common/AppLink';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BlogDetailContentSection from '@/features/blogs/components/BlogDetailContentSection';
import BlogDetailHero from '@/features/blogs/components/BlogDetailHero';
import BlogDetailSidebar from '@/features/blogs/components/BlogDetailSidebar';
import BlogDetailSkeleton from '@/features/blogs/components/BlogDetailSkeleton';
import BlogDetailTableOfContents from '@/features/blogs/components/BlogDetailTableOfContents';
import { useBlogDetails } from '@/features/blogs/hooks/useBlogDetails';
import { useBlogSidebarTrendingVideo } from '@/features/blogs/hooks/useBlogSidebarTrendingVideo';
import { getBlogSectionId } from '@/features/blogs/services/blogDetailsService';
import { mapBlogDetailsToBookmark } from '@/features/blogs/utils/mapBlogDetailsToBookmark';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function BlogDetailPage() {
  const params = useParams();
  const blogId =
    typeof params.id === 'string'
      ? params.id
      : typeof params.slug === 'string'
        ? params.slug
        : '';

  const {
    data: blogData,
    isLoading: blogLoading,
    isError: blogError,
    error: blogQueryError,
  } = useBlogDetails({ id: blogId });

  const [activeId, setActiveId] = useState('');
  const articleRef = useRef<HTMLDivElement>(null);
  const bgTopRef = useRef<HTMLDivElement>(null);
  const bgBottomRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(
    () => blogData?.tableOfContents ?? [],
    [blogData?.tableOfContents],
  );

  const bookmark = useMemo(
    () => (blogData ? mapBlogDetailsToBookmark(blogData) : null),
    [blogData],
  );

  const { trendingVideos, viewAllHref } = useBlogSidebarTrendingVideo({
    language: blogData?.language?.languageName,
    enabled: Boolean(blogData?.language?.languageName),
    additionalSources: blogData?.youtubeVideoUrl
      ? [{ youtubeVideoUrl: blogData.youtubeVideoUrl, title: blogData.title }]
      : [],
  });

  useEffect(() => {
    if (!blogData) return undefined;

    const previousTitle = document.title;
    const pageTitle = blogData.metaTitle || blogData.title || '';
    const pageDescription = blogData.metaDescription || '';

    if (pageTitle) {
      document.title = pageTitle;
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    const previousDescription = metaDescription.getAttribute('content') || '';
    if (pageDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }

    return () => {
      document.title = previousTitle;
      if (pageDescription) {
        metaDescription?.setAttribute('content', previousDescription);
      }
    };
  }, [blogData]);

  useEffect(() => {
    if (!sections.length) return undefined;

    setActiveId(getBlogSectionId(sections[0].order));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(getBlogSectionId(section.order));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!blogData) return undefined;

    const ctx = gsap.context(() => {
      if (bgTopRef.current) {
        gsap.to(bgTopRef.current, {
          x: 45,
          y: -30,
          scale: 1.08,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (bgBottomRef.current) {
        gsap.to(bgBottomRef.current, {
          x: -45,
          y: 35,
          scale: 1.1,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      const cards = articleRef.current?.querySelectorAll<HTMLElement>('.blog-section-card');
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('.right-sidebar-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [blogData, sections.length]);

  const scrollToSection = (sectionOrder: number) => {
    const id = getBlogSectionId(sectionOrder);
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 100;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(id);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white font-['Montserrat',sans-serif]">
        <section className="relative h-[280px] w-full overflow-hidden sm:h-[340px] md:h-[380px]">
          <Image
            src="/assets/blogs/blogs-banner.png"
            alt="Blogs Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="absolute left-4 top-[140px] text-[36px] font-black uppercase leading-none sm:left-[28px] sm:top-[200px] sm:text-[48px]">
            <span className="bg-gradient-to-r from-white via-[#c9c4ff] to-[#8f8cff] bg-clip-text text-transparent sm:ml-10">
              BLOGS
            </span>
          </h1>
        </section>

        <section className="relative overflow-hidden px-4 py-14 lg:px-6 xl:px-8">
          <div
            ref={bgTopRef}
            className="pointer-events-none absolute right-[-90px] top-[10px] z-0 h-[760px] w-[760px] opacity-45"
          >
            <Image
              src="/assets/blogs/background-animation-blog1.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <div
            ref={bgBottomRef}
            className="pointer-events-none absolute bottom-[-170px] left-[-130px] z-0 h-[850px] w-[850px] opacity-45"
          >
            <Image
              src="/assets/blogs/background-animation-blog2.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1360px]">
            {blogLoading ? (
              <BlogDetailSkeleton />
            ) : blogError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
                <p className="text-lg font-semibold text-red-700">
                  {blogQueryError?.message || 'Unable to load this blog.'}
                </p>
                <Link
                  href="/blogs"
                  className="mt-4 inline-flex text-sm font-semibold text-[#246392] underline"
                >
                  Back to Blogs
                </Link>
              </div>
            ) : !blogData || !bookmark ? (
              <div className="rounded-xl border border-dashed border-[#b9d6ea] bg-[#f7fbff] px-6 py-10 text-center">
                <p className="text-lg font-semibold text-[#246392]">Blog Not Found</p>
                <Link
                  href="/blogs"
                  className="mt-4 inline-flex text-sm font-semibold text-[#246392] underline"
                >
                  Back to Blogs
                </Link>
              </div>
            ) : (
              <div ref={articleRef}>
                <BlogDetailHero
                  blog={blogData}
                  bookmark={bookmark}
                  showImage={false}
                />

                <div
                  className={cn(
                    'grid grid-cols-1 items-start gap-8',
                    sections.length > 0
                      ? 'xl:grid-cols-[255px_1fr_335px] xl:grid-rows-[auto_auto]'
                      : 'xl:grid-cols-[1fr_335px] xl:grid-rows-[auto_auto]',
                  )}
                >
                  {sections.length > 0 ? (
                    <BlogDetailTableOfContents
                      sections={sections}
                      activeId={activeId}
                      onSectionClick={scrollToSection}
                      className="order-2 xl:order-none xl:col-start-1 xl:row-start-1 xl:row-span-2"
                    />
                  ) : null}

                  <div
                    className={cn(
                      'order-1 min-w-0 w-full xl:order-none xl:row-start-1',
                      sections.length > 0
                        ? 'xl:col-start-2 xl:col-span-2'
                        : 'xl:col-start-1',
                    )}
                  >
                    <BlogDetailHero
                      blog={blogData}
                      bookmark={bookmark}
                      showHeader={false}
                      imageClassName="mb-0 w-full"
                    />
                  </div>

                  {sections.length > 0 ? (
                    <article className="order-3 min-w-0 xl:order-none xl:col-start-2 xl:row-start-2">
                      {sections.map((section) => (
                        <BlogDetailContentSection
                          key={section.order}
                          section={section}
                        />
                      ))}
                    </article>
                  ) : null}

                  <BlogDetailSidebar
                    part="all"
                    trendingVideos={trendingVideos}
                    viewAllHref={viewAllHref}
                    className={cn(
                      'order-4 xl:order-none',
                      sections.length > 0
                        ? 'xl:col-start-3 xl:row-start-2'
                        : 'xl:col-start-2 xl:row-start-1',
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
