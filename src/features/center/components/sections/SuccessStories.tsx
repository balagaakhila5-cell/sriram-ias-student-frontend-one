'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import YouTubeVideoModal from '@/components/common/YouTubeVideoModal';
import { getYouTubeVideoId } from '@/lib/youtube';
import { formatCityLabel } from '@/features/center/data/centerCourseCategories';
import { SUCCESS_STORIES } from '@/features/center/data/successStories';

gsap.registerPlugin(ScrollTrigger);

const SuccessStories = ({ city }: { city: string }) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const cityLabel = formatCityLabel(city);
  const stories = SUCCESS_STORIES;

  const [activeIndex, setActiveIndex] = useState(2);
  const [playingVideo, setPlayingVideo] = useState<{
    videoId: string;
    title: string;
  } | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.success-stories-heading',
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
          },
        },
      );

      gsap.fromTo(
        '.success-stories-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.success-stories-card',
            start: 'top 85%',
            once: true,
          },
        },
      );
    },
    { dependencies: [prefersReducedMotion], scope: containerRef },
  );

  const openStoryVideo = (videoUrl: string, title: string) => {
    const videoId = getYouTubeVideoId(videoUrl);
    if (!videoId) return;
    setPlayingVideo({ videoId, title });
  };

  const closeStoryVideo = () => setPlayingVideo(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#EAE8F4] via-[#FFFFFF] to-[#E3F2F9] py-24 font-sans"
    >
      <div
        className="pointer-events-none absolute top-[-140px] right-[8%] z-0 h-[260px] w-[260px] rounded-b-full bg-white"
        style={{
          boxShadow: '0px 0px 120px 20px rgba(91, 178, 229, 0.7)',
        }}
      />

      <div
        className="pointer-events-none absolute top-1/2 right-[-160px] z-0 h-[260px] w-[260px] -translate-y-1/2 rounded-l-full bg-white"
        style={{
          boxShadow: '0px 0px 120px 20px rgba(91, 178, 229, 0.7)',
        }}
      />

      <div
        className="pointer-events-none absolute top-[80px] left-[-200px] z-0 h-[190px] w-[450px] opacity-100"
        style={{
          background:
            'linear-gradient(181.87deg, #ACAFFF -157.44%, rgba(181,189,254,0.96) -157.4%, rgba(171,169,213,0.67) 216.94%, rgba(150,143,199,0.8) 216.94%)',
          filter: 'blur(70px)',
          transform: 'rotate(30deg)',
        }}
      />

      <div
        className="pointer-events-none absolute bottom-[80px] left-[-200px] z-0 h-[190px] w-[450px] opacity-100"
        style={{
          background:
            'linear-gradient(181.87deg, #ACAFFF -157.44%, rgba(181,189,254,0.96) -157.4%, rgba(171,169,213,0.67) 216.94%, rgba(150,143,199,0.8) 216.94%)',
          filter: 'blur(70px)',
          transform: 'rotate(150deg)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-6 lg:px-12">
        <div className="success-stories-heading mb-20 w-full text-left md:text-left">
          <h2 className="mb-4 text-[28px] font-bold tracking-tight md:text-[40px]">
            <span className="text-[#519DC8]">50 + Success Stories </span>
            <span className="text-[#968EB3]">From </span>
            <span className="text-[#C0778B]">{cityLabel}</span>
          </h2>
          <p className="text-lg font-medium text-gray-500 md:text-xl">
            Watch what our students have to say
          </p>
        </div>

        <div className="flex w-full max-w-full flex-row items-center justify-center gap-4 overflow-x-auto pb-10 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 lg:gap-8 [&::-webkit-scrollbar]:hidden">
          {stories.map((story, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={story.id}
                className="success-stories-card flex shrink-0 cursor-pointer flex-col items-center transition-all duration-500 ease-in-out"
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl shadow-md transition-all duration-500 ease-out ${
                    isActive
                      ? 'z-20 h-[340px] w-[260px] scale-100 shadow-xl md:h-[400px] md:w-[300px]'
                      : 'z-10 h-[240px] w-[180px] scale-95 opacity-85 hover:opacity-100 md:h-[290px] md:w-[220px]'
                  }`}
                >
                  <img
                    src={story.image}
                    alt={`${story.name} - ${story.rank}`}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      const target = event.currentTarget;
                      if (target.dataset.fallbackApplied === 'true') return;
                      target.dataset.fallbackApplied = 'true';
                      target.src = '/assets/youtube_video_image.png';
                    }}
                  />

                  {isActive ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity duration-300">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openStoryVideo(
                            story.videoUrl,
                            `${story.name} - ${story.rank}`,
                          );
                        }}
                        className="flex h-12 w-16 items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/70"
                        aria-label={`Play ${story.name} success story`}
                      >
                        <svg
                          className="ml-1 h-6 w-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 4l12 6-12 6V4z" />
                        </svg>
                      </button>
                    </div>
                  ) : null}
                </div>

                <div
                  className={`mt-6 text-center transition-all duration-500 ${
                    isActive ? 'translate-y-2' : ''
                  }`}
                >
                  <h3 className="text-[18px] font-bold text-gray-800 md:text-[20px]">
                    {story.name}
                  </h3>
                  <p className="mt-1 text-[16px] font-bold text-gray-600 md:text-[18px]">
                    {story.rank}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <YouTubeVideoModal
        isOpen={playingVideo !== null}
        videoId={playingVideo?.videoId ?? null}
        title={playingVideo?.title}
        onClose={closeStoryVideo}
      />
    </section>
  );
};

export default SuccessStories;
