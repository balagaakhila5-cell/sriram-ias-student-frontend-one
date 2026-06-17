'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FreeResourcesCourseSlider from '@/components/common/FreeResourcesCourseSlider';
import { FREE_LEARNING_EXPLORE_HREFS } from '@/features/homepage/utils/homepageLinks';
import BlogDetailBookmarkButton from '@/features/blogs/components/BlogDetailBookmarkButton';
import { getBlogBookmarkId } from '@/features/blogs/utils/blogBookmarks';
import {
  ChevronDown,
  Clock3,
  Lightbulb,
  BookOpenText,
  BarChart3,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'background', label: '2. Background' },
  { id: 'key-points', label: '3. Key Points' },
  { id: 'latest-development', label: '4. Latest Development' },
  { id: 'analysis', label: '5. Analysis' },
  { id: 'faqs', label: '6. FAQs' },
  { id: 'references', label: '7. References' },
  { id: 'conclusion', label: '8. Conclusion' },
];

export default function BlogDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : 'discipline-beats-motivation';
  const [activeId, setActiveId] = useState('introduction');
  const [isTocOpen, setIsTocOpen] = useState(true);
  const tocRef = useRef<HTMLUListElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const bgTopRef = useRef<HTMLDivElement>(null);
  const bgBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
          }
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
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
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
        {/* Banner */}
        <section className="relative h-[380px] w-full overflow-hidden">
          <Image
            src="/assets/blogs/blogs-banner.png"
            alt="Blogs Banner"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <h1 className="absolute left-[28px] top-[200px] text-[48px] font-black uppercase leading-none">
            <span className="ml-10 bg-gradient-to-r from-white via-[#c9c4ff] to-[#8f8cff] bg-clip-text text-transparent">
              BLOGS
            </span>
          </h1>
        </section>

        <section className="relative overflow-hidden px-4 py-14 lg:px-6 xl:px-8">
          {/* Visible animated background - top */}
          <div
            ref={bgTopRef}
            className="pointer-events-none absolute right-[-90px] top-[10px] z-0 h-[760px] w-[760px] opacity-80"
          >
            <Image
              src="/assets/blogs/background-animation-blog1.png"
              alt="Background Animation Blog 1"
              fill
              className="object-contain"
            />
          </div>

          {/* Visible animated background - bottom */}
          <div
            ref={bgBottomRef}
            className="pointer-events-none absolute bottom-[-170px] left-[-130px] z-0 h-[850px] w-[850px] opacity-80"
          >
            <Image
              src="/assets/blogs/background-animation-blog2.png"
              alt="Background Animation Blog 2"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1360px]">
            {/* Title area */}
            <div className="mb-10 flex items-start justify-between gap-6">
              <div>
                <h2 className="mb-6 text-[40px] font-black leading-[1.15]">
                  <span className="bg-gradient-to-r from-[#3099DD] via-[#8B85AA] to-[#D06D7A] bg-clip-text text-transparent">
                    Why Discipline Beats Motivation Every Time ?
                  </span>
                </h2>

                <div className="flex flex-wrap items-center gap-5 text-[18px] font-semibold text-[#666]">
                  <span>Current Affairs</span>
                  <span>|</span>
                  <span>Tags ( Prelims )</span>
                  <span>|</span>
                  <span className="flex items-center gap-2">
                    <Clock3 size={20} />
                    Read Time : 1 Hour
                  </span>
                </div>
              </div>

              <BlogDetailBookmarkButton
                bookmark={{
                  id: getBlogBookmarkId(slug),
                  slug,
                  title: 'Why Discipline Beats Motivation Every Time ?',
                  date: 'March 23 , 2026',
                  time: '12:30 PM',
                  image: '/assets/blogs/main-cup.png',
                  category: 'Current Affairs',
                }}
              />
            </div>

            {/* MAIN LAYOUT: TOC + FULL RIGHT CONTENT */}
            <div ref={articleRef} className="grid grid-cols-1 gap-8 xl:grid-cols-[255px_1fr]">
              {/* Table Of Content */}
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
                  {sections.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(id)}
                        className={`w-full rounded-[8px] px-3 py-2 text-left text-[20px] font-semibold transition-all duration-300 ${
                          activeId === id
                            ? 'bg-[#EBF7FF] text-[#22A8EA]'
                            : 'text-[#777] hover:bg-[#F5FBFF] hover:text-[#22A8EA]'
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* RIGHT SIDE FULL AREA */}
              <div className="min-w-0">
                {/* Image full width beside TOC */}
                <div className="blog-section-card relative mb-10 h-[285px] overflow-hidden rounded-[10px]">
                  <Image
                    src="/assets/blogs/timer-in-hand.png"
                    alt="Discipline Blog"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Introduction full width beside TOC */}
                <section id="introduction" className="blog-section-card mb-14 scroll-mt-[100px]">
                  <h3 className="mb-6 text-[24px] font-semibold text-black">
                    1 . Introduction
                  </h3>

                  <p className="text-[21px] font-normal leading-[1.8] text-[#111]">
                    Motivation feels powerful, but it&apos;s unreliable.{' '}
                    <span className="font-semibold text-[#22A8EA]">
                      Some days you wake up energized and ready to conquer your goals;
                      other days, even the smallest tasks feel overwhelming.
                    </span>{' '}
                    That&apos;s where discipline steps in. Discipline is not about how you
                    feel—it&apos;s about what you do despite how you feel. It creates
                    consistency, and consistency is what ultimately drives real success.
                  </p>
                </section>

                {/* From Background onwards: article + sidebar */}
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_335px]">
                  {/* Article content */}
                  <article className="min-w-0">
                    <section id="background" className="blog-section-card mb-12 scroll-mt-[100px]">
                      <h3 className="mb-6 text-[24px] font-semibold text-black">
                        2 . Background
                      </h3>

                      <p className="mb-7 text-[21px] font-normal leading-[1.8] text-[#111]">
                        Motivation is emotional and temporary. It often depends on external
                        factors like mood, environment, or inspiration.{' '}
                        <span className="font-semibold text-[#22A8EA]">
                          For example, watching a powerful video or attending a seminar can
                          boost motivation—but that feeling fades quickly.
                        </span>
                      </p>

                      <p className="text-[21px] font-normal leading-[1.8] text-[#111]">
                        Discipline, on the other hand, is built through habits and routines.
                        It doesn&apos;t rely on excitement. Instead, it relies on commitment and
                        structure. Highly successful individuals don&apos;t depend on motivation
                        every day—they depend on disciplined systems that keep them moving
                        forward even when they don&apos;t feel like it.
                      </p>
                    </section>

                    <section id="key-points" className="blog-section-card mb-12 scroll-mt-[100px]">
                      <h3 className="mb-6 text-[24px] font-semibold text-black">
                        3 . Key Points
                      </h3>

                      <p className="text-[21px] font-normal leading-[1.8] text-[#111]">
                        Motivation is emotional and temporary. It often depends on external
                        factors like mood, environment, or inspiration. For example, watching
                        a powerful video or attending a seminar can boost motivation—but that
                        feeling fades quickly.
                      </p>

                      <p className="mt-8 text-[21px] font-normal leading-[1.8] text-[#111]">
                        Discipline, on the other hand, is built through habits and routines.
                        It doesn&apos;t rely on excitement. Instead, it relies on commitment and
                        structure. Highly successful individuals don&apos;t depend on motivation
                        every day—they depend on disciplined systems.
                      </p>
                    </section>

                    <section id="latest-development" className="blog-section-card mb-12 scroll-mt-[100px]">
                      <h3 className="mb-6 text-[24px] font-semibold text-black">
                        4 . Latest Development
                      </h3>

                      <p className="text-[21px] font-normal leading-[1.8] text-[#111]">
                        Recent behavioral studies confirm that people who rely on disciplined
                        routines consistently outperform those driven purely by motivation.
                        Organizations and schools are increasingly incorporating habit-science
                        into their frameworks for sustained performance.
                      </p>
                    </section>

                    <section id="analysis" className="blog-section-card mb-12 scroll-mt-[100px]">
                      <h3 className="mb-6 text-[24px] font-semibold text-black">
                        5 . Analysis
                      </h3>

                      <p className="text-[21px] font-normal leading-[1.8] text-[#111]">
                        When we compare motivation vs discipline over a 90-day period, discipline
                        shows a significantly higher success rate. Motivation provides the initial
                        spark, but discipline sustains the flame. The key is building micro-habits
                        that require minimal willpower to execute daily.
                      </p>
                    </section>

                    <section id="faqs" className="blog-section-card mb-12 scroll-mt-[100px]">
                      <h3 className="mb-6 text-[24px] font-semibold text-black">
                        6 . FAQs
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <p className="text-[18px] font-semibold text-[#333]">
                            Q: Can discipline replace motivation entirely?
                          </p>

                          <p className="mt-2 text-[21px] font-normal leading-[1.8] text-[#555]">
                            A: Discipline doesn&apos;t replace motivation—it supplements it.
                            Use motivation to start, discipline to continue.
                          </p>
                        </div>

                        <div>
                          <p className="text-[21px] font-semibold text-[#333]">
                            Q: How long does it take to build discipline?
                          </p>

                          <p className="mt-2 text-[21px] font-normal leading-[1.8] text-[#555]">
                            A: Research suggests it takes between 21 to 66 days to form a lasting habit.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section id="references" className="blog-section-card mb-12 scroll-mt-[100px]">
                      <h3 className="mb-6 text-[24px] font-semibold text-black">
                        7 . References
                      </h3>

                      <ul className="list-disc space-y-3 pl-8 text-[21px] font-normal leading-[1.8] text-[#111]">
                        <li>James Clear – Atomic Habits (2018)</li>
                        <li>Angela Duckworth – Grit: The Power of Passion and Perseverance</li>
                        <li>Stanford Behavioral Research Lab, 2023</li>
                      </ul>
                    </section>

                    <section id="conclusion" className="blog-section-card mb-12 scroll-mt-[100px]">
                      <h3 className="mb-6 text-[24px] font-semibold text-black">
                        8 . Conclusion
                      </h3>

                      <p className="text-[21px] font-normal leading-[1.8] text-[#111]">
                        Discipline is the bridge between goals and accomplishment. While motivation
                        is the spark, discipline is the engine. Building strong daily habits and
                        committing to them—regardless of how you feel—is the true secret to
                        long-term success in UPSC or any endeavor.
                      </p>
                    </section>
                  </article>

                  {/* Right Sidebar starts exactly from Background */}
                  <aside className="space-y-6">
                    {/* Daily Learning */}
                    <div className="right-sidebar-card rounded-[10px] bg-[#EEF3FF] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                      <h3 className="mb-3 text-center text-[30px] font-extrabold leading-none">
                        <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
                          Daily Learning
                        </span>
                      </h3>

                      <div className="relative h-[225px] overflow-hidden rounded-[8px]">
                        <Image
                          src="/assets/blogs/timer-image.png"
                          alt="Daily Learning"
                          fill
                          className="object-cover"
                        />

                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                          <Link
                            href="/current-affairs/daily-practice-questions"
                            className="inline-flex h-[38px] items-center justify-center rounded-full border border-white px-8 text-[14px] font-semibold text-white transition hover:bg-white/10"
                          >
                            Explore →
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Daily Quiz */}
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

                    {/* Courses */}
                    <div className="right-sidebar-card rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                      <FreeResourcesCourseSlider />
                    </div>

                    {/* Trending Videos */}
                    <div className="right-sidebar-card rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                      <h3 className="mb-5 text-center text-[30px] font-extrabold leading-none">
                        <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
                          Trending Videos
                        </span>
                      </h3>

                      {[1, 2].map((item) => (
                        <div
                          key={item}
                          className="mb-4 flex gap-4 border-b pb-4 last:border-b-0"
                        >
                          <div className="relative h-[86px] w-[155px] shrink-0 overflow-hidden rounded-[4px]">
                            <Image
                              src="/assets/blogs/trending-video.png"
                              alt="Trending Video"
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <p className="text-[13px] font-bold leading-[1.45] text-black">
                              Daily Current Affairs - 16 March 2026
                            </p>

                            <p className="mt-2 text-[13px] font-medium text-[#666]">
                              ▶ Youtube
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Links */}
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
                          Daily Practice Questions
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}