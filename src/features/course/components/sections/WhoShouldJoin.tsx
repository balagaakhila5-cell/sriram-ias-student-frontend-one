'use client';

import React, { useRef } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  course: CourseData;
}

const WhoShouldJoin: React.FC<Props> = ({ course }) => {
  const city = course.city || 'delhi';
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.who-join-heading',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        }
      }
    );

    gsap.fromTo('.who-join-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.who-join-card',
          start: 'top 85%',
          once: true,
        }
      }
    );

    gsap.fromTo('.who-join-image',
      { x: -100, opacity: 0, scale: 0.95 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          once: true,
        }
      }
    );
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  // Fallback personas if data is missing
  const personas = course.personas.length > 0 ? course.personas : [
    { image: '/assets/why-should/1st.png', label: 'College Students in\nFinal or Pre-Final Years' },
    { image: '/assets/why-should/2nd.png', label: 'Working Professionals\nPlanning an Early Start' },
    { image: '/assets/why-should/3rd.png', label: 'Serious Aspirants\nLooking for a Guided,\nLong-Term Preparation Plan' },
    { image: '/assets/why-should/4th.png', label: 'Beginners Who Wish\nto Build from Basics\nwith Expert Support' }
  ];

  const highlightedText = course.subtitle || "2-Years General Studies Comprehensive Course?";

  if (city === 'pune') {
    return (
      <section
        ref={containerRef}
        className="w-full py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden font-['Montserrat',sans-serif]"
        style={{
          background: 'linear-gradient(180deg, rgba(193, 133, 79, 0.5) 0%, rgba(74, 35, 0, 0.8) 100%)',
        }}
      >
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center relative z-10">

          <div className="who-join-image w-full lg:w-[45%] flex justify-center lg:justify-start shrink-0 relative h-[380px] md:h-[480px]">

            <img
              src="/assets/why-should/why-should-pune-globe.png"
              alt="Globe and books"
              className="absolute top-0 left-0 md:left-4 w-[260px] md:w-[380px] h-[260px] md:h-[380px] object-cover shadow-xl"
              style={{
                borderRadius: '180px 0 180px 0',
              }}
            />

            <img
              src="/assets/why-should/why-should-pune-person.png"
              alt="Students studying"
              className="absolute bottom-4 md:bottom-12 right-0 md:right-4 w-[200px] md:w-[280px] h-[200px] md:h-[280px] object-cover rounded-full shadow-2xl z-10"
            />
          </div>

          <div className="w-full lg:w-[55%] flex flex-col pl-0 lg:pl-8">
            <h2 className="who-join-heading text-[28px] md:text-[36px] lg:text-[42px] font-extrabold text-white mb-10 leading-[1.2]">
              Who Should{' '}
              <span className="text-[#5092B5]">
                Join {highlightedText}
              </span>
            </h2>

            <div className="space-y-6">
              {personas.map((persona, i) => (
                <div key={i} className="who-join-card flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-[10px]"></span>
                  <p className="text-[15px] md:text-[17px] text-white font-medium leading-relaxed">
                    {persona.label.replace(/\n/g, ' ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="w-full py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden font-['Montserrat',sans-serif] bg-white"
    >

      <div
        className="absolute -top-32 -left-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#F0F5FD] rounded-full z-0 pointer-events-none"
      />

      <div
        className="absolute -bottom-48 -right-24 w-[500px] h-[500px] md:w-[900px] md:h-[900px] bg-[#F0F5FD] rounded-full z-0 pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">

        <h2 className="who-join-heading text-[28px] md:text-[36px] lg:text-[40px] font-extrabold text-[#555555] mb-12 text-center max-w-4xl leading-tight font-[Montserrat]">
          Who Should <span className="text-[#E4A95A]">Join {highlightedText}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
          {personas.map((persona, i) => (
            <div
              key={i}
              className="who-join-card flex flex-col items-center gap-5 text-center group"
            >
              <div className="w-full overflow-hidden rounded-[20px] shadow-[0px_10px_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0px_15px_40px_rgba(0,0,0,0.2)] transition-shadow duration-300 bg-white">
                <img
                  src={persona.image}
                  alt="Persona profile"
                  className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <p className="text-[14px] md:text-[15px] font-bold text-[#1A1A1A] font-[Montserrat] leading-relaxed whitespace-pre-line px-2">
                {persona.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhoShouldJoin;