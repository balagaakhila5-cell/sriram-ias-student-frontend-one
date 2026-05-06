'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const toppers = [
  {
    name: 'AAKASH GARG',
    rank: 'AIR 5',
    course: 'GS Foundation Course',
    img: 'AAKASH GARG(AIR-5).png',
  },
  {
    name: 'ABHI JAIN',
    rank: 'AIR 34',
    course: 'GS Foundation Course',
    img: 'ABHI JAIN(AIR-34).png',
  },
  {
    name: 'ABHISHEK SHARMA',
    rank: 'AIR 38',
    course: 'GS Foundation Course',
    img: 'ABHISHEK-SHARMA-(AIR-38).png',
  },
];

const duplicatedToppers = [
  ...toppers,
  ...toppers,
  ...toppers,
  ...toppers,
  ...toppers,
  ...toppers,
];

const OurToppers: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (!prefersReducedMotion) {
        gsap.from('.our-toppers-heading', {
          y: 70,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        });
      }

      const track = trackRef.current;
      if (!track || prefersReducedMotion) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 38,
        ease: 'none',
      });

      const pause = () => tween.pause();
      const play = () => tween.play();

      track.addEventListener('mouseenter', pause);
      track.addEventListener('mouseleave', play);

      return () => {
        tween.kill();
        track.removeEventListener('mouseenter', pause);
        track.removeEventListener('mouseleave', play);
      };
    },
    { dependencies: [prefersReducedMotion], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[600px] flex flex-col items-center justify-start pt-6 pb-10 px-0 overflow-visible"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/assets/our-centers/centers-bg.png"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover scale-[1.25]"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center overflow-visible">
        {/* HEADING MOVED DOWN */}
        <div className="our-toppers-heading text-center mb-2 mt-10">
          <h2 className="global-section-heading">OUR TOPPERS</h2>
        </div>

        <p className="our-toppers-heading text-center text-[#2A3742] font-medium max-w-[800px] mx-auto text-[14px] md:text-[16px] leading-relaxed mb-0 font-['Montserrat'] px-6">
          Driven by a commitment to success, we stand behind our toppers with constant support,
          expert mentorship, and personalized attention.
        </p>

        {/* SCROLL AREA - no hidden wall */}
        <div className="w-full relative overflow-visible mt-[-20px] pb-6">
          <div
            ref={trackRef}
            className="flex gap-8 w-max will-change-transform overflow-visible"
          >
            {duplicatedToppers.map((topper, idx) => (
              <div
                key={`${topper.name}-${idx}`}
                className="our-toppers-card min-w-[300px] w-[300px] flex-shrink-0 flex flex-col items-center overflow-visible"
              >
               <div className="relative mt-[-170px] w-[520px] h-[650px] mb-[-25px] overflow-visible">
              <Image
                src={`/assets/ourtoppers/_originals/${topper.img}`}
                alt={topper.name}
                fill
                sizes="520px"
                className="object-contain object-bottom"
                priority={idx < 4}
              />
            </div>

                <h3 className="text-white text-[16px] font-bold mb-2 text-center min-h-[30px] max-w-[300px]">
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
      </div>
    </section>
  );
};

export default OurToppers;