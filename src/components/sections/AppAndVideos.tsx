'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useInViewport from '@/hooks/useInViewport';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const AppAndVideos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInViewport = useInViewport(sectionRef, { threshold: 0.2 });
  const prefersReducedMotion = usePrefersReducedMotion();

 const videos = [
  { id: 1, title: 'The Hindu Daily Current Affairs', image: '/assets/youtube_video_image.png', author: 'Saurabh Tripathi' },
  { id: 2, title: 'History NCERT (6-12)', image: '/assets/youtube_video_image.png', author: 'Team Sriram' },
  { id: 3, title: 'Complete Modern History', image: '/assets/youtube_video_image.png', author: 'Expert Faculty' },
];

  useEffect(() => {
    if (isPaused || prefersReducedMotion || !isInViewport) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [isInViewport, isPaused, prefersReducedMotion, videos.length]);

  useGSAP(() => {
    if (prefersReducedMotion) {
      return;
    }

    gsap.fromTo(
      '.download-app-element',
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
        force3D: true,
        scrollTrigger: {
          trigger: '.download-app-trigger',
          start: 'top 50%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.download-app-hand-inner',
      { x: 300, opacity: 0, scaleX: -1 },
      {
        x: 0,
        opacity: 1,
        scaleX: -1,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5,
        force3D: true,
        scrollTrigger: {
          trigger: '.download-app-trigger',
          start: 'top 50%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.youtube-trigger h2',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: '.youtube-trigger',
          start: 'top 60%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.youtube-carousel',
      { y: 100, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
        force3D: true,
        scrollTrigger: {
          trigger: '.youtube-carousel',
          start: 'top 60%',
          once: true,
        },
      }
    );
  }, { dependencies: [prefersReducedMotion], scope: sectionRef });

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if ('touches' in e) {
      touchStartX.current = e.touches[0].clientX;
    } else {
      touchStartX.current = (e as React.MouseEvent).clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartX.current === null) return;

    let touchEndX: number;
    if ('changedTouches' in e) {
      touchEndX = e.changedTouches[0].clientX;
    } else {
      touchEndX = (e as React.MouseEvent).clientX;
    }

    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }

    touchStartX.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 20) {
        handleNext();
      } else if (e.deltaX < -20) {
        handlePrev();
      }
    }
  };

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      {/* ================= DOWNLOAD APP SECTION ================= */}
      <section className="download-app-trigger relative w-full overflow-hidden py-32 md:py-12 bg-gradient-to-br from-[#F2FBFF] via-white to-[#F9FAFB]">
        <div className="absolute top-10 left-[-10%] w-[50vw] h-[50vw] bg-[#20A0E0]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-[-10%] w-[40vw] h-[40vw] bg-[#E16165]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-8 z-10">
              <h2 className="global-section-heading whitespace-nowrap">
                Download Our App
              </h2>

              <p className="download-app-element text-gray-600 max-w-xl text-lg md:text-xl leading-relaxed">
                Download our app to access high-quality learning resources, daily quizzes,
                current affairs updates, and expert guidance anytime, anywhere.
                Prepare smarter and stay connected with your learning journey.
              </p>

              {/* CHANGED: QR block updated to use only image, no white card background */}
              <div className="download-app-element flex flex-col items-start gap-8">
               <div className="flex flex-row -space-x-6 md:-space-x-10">
                 <div className="flex flex-col items-center gap-0">
                  {/* QR */}
                  <img
                    src="/assets/Qr_code.svg"
                    alt="QR Code IOS"
                    className="w-[220px] md:w-[260px] h-auto object-contain block"
                  />

                  {/* Scan Button */}
                <div className="relative -mt-[-1] cursor-pointer">
                  {/* top triangle */}
                  <div className="mx-auto mt-[10px]  w-0 h-0 border-l-[14px] border-r-[14px] border-b-[14px] border-l-transparent border-r-transparent border-b-[#17A8E3]" />

                  {/* button */}
                  <div
                    className="w-[145px] md:w-[165px] h-[42px] md:h-[46px] rounded-b-[14px] rounded-t-[5px] flex items-center justify-center text-white font-bold text-[18px] md:text-[22px] tracking-wide cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(90deg, #18B7E8 0%, #2E73D5 100%)",
                    }}
                  >
                    SCAN
                  </div>
                </div>
                </div>

                  <div className="flex flex-col items-center gap-0">
              {/* QR */}
              <img
                src="/assets/Qr_code.svg"
                alt="QR Code IOS"
                className="w-[220px] md:w-[260px] h-auto object-contain block"
              />

              {/* Scan Button */}
             <div className="relative -mt-[-1] cursor-pointer">
                {/* top triangle */}
                <div className="mx-auto mt-[10px]  w-0 h-0 border-l-[14px] border-r-[14px] border-b-[14px] border-l-transparent border-r-transparent border-b-[#17A8E3]" />

                {/* button */}
                <div
                  className="w-[145px] md:w-[165px] h-[42px] md:h-[46px] rounded-b-[14px] rounded-t-[5px] flex items-center justify-center text-white font-bold text-[18px] md:text-[22px] tracking-wide cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(90deg, #18B7E8 0%, #2E73D5 100%)",
                  }}
                >
                  SCAN
                </div>
              </div>
            </div>
                </div>
              </div>

              {/* STORE BUTTONS */}
              {/* CHANGED: gap-18 replaced with gap-[18px] */}
              <div className="flex flex-row gap-[18px] flex-wrap">
                <button className="bg-black text-white px-8 py-4 rounded-xl flex items-center gap-4 hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                  <img src="/assets/playstore.svg" alt="Google Play" className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-60 font-bold uppercase">Get it on</p>
                    <p className="text-lg font-bold leading-none">Google Play</p>
                  </div>
                </button>

                <button className="bg-black text-white px-8 py-4 rounded-xl flex items-center gap-4 hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.24-1.99 1.1-3.15-1.02.04-2.25.68-2.98 1.54-.66.76-1.24 1.93-1.09 3.07 1.14.09 2.24-.63 2.97-1.46z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] opacity-60 font-bold uppercase">Download on the</p>
                    <p className="text-lg font-bold leading-none">App Store</p>
                  </div>
                </button>
              </div>
            </div>

            {/* CHANGED: removed one extra closing </div> here */}
            {/* RIGHT SIDE CONTINUOUS ORBITAL ANIMATION & HAND */}
            <div className="download-app-hand relative hidden lg:flex items-center justify-center">
              <div className="relative w-[550px] h-[550px] xl:w-[700px] xl:h-[700px] shrink-0 flex items-center justify-center mt-12">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#E1F3FC] to-white/20 shadow-[0_0_50px_rgba(32,160,224,0.15)] blur-[2px]" />
                <div className="absolute inset-10 xl:inset-14 rounded-full bg-gradient-to-br from-[#CEEAF9] to-[#E6F5FD] shadow-[inset_0_4px_20px_rgba(255,255,255,0.8)]" />
                <div className="absolute inset-20 xl:inset-28 rounded-full bg-white shadow-[0_10px_30px_rgba(32,160,224,0.1)] z-10" />

                <div className="absolute inset-0 z-20" style={{ animation: 'spin 18s linear infinite reverse' }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-[#E16165] rounded-full shadow-[0_0_20px_rgba(225,97,101,0.8)]" />
                </div>

                <div className="absolute inset-10 xl:inset-14 z-20" style={{ animation: 'spin 25s linear infinite' }}>
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3.5 h-3.5 bg-[#D9F400] rounded-full shadow-[0_0_12px_rgba(217,244,0,0.8)]" />
                </div>

                <div className="absolute inset-20 xl:inset-28 z-20" style={{ animation: 'spin 12s linear infinite' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#20A0E0] rounded-full shadow-[0_0_15px_rgba(32,160,224,0.8)]" />
                </div>

                <div className="download-app-hand-inner absolute z-30 w-[450px] xl:w-[700px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)] -bottom-16 xl:-bottom-[10%] right-[-30%] translate-x-4">
                  <img
                    src="/assets/hand.png"
                    alt="App Mockup"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= YOUTUBE VIDEOS ================= */}
      <div className="youtube-trigger py-32 space-y-16">
        <div className="text-center">
          <h2 className="global-section-heading">
            YOUTUBE VIDEOS
          </h2>
        </div>

        <div className="youtube-carousel relative group max-w-[1440px] mx-auto px-6 md:px-16">
          <div
            className="absolute -top-40 -right-20 w-[600px] h-[600px] pointer-events-none opacity-40 mix-blend-multiply"
            style={{
              background: 'linear-gradient(181.87deg, rgba(201, 149, 61, 0.4) -157.44%, rgba(192, 138, 44, 0.384) -157.4%, rgba(190, 132, 32, 0.268) 216.94%, rgba(246, 166, 28, 0.32) 216.94%)',
              filter: 'blur(100px)'
            }}
          />
          <div
            className="absolute -bottom-40 -left-20 w-[600px] h-[600px] pointer-events-none opacity-40 mix-blend-multiply"
            style={{
              background: 'linear-gradient(181.87deg, rgba(201, 149, 61, 0.4) -157.44%, rgba(192, 138, 44, 0.384) -157.4%, rgba(190, 132, 32, 0.268) 216.94%, rgba(246, 166, 28, 0.32) 216.94%)',
              filter: 'blur(100px)'
            }}
          />

          <div
            className="relative h-[350px] md:h-[450px] lg:h-[450px] w-full flex items-center justify-center py-12 px-10 z-10 touch-pan-y"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={(e) => { setIsPaused(true); handleTouchStart(e); }}
            onTouchEnd={(e) => { setIsPaused(false); handleTouchEnd(e); }}
            onMouseDown={(e) => { setIsPaused(true); handleTouchStart(e); }}
            onMouseUp={(e) => { setIsPaused(false); handleTouchEnd(e); }}
            onWheel={handleWheel}
          >
            {videos.map((video, idx) => {
              let position = idx - activeIndex;
              if (position < -1) position += videos.length;
              if (position > 1) position -= videos.length;

              const isActive = position === 0;
              const isLeft = position === -1;
              const isRight = position === 1;

              let transformStyle = '';
              let zIndex = 0;
              let opacity = 0;

              if (isActive) {
                transformStyle = 'translateX(0) scale(0.95)';
                zIndex = 30;
                opacity = 1;
              } else if (isLeft) {
                transformStyle = 'translateX(-50%) scale(0.7)';
                zIndex = 20;
                opacity = 0.6;
              } else if (isRight) {
                transformStyle = 'translateX(55%) scale(0.8)';
                zIndex = 20;
                opacity = 0.6;
              } else {
                transformStyle = 'translateX(0) scale(0.5)';
                zIndex = 10;
                opacity = 0;
              }

              return (
                <div
                  key={video.id}
                  onClick={() => setActiveIndex(idx)}
                  className="absolute w-[380px] md:w-[700px] lg:w-[750px] cursor-pointer transition-[transform,opacity] duration-700 ease-out will-change-transform"
                  style={{
                    transform: transformStyle,
                    zIndex,
                    opacity,
                  }}
                >
                  <div className="relative aspect-[16/9] rounded-[1.75rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.4)] transition-colors duration-500">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/assets/youtube_video_image.png';
                      }}
                    />

                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-500 ${isActive ? 'scale-100 opacity-100 hover:scale-110' : 'scale-50 opacity-0'}`}>
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg viewBox="0 0 68 48" className="w-full h-full drop-shadow-xl">
                          <path
                            d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                            fill="#FF0000"
                          />
                          <path d="M27.31 34.33V13.67L45.47 24z" fill="#FFF" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 lg:left-24 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] opacity-0 group-hover:opacity-100 transition-all hover:-translate-x-1 hover:scale-110 z-40 hidden md:block"
          >
            <ChevronLeft size={20} className="text-gray-800" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 lg:right-24 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] opacity-0 group-hover:opacity-100 transition-all hover:translate-x-1 hover:scale-110 z-40 hidden md:block"
          >
            <ChevronRight size={20} className="text-gray-800" />
          </button>

          <div className="flex justify-center gap-3 mt-8 relative z-30">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-10 bg-[#0E9BD8]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppAndVideos;