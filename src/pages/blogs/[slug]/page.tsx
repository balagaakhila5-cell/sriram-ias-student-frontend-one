'use client';

import Image from '@/components/common/AppImage';
import Link from '@/components/common/AppLink';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from '@/lib/appRouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FreeResourcesCourseSlider from '@/components/common/FreeResourcesCourseSlider';
import { TrendingVideosViewAllButton } from '@/components/common/TrendingVideosCard';
import { FREE_LEARNING_EXPLORE_HREFS } from '@/features/homepage/utils/homepageLinks';
import { FOOTER_SOCIAL_LINKS } from '@/config/footerLinks';
import BlogDetailBookmarkButton from '@/features/blogs/components/BlogDetailBookmarkButton';
import BlogHtmlContent from '@/features/blogs/components/BlogHtmlContent';
import DailyLearningCard from '@/features/blogs/components/DailyLearningCard';
import { useBlogBySlug } from '@/features/blogs/hooks/useBlogs';
import {
  getBlogSectionId,
  getYoutubeEmbedUrl,
  mapPortalBlogToBookmarkInput,
} from '@/features/blogs/services/blogsService';
import type { BlogBookmarkInput } from '@/features/blogs/types';
import {
  ChevronDown,
  Clock3,
  Lightbulb,
  BookOpenText,
  BarChart3,
  Loader2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function BlogSidebar() {
  return (
    <aside className="space-y-6">
      <DailyLearningCard className="right-sidebar-card" />

      <div className="right-sidebar-card rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <h3 className="mb-5 text-center text-[30px] font-extrabold leading-none">
          <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
            Daily Quiz
          </span>
        </h3>

        <p className="mb-4 text-[18px] font-semibold text-black">
          Q . What is the capital of India?
        </p>

        {['Delhi', 'Mumbai', 'Hyderabad', 'Pune'].map((opt, i) => (
          <div
            key={opt}
            className={`mb-3 flex h-[49px] items-center rounded-[7px] border px-7 text-[14px] font-semibold ${
              i === 0 ? 'bg-[#EEF3FF]' : 'bg-white'
            }`}
          >
            {String.fromCharCode(65 + i)} .&nbsp;&nbsp; {opt}
          </div>
        ))}

        <div className="mt-8 flex justify-center">
          <Link
            href={FREE_LEARNING_EXPLORE_HREFS.dailyQuiz}
            className="inline-flex h-[45px] items-center justify-center rounded-full bg-gradient-to-r from-[#38AEE5] to-[#07344D] px-7 text-[18px] font-bold text-white transition hover:opacity-90"
          >
            Attempt Quiz →
          </Link>
        </div>
      </div>

      <div className="right-sidebar-card rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <FreeResourcesCourseSlider />
      </div>

      <div className="right-sidebar-card rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <h3 className="mb-5 text-center text-[30px] font-extrabold leading-none">
          <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
            Trending Videos
          </span>
        </h3>

        {[1, 2].map((item) => (
          <div key={item} className="mb-4 flex gap-4 border-b pb-4 last:border-b-0">
            <div className="relative h-[96px] w-[155px] shrink-0 overflow-hidden rounded-[4px]">
              <Image
                src="/assets/current-affairs/daily-current-affairs/trending-video.png"
                alt="Daily Current Affairs"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[16px] font-bold leading-[1.45] text-black sm:text-[17px]">
                Daily Current Affairs - 16 March 2026
              </p>
            </div>
          </div>
        ))}

        <div className="mt-2 flex justify-center">
          <TrendingVideosViewAllButton href={FOOTER_SOCIAL_LINKS.youtube} />
        </div>
      </div>

      <div className="right-sidebar-card relative overflow-hidden rounded-[10px] bg-white px-5 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <div
          className="pointer-events-none absolute right-[-30px] top-0 h-full w-[170px] opacity-60"
          style={{
            background:
              'repeating-radial-gradient(circle at top right, transparent 0, transparent 10px, rgba(203,166,95,0.35) 11px, transparent 12px)',
          }}
        />

        <h3 className="relative mb-8 text-center text-[30px] font-extrabold leading-none">
          <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
            Quick Links
          </span>
        </h3>

        <div className="relative space-y-5">
          <Link
            href="/current-affairs"
            className="group flex h-[58px] items-center justify-center gap-4 rounded-full border border-[#E47A7D] bg-white text-[17px] font-bold text-[#C76B70] transition-all duration-300 hover:bg-[#E47A7D] hover:text-white"
          >
            <Lightbulb size={26} className="transition-colors duration-300 group-hover:text-white" />
            Daily Current Affairs
          </Link>

          <Link
            href="/current-affairs/daily-practice-questions"
            className="group flex h-[58px] items-center justify-center gap-4 rounded-full border border-[#7F72C9] bg-white text-[17px] font-bold text-[#6962B4] transition-all duration-300 hover:bg-[#7F72C9] hover:text-white"
          >
            <BookOpenText size={26} className="transition-colors duration-300 group-hover:text-white" />
            Daily Practice Quiz
          </Link>

          <Link
            href="/current-affairs/infographics"
            className="group flex h-[58px] items-center justify-center gap-4 rounded-full border border-[#7A9B42] bg-white text-[17px] font-bold text-[#5D842D] transition-all duration-300 hover:bg-[#7A9B42] hover:text-white"
          >
            <BarChart3 size={26} className="transition-colors duration-300 group-hover:text-white" />
            Infographics
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const { data: blogData, isLoading: blogLoading, isError: blogError } = useBlogBySlug(slug);
  const [activeId, setActiveId] = useState('');
  const [isTocOpen, setIsTocOpen] = useState(true);
  const tocRef = useRef<HTMLUListElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const bgTopRef = useRef<HTMLDivElement>(null);
  const bgBottomRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(
    () => blogData?.tableOfContents ?? [],
    [blogData?.tableOfContents],
  );

  const bookmark: BlogBookmarkInput = useMemo(() => {
    if (blogData) {
      return mapPortalBlogToBookmarkInput(blogData);
    }

    return {
      id: slug,
      slug,
      title: 'Blog',
      date: '',
      time: '',
      image: '/assets/blogs/main-cup.png',
      category: '',
      language: '',
      readTime: '',
    };
  }, [blogData, slug]);

  const youtubeEmbedUrl = useMemo(
    () => getYoutubeEmbedUrl(blogData?.youtubeVideoUrl),
    [blogData?.youtubeVideoUrl],
  );

  useEffect(() => {
    if (!blogData) return undefined;

    const previousTitle = document.title;
    const pageTitle =
      blogData.metaTitle?.trim() ||
      blogData.searchPreview?.title?.trim() ||
      blogData.title?.trim() ||
      '';
    const pageDescription =
      blogData.metaDescription?.trim() ||
      blogData.searchPreview?.description?.trim() ||
      '';

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
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    );

    sections.forEach((section) => {
      const el = document.getElementById(getBlogSectionId(section.order));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
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

      gsap.utils.toArray<HTMLElement>('.right-sidebar-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            delay: i * 0.08,
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
  }, [sections.length]);

  const scrollToSection = (sectionOrder: number) => {
    const id = getBlogSectionId(sectionOrder);
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 100;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(id);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white font-['Montserrat',sans-serif]">
        <section className="relative h-[380px] w-full overflow-hidden">
          <Image
            src="/assets/blogs/blogs-banner.png"
            alt="Blogs Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="absolute left-[28px] top-[200px] text-[48px] font-black uppercase leading-none">
            <span className="ml-10 bg-gradient-to-r from-white via-[#c9c4ff] to-[#8f8cff] bg-clip-text text-transparent">
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
              <div className="flex min-h-[320px] items-center justify-center gap-3 text-[#246392]">
                <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
                <span className="text-lg font-semibold">Loading blog…</span>
              </div>
            ) : blogError || !blogData ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
                <p className="text-lg font-semibold text-red-700">Unable to load this blog.</p>
                <p className="mt-2 text-sm font-medium text-red-600/90">
                  This blog may not exist or may have been removed.
                </p>
                <Link
                  href="/blogs"
                  className="mt-4 inline-flex text-sm font-semibold text-[#246392] underline"
                >
                  Back to Blogs
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-10 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="mb-6 text-[44px] font-black leading-[1.15] sm:text-[48px]">
                      <span className="bg-gradient-to-r from-[#3099DD] via-[#8B85AA] to-[#D06D7A] bg-clip-text text-transparent">
                        {bookmark.title}
                      </span>
                    </h2>

                    <div className="flex flex-wrap items-center gap-5 text-[18px] font-semibold text-[#666]">
                      {bookmark.category ? <span>{bookmark.category}</span> : null}
                      {bookmark.category && bookmark.language ? <span>|</span> : null}
                      {bookmark.language ? <span>{bookmark.language}</span> : null}
                      {(bookmark.category || bookmark.language) && bookmark.readTime ? (
                        <span>|</span>
                      ) : null}
                      {bookmark.readTime ? (
                        <span className="flex items-center gap-2">
                          <Clock3 size={20} />
                          Read Time : {bookmark.readTime}
                        </span>
                      ) : null}
                    </div>

                    {blogData.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {blogData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#eef6fc] px-3 py-1 text-sm font-semibold text-[#246392]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <BlogDetailBookmarkButton bookmark={bookmark} />
                </div>

                <div ref={articleRef} className="grid grid-cols-1 gap-8 xl:grid-cols-[255px_1fr]">
                  <aside className="h-fit rounded-[12px] bg-white px-6 py-7 shadow-[0_8px_30px_rgba(0,0,0,0.08)] xl:sticky xl:top-[100px]">
                    <button
                      type="button"
                      onClick={() => setIsTocOpen((prev) => !prev)}
                      className="mb-0 flex w-full items-center justify-between gap-3 text-left"
                      aria-expanded={isTocOpen}
                      aria-controls="blog-table-of-content"
                    >
                      <h3 className="text-[24px] font-bold">
                        <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
                          Table Of Content
                        </span>
                      </h3>
                      <ChevronDown
                        size={24}
                        className={`shrink-0 text-[#349EE3] transition-transform duration-300 ${
                          isTocOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden
                      />
                    </button>

                    <ul
                      id="blog-table-of-content"
                      ref={tocRef}
                      className={`space-y-4 overflow-hidden text-[18px] font-bold transition-all duration-300 ease-in-out ${
                        isTocOpen
                          ? 'mt-7 max-h-[640px] opacity-100'
                          : 'mt-0 max-h-0 opacity-0'
                      }`}
                    >
                      {sections.map((section) => {
                        const sectionId = getBlogSectionId(section.order);
                        return (
                          <li key={sectionId}>
                            <button
                              type="button"
                              onClick={() => scrollToSection(section.order)}
                              className={`w-full rounded-[8px] px-3 py-2 text-left text-[20px] font-semibold transition-all duration-300 ${
                                activeId === sectionId
                                  ? 'bg-[#EBF7FF] text-[#22A8EA]'
                                  : 'text-[#777] hover:bg-[#F5FBFF] hover:text-[#22A8EA]'
                              }`}
                            >
                              {section.order}. {section.topic}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </aside>

                  <div className="min-w-0">
                    <div className="blog-section-card relative mb-10 h-[440px] overflow-hidden rounded-[10px] sm:h-[460px] md:h-[480px]">
                      <Image
                        src={bookmark.image}
                        alt={bookmark.title}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>

                    {youtubeEmbedUrl ? (
                      <div className="blog-section-card mb-10 aspect-video overflow-hidden rounded-[10px]">
                        <iframe
                          src={youtubeEmbedUrl}
                          title={bookmark.title}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : null}

                    {sections.length <= 1 ? (
                      <>
                        {sections.map((section) => (
                          <section
                            key={getBlogSectionId(section.order)}
                            id={getBlogSectionId(section.order)}
                            className="blog-section-card mb-14 scroll-mt-[100px]"
                          >
                            <h3 className="mb-6 text-[24px] font-semibold text-black">
                              {section.order} . {section.topic}
                            </h3>
                            {section.image ? (
                              <div className="relative mb-6 h-[280px] overflow-hidden rounded-[10px]">
                                <Image
                                  src={section.image}
                                  alt={section.topic}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : null}
                            <BlogHtmlContent html={section.content} />
                          </section>
                        ))}
                      </>
                    ) : (
                      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_335px]">
                        <article className="min-w-0">
                          {sections.map((section) => (
                            <section
                              key={getBlogSectionId(section.order)}
                              id={getBlogSectionId(section.order)}
                              className="blog-section-card mb-12 scroll-mt-[100px]"
                            >
                              <h3 className="mb-6 text-[24px] font-semibold text-black">
                                {section.order} . {section.topic}
                              </h3>
                              {section.image ? (
                                <div className="relative mb-6 h-[280px] overflow-hidden rounded-[10px]">
                                  <Image
                                    src={section.image}
                                    alt={section.topic}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : null}
                              <BlogHtmlContent html={section.content} />
                            </section>
                          ))}
                        </article>

                        <BlogSidebar />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
