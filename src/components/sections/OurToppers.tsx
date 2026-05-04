'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const OurToppers: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.from('.our-toppers-heading', {
      y: 70,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        once: true,
      },
    });

    gsap.from('.our-toppers-card', {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      stagger: { each: 0.03, from: 'center' },
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%',
        once: true,
      },
    });
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  const toppers = [
    {
      name: 'ANUJ AGNIHOTRI',
      rank: 'AIR 01',
      course: 'GS Foundation Course',
      img: 'ANUJ-AGNIHOTRI (AIR-1).png',
    },
  ];

  const displayToppers = [...toppers, ...toppers, ...toppers, ...toppers, ...toppers, ...toppers, ...toppers, ...toppers];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || prefersReducedMotion) return;

    let rafId: number;
    let lastTime = performance.now();
    let scrollPos = 0;

    const speed = 55;

    const step = (time: number) => {
      if (!isPaused) {
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        scrollPos += speed * delta;
        el.scrollLeft = scrollPos;

        const halfWidth = el.scrollWidth / 2;

        if (scrollPos >= halfWidth) {
          scrollPos = 0;
          el.scrollLeft = 0;
        }
      } else {
        lastTime = time;
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [isPaused, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[600px] flex flex-col items-center justify-center py-20 px-0 md:px-0 lg:px-0 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/our-centers/centers-bg.png"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center">
        <div className="our-toppers-heading text-center mb-4">
          <h2 className="global-section-heading">OUR TOPPERS</h2>
        </div>

        <p className="our-toppers-heading text-center text-[#2A3742] font-medium max-w-[800px] mx-auto text-[14px] md:text-[16px] leading-relaxed mb-12 font-['Montserrat'] px-6">
          Driven by a commitment to success, we stand behind our toppers with constant support, expert mentorship, and personalized attention.
        </p>

        <div
          ref={scrollRef}
          className="w-full mt-12 overflow-x-hidden flex gap-10 pb-8 px-10 md:px-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {displayToppers.map((topper, idx) => (
            <div
              key={idx}
              className="our-toppers-card flex-shrink-0 flex flex-col items-center w-[260px]"
            >
              <div className="relative w-[240px] h-[270px] mb-4 rounded-[36px] overflow-hidden bg-[linear-gradient(135deg,#0087D5_0%,#E45562_100%)] shadow-[0_16px_35px_rgba(0,0,0,0.18)]">
                <div className="absolute inset-[8px] rounded-[30px] overflow-hidden">
                  <Image
                    src={`/assets/ourtoppers/_originals/${topper.img}`}
                    alt={topper.name}
                    fill
                    sizes="240px"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>

              <h3 className="text-white text-[16px] font-bold mb-2 text-center min-h-[40px]">
                {topper.name}
              </h3>

              <span className="bg-[#FF9800] text-white text-[15px] font-semibold py-2 px-8 rounded-full mb-2">
                {topper.rank}
              </span>

              <span className="text-white text-[13px] opacity-90 text-center">
                {topper.course}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurToppers;