'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useInViewport from '@/hooks/useInViewport';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const MottoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(sectionRef, { threshold: 0.2 });

  const gradientStyle = {
    backgroundImage:
      'linear-gradient(90deg, rgba(225, 97, 101, 0.8) 0%, #20A0E0 100%)',
  };

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      gsap.from('.motto-text-line', {
        x: -100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          once: true,
        },
      });

      gsap.fromTo(
        '.motto-wall',
        { x: '100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 1.8,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        },
      );
    },
    { dependencies: [prefersReducedMotion], scope: sectionRef },
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (prefersReducedMotion || !isInViewport) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Ignore autoplay rejections.
    });
  }, [isInViewport, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F6EEE4] overflow-hidden min-h-[430px] sm:min-h-[520px] md:min-h-[620px] flex items-center py-8 sm:py-10 md:py-12"
    >
      {/* RIGHT WALL IMAGE */}
      <div className="motto-wall absolute top-0 right-0 w-full md:w-[68%] lg:w-[68%] h-full z-0 pointer-events-none">
        <div className="relative w-full h-full">
          <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-[#F6EEE4] via-[#F6EEE4]/40 to-transparent z-10" />

          <Image
            src="/assets/wall_text.png"
            alt="Motto Wall"
            fill
            sizes="(max-width: 790px) 100vw, 68vw"
            className="object-cover object-left"
          />
        </div>
      </div>

      {/* LEFT CONTENT */}
      <div className="relative z-10 w-full max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="w-full md:w-[62%] lg:w-[66%] xl:w-[68%]">
          <div className="font-['Montserrat'] font-bold text-[24px] sm:text-[34px] md:text-[46px] lg:text-[58px] xl:text-[64px] leading-[1.08] tracking-[0%]">
            
            {/* LINE 1: LOGO + IN SHAPING */}
<div className="motto-text-line flex items-start gap-0 sm:gap-1 md:gap-2 mb-3">
  <div className="relative shrink-0 w-[135px] h-[115px] sm:w-[155px] sm:h-[125px] md:w-[185px] md:h-[145px] lg:w-[225px] lg:h-[170px] xl:w-[255px] xl:h-[190px]">
    <Image
      src="/assets/40_years_experience.png"
      alt="40 Years Logo"
      fill
      sizes="255px"
      className="object-contain"
      priority
    />
  </div>

  <span className="text-[#00000099] whitespace-nowrap mt-[54px] sm:mt-[68px] md:mt-[84px] lg:mt-[100px] xl:mt-[112px] -ml-8">
  In shaping
</span>
</div>
            {/* LINE 2: OFFICERS + NOW IT'S */}
            <div className="motto-text-line flex items-center gap-4 mb-2">
              <span
                className="inline-block bg-clip-text text-transparent whitespace-nowrap"
                style={gradientStyle}
              >
                Officers
              </span>

              <span className="text-[#00000099] whitespace-nowrap">
                Now it&apos;s
              </span>
            </div>

            {/* LINE 3: YOUR TURN TO SERVE */}
            <div className="motto-text-line flex items-center gap-4 mb-2">
              <span className="text-[#00000099] whitespace-nowrap">
                your turn to
              </span>

              <span
                className="inline-block bg-clip-text text-transparent whitespace-nowrap"
                style={gradientStyle}
              >
                serve
              </span>
            </div>

            {/* LINE 4: THE NATION */}
            <div className="motto-text-line flex items-center gap-4">
              <span className="text-[#00000099] whitespace-nowrap">
                the
              </span>

              <span
                className="inline-block bg-clip-text text-transparent whitespace-nowrap"
                style={gradientStyle}
              >
                nation
              </span>
            </div>
          </div>

          <div className="motto-text-line mt-7 sm:mt-8 md:mt-9">
            <button
              className="text-white font-['Montserrat'] font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px] flex items-center justify-center gap-[14px] rounded-[12px] w-full max-w-[500px] h-[48px] sm:h-[56px] md:h-[64px] px-[18px] py-[10px] hover:scale-[1.02] hover:brightness-110 transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #00679C 0%, #002436 100%)',
                boxShadow: '0px 4px 32px 0px #0000001A',
                opacity: 1,
              }}
            >
              Start Your UPSC CSE Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MottoSection;