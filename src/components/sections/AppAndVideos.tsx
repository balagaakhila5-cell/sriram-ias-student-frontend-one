'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useInViewport from '@/hooks/useInViewport';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { useActiveYoutubeVideos } from '@/features/youtube/hooks/useActiveYoutubeVideos';
import { buildYouTubeEmbedUrl, getYouTubeVideoId } from '@/lib/youtube';

gsap.registerPlugin(ScrollTrigger);

type CarouselVideo = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  videoId: string;
  rank: number | null;
};

const PLACEHOLDER_THUMBNAIL = '/assets/youtube_video_image.png';
const VISIBLE_CARD_OFFSET = 2;

function YoutubeVideosSkeleton() {
  return (
    <div className="relative mx-auto flex h-[360px] max-w-[1440px] items-center justify-center px-6 md:h-[480px] md:px-16 lg:h-[520px]">
      <div className="grid w-full max-w-[700px] gap-4">
        <div className="aspect-[16/9] animate-pulse rounded-xl bg-gray-200" />
        <div className="mx-auto h-3 w-40 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

const AppAndVideos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInViewport = useInViewport(sectionRef, { threshold: 0.2 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const {
    data: youtubeData,
    isLoading: youtubeLoading,
    isError: youtubeError,
    error: youtubeQueryError,
  } = useActiveYoutubeVideos();

  const videos = useMemo(() => {
    return (youtubeData?.videos ?? [])
      .map((video) => {
        const videoId = video.youtubeVideoId ?? getYouTubeVideoId(video.youtubeUrl);
        if (!videoId || !video.youtubeUrl) return null;

        return {
          id: video.id,
          title: video.title,
          description: video.description,
          image: video.thumbnailUrl || PLACEHOLDER_THUMBNAIL,
          url: video.youtubeUrl,
          videoId,
          rank:
            video.rank < Number.MAX_SAFE_INTEGER && video.rank >= 1
              ? video.rank
              : null,
        } satisfies CarouselVideo;
      })
      .filter((video): video is CarouselVideo => video !== null);
  }, [youtubeData?.videos]);

  useEffect(() => {
    if (videos.length === 0) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex >= videos.length) {
      setActiveIndex(Math.min(2, Math.max(0, videos.length - 1)));
    }
  }, [activeIndex, videos.length]);

  const getCarouselPosition = (index: number) => {
    let position = index - activeIndex;
    while (position < -VISIBLE_CARD_OFFSET) position += videos.length;
    while (position > VISIBLE_CARD_OFFSET) position -= videos.length;
    return position;
  };

  const getCarouselStyle = (position: number) => {
    switch (position) {
      case 0:
        return { transform: 'translateX(0) scale(1)', zIndex: 40, opacity: 1 };
      case -1:
        return { transform: 'translateX(-44%) scale(0.84)', zIndex: 30, opacity: 0.82 };
      case 1:
        return { transform: 'translateX(44%) scale(0.84)', zIndex: 30, opacity: 0.82 };
      case -2:
        return { transform: 'translateX(-82%) scale(0.7)', zIndex: 20, opacity: 0.58 };
      case 2:
        return { transform: 'translateX(82%) scale(0.7)', zIndex: 20, opacity: 0.58 };
      default:
        return { transform: 'translateX(0) scale(0.45)', zIndex: 10, opacity: 0 };
    }
  };

  const openVideo = (index: number) => {
    const video = videos[index];
    if (!video?.url) return;
    setActiveIndex(index);
    setPlayingIndex(index);
    setIsPaused(true);
  };

  const closeVideo = () => {
    setPlayingIndex(null);
  };

  useEffect(() => {
    if (playingIndex !== null && playingIndex !== activeIndex) {
      setPlayingIndex(null);
    }
  }, [activeIndex, playingIndex]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || !isInViewport || playingIndex !== null) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [isInViewport, isPaused, prefersReducedMotion, playingIndex, videos.length]);

  useGSAP(() => {
    if (prefersReducedMotion) {
      return;
    }

    gsap.fromTo(
      '.download-app-element',
      { x: -200, opacity: 0, immediateRender: false },
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
      { x: 300, opacity: 0, scaleX: -1, immediateRender: false },
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
      { y: 50, opacity: 0, immediateRender: false },
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
      { y: 100, opacity: 0, scale: 0.95, immediateRender: false },
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
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-8 z-10 min-w-0 overflow-visible">
              <h2 className="global-section-heading download-app-heading">
                Download Our App
              </h2>

              <p className="download-app-element text-gray-600 max-w-xl text-lg md:text-xl leading-relaxed">
                Download our app to access high-quality learning resources, daily quizzes,
                current affairs updates, and expert guidance anytime, anywhere.
                Prepare smarter and stay connected with your learning journey.
              </p>

              {/* CHANGED: QR block updated to use only image, no white card background */}
              <div className="download-app-element flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:-space-x-6 md:-space-x-10">
                  <div className="flex flex-col items-center gap-4 w-[180px] sm:w-[220px] md:w-[260px]">
                    <img
                      src="/assets/Qr_code.svg"
                      alt="QR Code Android"
                      className="w-full h-auto object-contain block"
                    />

                    <div className="relative cursor-pointer">
                      <div className="mx-auto mt-[10px] w-0 h-0 border-l-[14px] border-r-[14px] border-b-[14px] border-l-transparent border-r-transparent border-b-[#17A8E3]" />
                      <div
                        className="w-[145px] md:w-[165px] h-[42px] md:h-[46px] rounded-full flex items-center justify-center text-white font-bold text-[18px] md:text-[22px] tracking-wide cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'linear-gradient(90deg, #18B7E8 0%, #2E73D5 100%)',
                        }}
                      >
                        SCAN
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-4 rounded-full bg-black px-8 py-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1"
                    >
                      <img src="/assets/playstore.svg" alt="Google Play" className="w-6 h-6" />
                      <div className="text-left">
                        <p className="text-[10px] opacity-60 font-bold uppercase">Get it on</p>
                        <p className="text-lg font-bold leading-none">Google Play</p>
                      </div>
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-4 w-[180px] sm:w-[220px] md:w-[260px]">
                    <img
                      src="/assets/Qr_code.svg"
                      alt="QR Code iOS"
                      className="w-full h-auto object-contain block"
                    />

                    <div className="relative cursor-pointer">
                      <div className="mx-auto mt-[10px] w-0 h-0 border-l-[14px] border-r-[14px] border-b-[14px] border-l-transparent border-r-transparent border-b-[#17A8E3]" />
                      <div
                        className="w-[145px] md:w-[165px] h-[42px] md:h-[46px] rounded-full flex items-center justify-center text-white font-bold text-[18px] md:text-[22px] tracking-wide cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'linear-gradient(90deg, #18B7E8 0%, #2E73D5 100%)',
                        }}
                      >
                        SCAN
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-4 rounded-full bg-black px-8 py-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1"
                    >
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
      <div className="youtube-trigger space-y-6 pt-12 pb-8 md:space-y-8 md:pt-16 md:pb-10">
        <div className="text-center">
          <h2 className="global-section-heading">
            YOUTUBE VIDEOS
          </h2>
        </div>

        <div className="youtube-carousel relative group max-w-[1440px] mx-auto px-6 md:px-16">
          {youtubeLoading ? (
            <div className="pointer-events-none">
              <YoutubeVideosSkeleton />
            </div>
          ) : youtubeError ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-red-600">
                {youtubeQueryError instanceof Error
                  ? youtubeQueryError.message
                  : 'Unable to fetch ranked YouTube videos. Please try again.'}
              </p>
            </div>
          ) : videos.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-[#f8fbfd] px-6 py-16 text-center">
              <p className="text-lg font-semibold text-gray-500">No Videos Available</p>
            </div>
          ) : (
            <>
          <div
            className="relative h-[360px] md:h-[480px] lg:h-[520px] w-full flex items-center justify-center py-4 px-6 z-10 touch-pan-y md:px-10 md:py-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              if (playingIndex === null) setIsPaused(false);
            }}
            onTouchStart={(e) => { setIsPaused(true); handleTouchStart(e); }}
            onTouchEnd={(e) => { setIsPaused(false); handleTouchEnd(e); }}
            onMouseDown={(e) => { setIsPaused(true); handleTouchStart(e); }}
            onMouseUp={(e) => { setIsPaused(false); handleTouchEnd(e); }}
            onWheel={handleWheel}
          >
            {videos.map((video, idx) => {
              const position = getCarouselPosition(idx);
              const isActive = position === 0;
              const isPlaying = playingIndex === idx && isActive;
              const { transform, zIndex, opacity } = getCarouselStyle(position);

              return (
                <div
                  key={video.id}
                  onClick={() => {
                    if (isActive && !isPlaying) {
                      openVideo(idx);
                      return;
                    }
                    if (!isPlaying) {
                      setActiveIndex(idx);
                    }
                  }}
                  className="absolute w-[280px] sm:w-[340px] md:w-[520px] lg:w-[620px] xl:w-[700px] cursor-pointer transition-[transform,opacity] duration-700 ease-out will-change-transform"
                  style={{
                    transform,
                    zIndex,
                    opacity,
                  }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden transition-colors duration-500 bg-black">
                    {isPlaying ? (
                      <>
                        <iframe
                          key={video.videoId}
                          src={buildYouTubeEmbedUrl(video.videoId, { autoplay: true })}
                          title={video.title}
                          className="absolute inset-0 h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeVideo();
                          }}
                          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
                          aria-label="Close video"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : opacity > 0 ? (
                      <>
                        <img
                          src={video.image}
                          alt={video.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = PLACEHOLDER_THUMBNAIL;
                          }}
                        />

                        {video.rank ? (
                          <span className="absolute left-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
                            Rank #{video.rank}
                          </span>
                        ) : null}

                        {isActive ? (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-4 pt-10 text-left">
                            <p className="text-base font-semibold text-white md:text-lg">
                              {video.title}
                            </p>
                            {video.description ? (
                              <p className="mt-1 line-clamp-2 text-sm text-white/85">
                                {video.description}
                              </p>
                            ) : null}
                          </div>
                        ) : null}

                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-500 ${isActive ? 'scale-100 opacity-100 hover:scale-110' : 'scale-50 opacity-0'}`}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openVideo(idx);
                            }}
                            className="relative w-20 h-20 flex items-center justify-center"
                            aria-label={`Play ${video.title}`}
                          >
                            <svg viewBox="0 0 68 48" className="w-full h-full drop-shadow-xl">
                              <path
                                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                                fill="#FF0000"
                              />
                              <path d="M27.31 34.33V13.67L45.47 24z" fill="#FFF" />
                            </svg>
                          </button>
                        </div>
                      </>
                    ) : null}
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

          <div className="flex justify-center gap-3 mt-4 relative z-30">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-10 bg-[#0E9BD8]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppAndVideos;