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

const HowWillHelp: React.FC<Props> = ({ course }) => {
  const points = course.helpPoints.length > 0 ? course.helpPoints : ['Coming soon...'];
  const city = course.city || 'delhi';
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  console.log(course);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    // Heading
    gsap.fromTo(
      '.how-help-heading',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Points/List
    gsap.fromTo(
      '.how-help-point',
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.how-help-point',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Images
    gsap.fromTo(
      '.how-help-image',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 10%',
          once: true,
        },
      }
    );
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  // Using the exact paths from your code
  const images = [
    course.helpImages?.[0] || '/assets/why-choose/how-will-1.png',
    '/assets/why-choose/face-video.mp4',
    course.helpImages?.[2] || '/assets/why-choose/how-will-3.png',
    course.helpImages?.[3] || '/assets/why-choose/how-will-4.png',
  ];

  // ── HYDERABAD LAYOUT ──────────────────────────────────────────────────
  if (city === 'hyderabad') {
    return (
      <section
        ref={containerRef}
        /* FIX: Changed py-16 to pt-16 pb-28 lg:pb-36 to give the hanging image room to breathe so it doesn't get cut off */
        className="w-full pt-16 pb-28 lg:pb-36 px-6 md:px-12 lg:px-24 relative overflow-hidden font-['Montserrat',sans-serif]"
        style={{
          background: 'linear-gradient(137.58deg, rgba(24, 151, 216, 0.8) 0.26%, #021C29 70.14%)',
        }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col relative z-10">
          {/* HEADER SEPARATED: Spans across the top */}
          <div className="w-full mb-12">
            <h2 className="how-help-heading text-[28px] md:text-[40px] lg:text-[40px] font-extrabold text-white leading-tight">
              How Will the General Studies{' '}
              <span className="text-[#D2CE06] font-extrabold text-[28px] md:text-[40px] lg:text-[40px]">
                {course.title} Help You?
              </span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center w-full">
            {/* LEFT SIDE (List items) */}
            <div className="w-full lg:w-[55%] flex flex-col relative z-10">
              <div className="space-y-6">
                {points.map((point, i) => (
                  <div key={i} className="how-help-point group flex items-start gap-4 cursor-pointer">
                    <div className="shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full bg-[#FFFFFF] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <img src="/assets/how-will/how-right-arrow.png" alt="how-right-arrow" />
                      </div>
                    </div>
                    <p className="text-[14px] md:text-[20px] text-white/90 font-semibold leading-relaxed group-hover:translate-x-2 transition-transform duration-300">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE (Untouched Original Code) */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative mt-8 lg:mt-0">
              <div className="relative w-[350px] h-[350px] md:w-[420px] md:h-[420px]">
                <div className="how-help-image absolute top-0 right-0 w-[200px] h-[200px] md:w-[240px] md:h-[300px] md:w-full md:h-full rounded-full overflow-hidden shadow-2xl z-10">
                  <video
                    src={images[1]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="auto"
                    className="w-full aspect-[3/4] object-cover shadow-md border border-black/5 bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="how-help-image absolute bottom-[-15%] left-[-40%] w-[180px] h-[180px] md:w-[350px] md:h-[220px] rounded-br-[140px] rounded-tl-[140px] rounded-tr-[140px] rounded-bl-[140px] overflow-hidden shadow-2xl z-20">
                  <img
                    src={images[0]}
                    alt="Globe and microscope"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* END RIGHT SIDE */}

          </div>
        </div>
      </section>
    );
  }

  // ── PUNE LAYOUT ────────────────────────────────────────────────────────
  if (city === 'pune') {
    return (
      <section
        ref={containerRef}
        className="w-full pt-16 pb-0 px-6 md:px-12 lg:px-24 relative overflow-hidden font-['Montserrat',sans-serif]"
        style={{ background: 'linear-gradient(135deg, #E6F0F9 0%, #F5F9FA 40%, #FFFFFF 100%)' }}
      >
        <style>{`
          @keyframes orbitSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes counterOrbitSpin {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-orbit-ring {
            animation: orbitSpin 20s linear infinite;
          }
          .animate-orbit-icon {
            animation: counterOrbitSpin 20s linear infinite; 
          }
        `}</style>

        

        <div
          className="absolute -top-[0px] md:-top-[200px] -right-[0px] md:-right-[200px] w-[100px] h-[100px] md:w-[350px] md:h-[350px] rounded-full pointer-events-none z-0"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0px 4px 250px 0px #5BB2E5'
          }}
        />

        <div
          className="absolute top-[50%] -left-60 w-64 h-64 md:w-[300px] md:h-[300px] bg-white rounded-full z-0 pointer-events-none"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0px 4px 250px 0px #5BB2E5'
          }}
        />

        <div className="max-w-[1300px] mx-auto flex flex-col relative z-10">
          
          {/* HEADER SEPARATED: Spans across the top */}
          <div className="w-full mb-10 md:mb-12">
            <h2 className="how-help-heading text-[28px] md:text-[36px] lg:text-[40px] font-extrabold text-[#757575] leading-[1.3]">
              How Will the General Studies{' '}
              <span className="text-[#C4D600]">
                {course.title} Help You?
              </span>
            </h2>
          </div>

          {/* FIX 1: Changed to relative wrapper so the absolute right-side image anchors to it */}
          <div className="relative flex flex-col lg:block w-full">
            
            {/* LEFT SIDE: Text dictates the height of the section */}
            <div className="w-full lg:w-[55%] flex flex-col relative z-10 pb-16 lg:pb-24">
              <div className="space-y-6">
                {points.map((point, i) => (
                  <div key={i} className="how-help-point group flex items-center md:items-start gap-5 cursor-pointer">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-[#EDF5FC] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3.5 8.5L6.5 11.5L13 4.5" stroke="#4A90E2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-[15px] md:text-[18px] text-[#00000099] font-semibold leading-relaxed max-w-[90%] group-hover:translate-x-2 transition-transform duration-300">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FIX 2: Made RIGHT SIDE 'absolute' on desktop. It will no longer push the section height down! */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative lg:absolute lg:bottom-0 lg:right-0 lg:h-full z-10 pointer-events-none">
              <div className="relative flex items-end justify-center w-full lg:h-full">
                
                <div className="absolute bottom-[10%] md:bottom-[0%] right-0 md:right-4 w-[320px] h-[320px] md:w-[450px] md:h-[450px] bg-[#F4F2F8] rounded-full z-0">
                  
                  <div className="absolute inset-0 rounded-full animate-orbit-ring">
                    
                    <div className="absolute left-[-10px] md:left-[-20px] top-[45%] w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#EBF7E5] flex items-center justify-center shadow-sm z-20">
                      <div className="animate-orbit-icon flex items-center justify-center w-full h-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.26l5.08 5.08" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute right-[15px] top-[20%] w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center shadow-sm z-20">
                      <div className="animate-orbit-icon flex items-center justify-center w-full h-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D84315" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute right-[-10px] bottom-[25%] w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFEBEE] flex items-center justify-center shadow-sm z-20">
                      <div className="animate-orbit-icon flex items-center justify-center w-full h-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      </div>
                    </div>

                  </div>
                </div>

                {/* FIX 3: Added max-h-[110%] so if the text is short, the image naturally shrinks down to fit the bounds */}
                <img
                  src="/assets/how-will/how-person.png"
                  alt="Student"
                  className="w-[280px] md:w-[360px] lg:w-[450px] lg:max-h-[110%] h-auto object-contain object-bottom relative z-10 block pointer-events-auto"
                  style={{ marginBottom: '-2px' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── DELHI LAYOUT (Default) ─────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="w-full py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden font-['Montserrat',sans-serif]"
      style={{
        backgroundImage: "url('/assets/why-choose/how-will-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <style>{`
        @keyframes floatShape {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes floatShapeReverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(14px); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.4; }
          50% { transform: translateY(-50%) scale(1.06); opacity: 0.65; }
        }
        @keyframes pulseRingInner {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.6; }
          50% { transform: translateY(-50%) scale(1.08); opacity: 0.85; }
        }
        .shape-float { animation: floatShape 6s ease-in-out infinite; }
        .shape-float-rev { animation: floatShapeReverse 7s ease-in-out infinite; }
        .ring-pulse { animation: pulseRing 5s ease-in-out infinite; }
        .ring-pulse-inner { animation: pulseRingInner 5s ease-in-out infinite 0.5s; }
      `}</style>
      <img
        src="/assets/how-will/How-will-left-bg.png"
        alt="Background decoration left"
        className="absolute top-0 left-0 h-full w-auto object-contain pointer-events-none z-0 opacity-40 mix-blend-multiply"
        style={{
          maskImage: 'linear-gradient(to right, black 60%, transparent 100%), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />
      <div className="shape-float absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#F4E9D8] rounded-br-[100px] z-0 pointer-events-none" />
      <div className="shape-float-rev absolute top-0 right-0 w-24 h-24 md:w-36 md:h-36 bg-[#E8D9C5] rounded-bl-[100px] z-0 pointer-events-none" />
      <div className="shape-float absolute -bottom-16 -left-16 w-48 h-48 md:w-64 md:h-64 bg-[#E2C7A8] rounded-full z-0 pointer-events-none opacity-80" style={{ animationDelay: '1s' }} />
      <div className="ring-pulse absolute top-1/2 -translate-y-1/2 -left-32 w-[400px] h-[400px] border-[2px] border-[#D6B895] rounded-full z-0 pointer-events-none opacity-40" />
      <div className="ring-pulse-inner absolute top-1/2 -translate-y-1/2 -left-16 w-[250px] h-[250px] border-[2px] border-[#D6B895] rounded-full z-0 pointer-events-none opacity-60" />

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center relative z-10">
        <div className="w-full lg:w-[45%] relative shrink-0">
          <svg className="absolute top-1/2 -right-8 lg:-right-12 -translate-y-1/2 w-24 h-24 z-0 opacity-40 pointer-events-none" viewBox="0 0 100 100" fill="none">
            <path d="M 20 50 C 50 10, 90 20, 80 50 C 70 80, 40 90, 20 60" stroke="#B8A080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 15 50 L 20 60 L 30 55" stroke="#B8A080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex gap-3 md:gap-4 w-full relative z-10">
            <div className="how-help-image w-[45%] flex flex-col gap-3 md:gap-4 items-end justify-start">
              <img
                src={images[0]}
                alt="Study concept"
                className="w-full aspect-[4/5] object-cover shadow-md border border-black/5"
              />
              <img
                src={images[2]}
                alt="Writing notes"
                className="w-[85%] aspect-[4/3] object-cover shadow-md border border-black/5"
              />
            </div>

            <div className="how-help-image w-[55%] flex flex-col gap-3 md:gap-4 justify-start">
              <video
                src={images[1]}
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-[3/4] object-cover shadow-md border border-black/5"
              >
                Your browser does not support the video tag.
              </video>

              <img
                src={images[3]}
                alt="Student portrait"
                className="w-full aspect-[4/3] object-cover shadow-md border border-black/5"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] flex flex-col pt-4 relative z-10">
          <h2 className="how-help-heading text-[28px] md:text-4xl lg:text-4xl font-extrabold text-[#00000099] mb-8 leading-tight">
            How Will the General Studies{" "} <br />

            <span
              className="font-extrabold text-[28px] md:text-4xl leading-[48px] bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "Montserrat"
              }}
            >
              {course.title} Help You?
            </span>
          </h2>

          <div className="space-y-4">
            {points.map((point, i) => (
              <div
                key={i}
                className="how-help-point group flex items-stretch gap-4 bg-white rounded-xl px-5 py-4 shadow-[0px_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0px_6px_15px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-1.5 flex justify-center align-center shrink-0 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#888888] absolute top-1.5 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
                  <span className="w-1 bg-[#DDBA8F] rounded-full absolute top-0 bottom-0 opacity-0 group-hover:opacity-100 transform scale-y-0 group-hover:scale-y-100 origin-top transition-all duration-300 ease-out"></span>
                </div>

                <p className="text-[14px] md:text-[18px] text-[#00000099] font-semibold font-[Montserrat] leading-relaxed flex-1 self-center group-hover:text-[#00000099] group-hover:translate-x-2 transition-all duration-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWillHelp;