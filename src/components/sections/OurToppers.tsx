'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import useInViewport from '@/hooks/useInViewport';

gsap.registerPlugin(ScrollTrigger);

const OurToppers: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(containerRef, { threshold: 0.1 });

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.from('.our-toppers-heading', {
      y: 70,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        once: true,
      }
    });

    gsap.from('.our-toppers-card', {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      stagger: { each: 0.03, from: "center" },
      ease: 'back.out(1.2)',
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%',
        once: true,
      }
    });
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  const toppers = [
    { name: 'ANUJ AGNIHOTRI',        rank: 'AIR 01', course: 'GS Foundation Course', img: 'ANUJ-AGNIHOTRI (AIR-1).png' },
  ];

  const numSets = 5;
  const displayToppers = Array(numSets).fill(toppers).flat();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const timeoutId = setTimeout(() => {
      const oneSetWidth = scrollContainer.scrollWidth / numSets;
      if (oneSetWidth > 0 && scrollContainer.scrollLeft === 0) {
        scrollContainer.scrollLeft = oneSetWidth * 2;
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const shouldAutoScroll = isInViewport && !isPaused && !prefersReducedMotion;

    if (!scrollContainer || !shouldAutoScroll) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let currentScroll = scrollContainer.scrollLeft;
    const speed = 50;

    const normalizeScrollPosition = () => {
      const oneSetWidth = scrollContainer.scrollWidth / numSets;
      if (oneSetWidth <= 0) return;

      if (currentScroll >= oneSetWidth * 3) {
        currentScroll -= oneSetWidth;
        scrollContainer.scrollLeft = currentScroll;
      } else if (currentScroll <= oneSetWidth * 1) {
        currentScroll += oneSetWidth;
        scrollContainer.scrollLeft = currentScroll;
      }
    };

    const scroll = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      const cappedDelta = Math.min(deltaTime, 0.1);
      currentScroll += speed * cappedDelta;
      scrollContainer.scrollLeft = currentScroll;
      normalizeScrollPosition();
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleManualScroll = () => {
      currentScroll = scrollContainer.scrollLeft;
    };

    scrollContainer.addEventListener('scroll', handleManualScroll, { passive: true });
    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('scroll', handleManualScroll);
    };
  }, [isInViewport, isPaused, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Decorative glow */}
      <div
        className="absolute top-1/4 right-[-80px] -translate-y-1/2 w-[140px] h-[140px] bg-white rounded-l-full z-10 pointer-events-none"
        style={{ boxShadow: '0px 0px 120px 20px rgba(91, 178, 229, 0.7)' }}
      />

      {/* Background */}
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

        <p className="our-toppers-heading text-center text-[#2A3742] font-medium max-w-[800px] mx-auto text-[14px] md:text-[16px] leading-relaxed mb-12 font-['Montserrat']">
          Driven by a commitment to success, we stand behind our toppers with constant support, expert mentorship, and personalized attention to help them lead the way in every phase of the UPSC process.
        </p>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto no-scrollbar flex gap-8 pb-8 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {displayToppers.map((topper, idx) => (
            <div key={idx} className="our-toppers-card shrink-0">
              <div className="flex flex-col items-center min-w-[200px] px-4 py-4 cursor-pointer">

                {/* Image — square container + object-contain shows full shape uniformly */}
                <div className="relative w-[230px] h-[280px] mb-4 flex-shrink-0">
                  <Image
                    src={`/assets/ourtoppers/_originals/${topper.img}`}
                    alt={topper.name}
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </div>

                {/* Name */}
                <h3 className="text-white text-[16px] font-bold font-['Montserrat'] mb-2 drop-shadow-sm text-center">
                  {topper.name}
                </h3>

                {/* Rank */}
                <span className="bg-[#FF9800] text-white text-[15px] font-semibold py-2 px-8 rounded-full mb-2 shadow-md font-['Montserrat']">
                  {topper.rank}
                </span>

                {/* Course */}
                <span className="text-white text-[13px] opacity-90 font-medium font-['Montserrat'] text-center">
                  {topper.course}
                </span>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurToppers;
