'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FreeResourcesCourseSlider from '@/components/common/FreeResourcesCourseSlider';
import { FREE_LEARNING_EXPLORE_HREFS } from '@/features/homepage/utils/homepageLinks';
import {
  Bookmark,
  Share2,
  ArrowRight,
  ChevronDown,
  Lightbulb,
  BookOpenText,
  BarChart3,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    title: 'How to Stay Consistent Efficiently ?',
    date: 'March 23 , 2026',
    image: '/assets/blogs/book1.png',
  },
  {
    title: 'How to Stay Consistent Efficiently ?',
    date: 'March 23 , 2026',
    image: '/assets/blogs/book2.png',
  },
  {
    title: 'How to Stay Consistent Efficiently ?',
    date: 'March 23 , 2026',
    image: '/assets/blogs/cup-image.png',
  },
];

const gsPapers = [
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

const dates = [
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ['28', '29', '30', '31', '01', '02', '03'],
  ['04', '05', '06', '07', '08', '09', '10'],
  ['11', '12', '13', '14', '15', '16', '17'],
  ['18', '19', '20', '21', '22', '23', '24'],
  ['25', '26', '27', '28', '29', '30', '01'],
];

export default function BlogsPage() {
  const [activeLang, setActiveLang] = useState('ENGLISH');
  const mainRef = useRef<HTMLElement>(null);

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

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex h-full items-end px-4 pb-8 sm:px-8 sm:pb-10 md:px-10">
            <h1 className="text-[32px] font-black uppercase leading-none sm:text-[40px] md:text-[48px]">
              <span className="bg-gradient-to-r from-white via-[#c9c4ff] to-[#8f8cff] bg-clip-text text-transparent">
                BLOGS
              </span>
            </h1>
          </div>
        </section>

        <section className="relative overflow-hidden px-4 py-12 lg:px-6 xl:px-8">
          {/* Dotted Background */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
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
              {/* Language Tabs */}
              <div className="mb-7 flex justify-center">
                <div className="flex h-auto min-h-[56px] w-full max-w-[610px] flex-col items-stretch justify-between gap-2 rounded-full bg-[#F1F1F1] p-2 sm:h-[70px] sm:flex-row sm:p-[10px]">
                  {['ENGLISH', 'MARATHI', 'TELUGU'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`h-[44px] flex-1 rounded-full text-[14px] font-bold capitalize transition-all duration-300 sm:h-[50px] sm:text-[18px] ${
                        activeLang === lang
                          ? 'bg-gradient-to-r from-[#35A8DF] to-[#096A8D] text-white shadow-[0_8px_18px_rgba(0,0,0,0.16)]'
                          : 'bg-transparent text-[#666666]'
                      }`}
                    >
                      {lang.charAt(0) + lang.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Cup Card */}
              <div className="blog-main-card group relative mb-7 h-[278px] overflow-hidden rounded-[7px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:scale-[1.06] hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)]">
                <Image
                  src="/assets/blogs/main-cup.png"
                  alt="Main Cup Blog"
                  fill
                  priority
                  sizes="900px"
                  className="object-cover"
                />

                <div className="absolute right-7 top-7 flex gap-3">
                  <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-black/45 text-white">
                    <Bookmark size={25} />
                  </button>

                  <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-black/45 text-white">
                    <Share2 size={23} />
                  </button>
                </div>

                <div className="absolute left-[38px] top-[62px] max-w-[480px]">
                  <h2 className="mb-4 text-[34px] font-extrabold leading-[1.35] text-white">
                    How to Stay Consistent
                    <br />
                    Efficiently ?
                  </h2>

                  <p className="mb-4 text-[15px] font-bold text-white">
                    March 23 , 2026
                  </p>

                  <p className="text-[15px] font-bold text-white">
                    12:30 PM
                  </p>
                </div>

                <Link
                  href="/blogs/discipline-beats-motivation"
                  className="absolute bottom-[18px] right-[22px] flex h-[38px] min-w-[124px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#159DE2] hover:text-white"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </div>

              {/* Small Blog Cards - moved left and reduced size */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {blogs.map((blog, index) => (
                  <div
                    key={index}
                  className="blog-grid-card group relative h-[220px] overflow-hidden rounded-[8px] shadow-md transition-all duration-500 ease-out hover:scale-[1.08] hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)]"
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/25" />

                    <div className="absolute right-4 top-4 flex gap-2">
                      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white">
                        <Bookmark size={22} />
                      </button>

                      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white">
                        <Share2 size={20} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-5 right-4">
                      <h3 className="mb-3 text-[17px] font-extrabold leading-[1.45] text-white">
                        {blog.title}
                      </h3>

                      <p className="mb-2 text-[13px] font-bold text-white">
                        {blog.date}
                      </p>

                      <p className="mb-3 text-[13px] font-bold text-white">
                        12:30 PM
                      </p>

                      <Link
                        href="/blogs/discipline-beats-motivation"
                        className="ml-auto flex h-[36px] w-fit min-w-[120px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white"
                      >
                        Read More <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All */}
              <div className="mt-8 flex justify-end">
                <button className="h-[46px] min-w-[150px] rounded-full bg-gradient-to-r from-[#2BA7DF] to-[#052F44] text-[18px] font-semibold text-white shadow-md transition-all duration-300 hover:scale-105">
                  View All
                </button>
              </div>

              {/* Explore GS Paper Wise */}
              <section className="mt-16">
                <div className="mb-8 w-full text-center">
                  <h2 className="global-section-heading font-black uppercase leading-none">
                    EXPLORE GS PAPER WISE
                  </h2>
                </div>

                <div className="mb-10 flex justify-center gap-4">
                  {['GS I', 'GS II', 'GS III', 'GS IV'].map((tab, index) => (
                    <button
                      key={tab}
                      className={`h-[46px] min-w-[130px] rounded-[8px] text-[18px] font-semibold shadow-md ${
                        index === 0
                          ? 'bg-gradient-to-r from-[#37AEEB] to-[#032C42] text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {gsPapers.map((image, index) => (
                    <div
                      key={index}
                    className="blog-grid-card group relative h-[220px] overflow-hidden rounded-[8px] shadow-md transition-all duration-500 ease-out hover:scale-[1.08] hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)]"
                    >
                      <Image
                        src={image}
                        alt="GS Paper"
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-black/25" />

                      <div className="absolute right-4 top-4 flex gap-2">
                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white">
                          <Bookmark size={22} />
                        </button>

                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white">
                          <Share2 size={20} />
                        </button>
                      </div>

                      <div className="absolute bottom-4 left-5 right-4">
                        <h3 className="mb-3 text-[17px] font-extrabold leading-[1.45] text-white">
                          How to Stay Consistent Efficiently ?
                        </h3>

                        <p className="mb-2 text-[13px] font-bold text-white">
                          March 23 , 2026
                        </p>

                        <p className="mb-3 text-[13px] font-bold text-white">
                          12:30 PM
                        </p>

                        <Link
                          href="/blogs/discipline-beats-motivation"
                          className="ml-auto flex h-[36px] w-fit min-w-[120px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white"
                        >
                          Read More <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT SIDEBAR - increased width */}
            <aside className="space-y-6">
              {/* Calendar */}
              <div className="rounded-[10px] bg-white px-5 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <div className="mb-6 flex gap-3">
                  <button className="flex h-[44px] flex-1 items-center justify-center gap-3 rounded-full bg-[#EFF3FF] text-[18px] font-bold shadow-md">
                    2026 <ChevronDown size={17} strokeWidth={3} />
                  </button>

                  <button className="flex h-[44px] flex-1 items-center justify-center gap-3 rounded-full bg-[#EFF3FF] text-[18px] font-bold shadow-md">
                    April <ChevronDown size={17} strokeWidth={3} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center text-[15px] font-bold">
                  {dates.flat().map((item, index) => {
                    const isDayName = index < 7;
                    const isOutsideMonth =
                      (index >= 7 && index <= 10) || index === 41;

                    return (
                      <button
                        key={index}
                        disabled={isDayName || isOutsideMonth}
                        className={`flex h-[34px] items-center justify-center rounded-[6px] text-[15px] transition-all duration-300 ${
                          isDayName
                            ? 'cursor-default font-semibold text-[#A7A7A7]'
                            : isOutsideMonth
                              ? 'cursor-default font-bold text-[#A9A9A9] opacity-60'
                              : 'font-bold text-black hover:bg-[#EFF3FF]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Daily Learning */}
              <div className="rounded-[10px] bg-[#EEF3FF] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-[1.02]">
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
              <div className="rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
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
              <div className="rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <FreeResourcesCourseSlider />
              </div>

              {/* Trending Videos */}
              <div className="rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
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
                    <div className="relative h-[86px] w-[160px] shrink-0 overflow-hidden rounded-[4px]">
                      <Image
                        src="/assets/blogs/trending-video.png"
                        alt="Trending Video"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-[14px] font-bold leading-[1.45] text-black">
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
              <div className="relative overflow-hidden rounded-[10px] bg-white px-5 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
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
        </section>
      </main>

      <Footer />
    </>
  );
}