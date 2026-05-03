'use client';

import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Bookmark, Clock3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const [activeId, setActiveId] = useState('introduction');
  const tocRef = useRef<HTMLUListElement>(null);
  const articleRef = useRef<HTMLElement>(null);

  // Scroll-spy: update active TOC item based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // GSAP animations for article sections on scroll
  useEffect(() => {
    if (!articleRef.current) return;

    const cards = articleRef.current.querySelectorAll<HTMLElement>('.blog-section-card');
    cards.forEach((card) => {
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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
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
            <span className="bg-gradient-to-r from-white via-[#c9c4ff] to-[#8f8cff] bg-clip-text text-transparent ml-10">
              BLOGS
            </span>
          </h1>
        </section>

        <section className="relative px-4 py-16">
          <div className="mx-auto max-w-[1320px]">
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
              <button className="ml-auto flex h-[56px] min-w-[170px] items-center justify-center gap-3 rounded-[10px] bg-white px-7 shadow-md text-[20px] font-semibold text-[#444]">
                <Bookmark size={25} />
                Bookmark
              </button>
            </div>

            <div className="grid grid-cols-1 gap-9 lg:grid-cols-[300px_1fr]">
              {/* Sticky Table of Contents */}
              <aside className="lg:sticky lg:top-[100px] h-fit rounded-[12px] bg-white px-6 py-7 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <h3 className="mb-7 text-[24px] font-bold">
                  <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
                    Table Of Content
                  </span>
                </h3>

                <ul ref={tocRef} className="space-y-4 text-[18px] font-bold">
                  {sections.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`w-full text-left px-3 py-2 rounded-[8px] transition-all duration-300 font-semibold text-[20px] ${
                          activeId === id
                            ? 'text-[#22A8EA] bg-[#EBF7FF]'
                            : 'text-[#777] hover:text-[#22A8EA] hover:bg-[#F5FBFF]'
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Main Content */}
              <article ref={articleRef}>
                <div className="blog-section-card relative mb-10 h-[285px] overflow-hidden rounded-[10px]">
                  <Image
                    src="/assets/blogs/timer-in-hand.png"
                    alt="Discipline Blog"
                    fill
                    className="object-cover"
                  />
                </div>

                <section id="introduction" className="blog-section-card mb-12 scroll-mt-[100px]">
                  <h3 className="mb-6 text-[24px] font-semibold text-black">1 . Introduction</h3>
                  <p className="text-[18px] font-normal leading-[1.7] text-[#111]">
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

                <section id="background" className="blog-section-card mb-12 scroll-mt-[100px]">
                  <h3 className="mb-6 text-[24px] font-semibold text-black">2 . Background</h3>
                  <p className="mb-7 text-[18px] font-normal leading-[1.7] text-[#111]">
                    Motivation is emotional and temporary. It often depends on external
                    factors like mood, environment, or inspiration.{' '}
                    <span className="font-semibold text-[#22A8EA]">
                      For example, watching a powerful video or attending a seminar can
                      boost motivation—but that feeling fades quickly.
                    </span>
                  </p>
                  <p className="text-[18px] font-normal leading-[1.7] text-[#111]">
                    Discipline, on the other hand, is built through habits and routines.
                    It doesn&apos;t rely on excitement. Instead, it relies on commitment and
                    structure. Highly successful individuals don&apos;t depend on motivation
                    every day—they depend on disciplined systems that keep them moving
                    forward even when they don&apos;t feel like it.
                  </p>
                </section>

                <section id="key-points" className="blog-section-card mb-12 scroll-mt-[100px]">
                  <h3 className="mb-6 text-[24px] font-semibold text-black">3 . Key Points</h3>
                  <p className="text-[18px] font-normal leading-[1.7] text-[#111]">
                    Motivation is emotional and temporary. It often depends on external
                    factors like mood, environment, or inspiration. For example, watching
                    a powerful video or attending a seminar can boost motivation—but that
                    feeling fades quickly.
                  </p>
                  <p className="mt-8 text-[18px] font-normal leading-[1.7] text-[#111]">
                    Discipline, on the other hand, is built through habits and routines.
                    It doesn&apos;t rely on excitement. Instead, it relies on commitment and
                    structure. Highly successful individuals don&apos;t depend on motivation
                    every day—they depend on disciplined systems.
                  </p>
                </section>

                <section id="latest-development" className="blog-section-card mb-12 scroll-mt-[100px]">
                  <h3 className="mb-6 text-[24px] font-semibold text-black">4 . Latest Development</h3>
                  <p className="text-[18px] font-normal leading-[1.7] text-[#111]">
                    Recent behavioral studies confirm that people who rely on disciplined
                    routines consistently outperform those driven purely by motivation.
                    Organizations and schools are increasingly incorporating habit-science
                    into their frameworks for sustained performance.
                  </p>
                </section>

                <section id="analysis" className="blog-section-card mb-12 scroll-mt-[100px]">
                  <h3 className="mb-6 text-[24px] font-semibold text-black">5 . Analysis</h3>
                  <p className="text-[18px] font-normal leading-[1.7] text-[#111]">
                    When we compare motivation vs discipline over a 90-day period, discipline
                    shows a significantly higher success rate. Motivation provides the initial
                    spark, but discipline sustains the flame. The key is building micro-habits
                    that require minimal willpower to execute daily.
                  </p>
                </section>

                <section id="faqs" className="blog-section-card mb-12 scroll-mt-[100px]">
                  <h3 className="mb-6 text-[24px] font-semibold text-black">6 . FAQs</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[18px] font-semibold text-[#333]">Q: Can discipline replace motivation entirely?</p>
                      <p className="mt-2 text-[18px] font-normal leading-[1.7] text-[#555]">
                        A: Discipline doesn&apos;t replace motivation—it supplements it. Use motivation to start, discipline to continue.
                      </p>
                    </div>
                    <div>
                      <p className="text-[21px] font-semibold text-[#333]">Q: How long does it take to build discipline?</p>
                      <p className="mt-2 text-[19px] font-normal leading-[1.7] text-[#555]">
                        A: Research suggests it takes between 21 to 66 days to form a lasting habit.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="references" className="blog-section-card mb-12 scroll-mt-[100px]">
                  <h3 className="mb-6 text-[24px] font-semibold text-black">7 . References</h3>
                  <ul className="list-disc pl-8 space-y-3 text-[18px] font-normal leading-[1.7] text-[#111]">
                    <li>James Clear – Atomic Habits (2018)</li>
                    <li>Angela Duckworth – Grit: The Power of Passion and Perseverance</li>
                    <li>Stanford Behavioral Research Lab, 2023</li>
                  </ul>
                </section>

                <section id="conclusion" className="blog-section-card mb-12 scroll-mt-[100px]">
                  <h3 className="mb-6 text-[24px] font-semibold text-black">8 . Conclusion</h3>
                  <p className="text-[18px] font-normal leading-[1.7] text-[#111]">
                    Discipline is the bridge between goals and accomplishment. While motivation
                    is the spark, discipline is the engine. Building strong daily habits and
                    committing to them—regardless of how you feel—is the true secret to
                    long-term success in UPSC or any endeavor.
                  </p>
                </section>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
