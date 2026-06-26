'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Link from '@/components/common/AppLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { useHomepage } from '@/features/homepage/hooks/useHomepage';
import DiamondLayer from '../DiamondLayer';
import { freeLearningDiamondConfig } from '../diamondConfigs';
import {
  FREE_LEARNING_EXPLORE_HREFS,
  freeLearningHref,
} from '@/features/homepage/utils/homepageLinks';

gsap.registerPlugin(ScrollTrigger);

const FreeCourses: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const fallbackSections = [
    {
      id: 'quizzes',
      href: FREE_LEARNING_EXPLORE_HREFS.dailyQuiz,
      title: 'Daily Quiz',
      description:
        'Participate in our daily quizzes to test your knowledge, strengthen your understanding of key concepts, and stay consistent with your learning journey.',
      bg: 'bg-[#000000]',
      backgroundImage: '/assets/daily_quizes_full_bg.png',
      rightImage: '/assets/daily_quizes_right_image.png',
      floatingImage: '',
      panelImages: null as string[] | null,
      accentColor: 'text-[#C5727A]',
    },
    {
      id: 'current-affairs',
      href: FREE_LEARNING_EXPLORE_HREFS.dailyCurrentAffairs,
      title: 'Daily Current Affairs',
      description:
        'Engage with our daily current affairs designed to help you stay updated with key national and international events while improving your analytical understanding for competitive exams.',
      bg: 'bg-[#5A0A0A]',
      backgroundImage: '/assets/bolgs.png',
      rightImage: '/assets/Group_64.png',
      floatingImage: '',
      panelImages: null as string[] | null,
      accentColor: 'text-[#FFCE8C]',
    },
    {
      id: 'mains-question',
      href: FREE_LEARNING_EXPLORE_HREFS.dailyMainsQuestions,
      title: 'Daily Mains Questions',
      description:
        'Solve our Daily Mains Questions to improve your answer-writing skills, build strong arguments, and stay consistent with your UPSC Mains preparation.',
      bg: 'bg-[#0d47a1]',
      backgroundImage: '/assets/current_affairs_full_bg.png',
      rightImage: '/assets/current_affairs.png',
      floatingImage: '',
      panelImages: null as string[] | null,
      accentColor: 'text-[#EDD1AC]',
    },
    {
      id: 'blogs',
      href: FREE_LEARNING_EXPLORE_HREFS.blogs,
      title: 'Blogs',
      description:
        'Explore our latest blogs for valuable insights, study tips, and expert advice to enhance your preparation and stay motivated on your path to success.',
      bg: 'bg-[#004D40]',
      backgroundImage: '/assets/main_questions_full_bg.png',
      rightImage: '/assets/Group_63.png',
      floatingImage: '',
      panelImages: null as string[] | null,
      accentColor: 'text-[#EDD1AC]',
    },
  ];

  const colorPalette = [
    { bg: 'bg-[#000000]', accentColor: 'text-[#C5727A]' },
    { bg: 'bg-[#5A0A0A]', accentColor: 'text-[#FFCE8C]' },
    { bg: 'bg-[#0d47a1]', accentColor: 'text-[#EDD1AC]' },
    { bg: 'bg-[#004D40]', accentColor: 'text-[#EDD1AC]' },
  ];

  const { data: homepage, isFetched, isPending } = useHomepage();
  const section4 = homepage?.section4;
  const sectionTitle = section4?.title ?? 'ACCESS FREE LEARNING RESOURCES';

  const sections = useMemo(() => {
    const cards = section4?.cards ?? [];
    if (!isFetched && isPending) return [];
    if (cards.length === 0) return fallbackSections;

    const sortedCards = [...cards].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );

    return sortedCards.map((card, index) => {
      const fallback = fallbackSections[index % fallbackSections.length];
      const palette = colorPalette[index % colorPalette.length];
      const apiImages = (card.images ?? []).filter(
        (image): image is string => Boolean(image?.trim()),
      );
      const panelImages =
        apiImages.length >= 3 ? apiImages.slice(0, 3) : null;

      const title = card.title ?? fallback.title;
      const id = card._id ?? fallback.id ?? `card-${index}`;

      return {
        id,
        title,
        href: freeLearningHref(title, id),
        description: card.description ?? fallback.description,
        backgroundImage: fallback.backgroundImage,
        rightImage: panelImages ? '' : fallback.rightImage,
        panelImages,
        floatingImage: fallback.floatingImage,
        bg: palette.bg,
        accentColor: palette.accentColor,
      };
    });
  }, [section4, isFetched, isPending]);

  useEffect(() => {
    for (const section of sections) {
      for (const imageUrl of section.panelImages ?? []) {
        const img = new Image();
        img.src = imageUrl;
      }
      if (section.rightImage) {
        const img = new Image();
        img.src = section.rightImage;
      }
    }
  }, [sections]);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.section-header h2', {
        y: 100,
        opacity: 0,
        immediateRender: false,
        scale: 0.95,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.15,
        force3D: true,
        scrollTrigger: {
          trigger: '.section-header',
          start: 'top 85%',
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.free-bg-motion').forEach((bg, index) => {
        gsap.fromTo(
          bg,
          {
            xPercent: index % 2 === 0 ? -5 : 5,
            yPercent: -4,
            scale: 1.08,
          },
          {
            xPercent: index % 2 === 0 ? 5 : -5,
            yPercent: 4,
            scale: 1.18,
            duration: 2.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            force3D: true,
          },
        );
      });

      const cards = gsap.utils.toArray<HTMLElement>('.section-card');

      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: index + 1,
        });

        if (index === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: '+=50%',
          pin: true,
          pinSpacing: false,
          scrub: 0.35,
          anticipatePin: 1,
        });
      });
    },
    { dependencies: [prefersReducedMotion, sections.length], scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-white">
      <div className="section-header relative overflow-hidden bg-[#EAF7FF] px-4 py-20 text-center sm:px-6 md:px-10">
        <DiamondLayer config={freeLearningDiamondConfig} />

        <h2 className="free-learning-section-heading global-section-heading relative z-10">
          {sectionTitle}
        </h2>
      </div>

      <div className="relative">
        {!isFetched && isPending && (
          <div
            className="section-card relative flex h-screen w-full items-center justify-center bg-[#000000] text-white"
            aria-busy="true"
            aria-label="Loading free learning resources"
          />
        )}

        {sections.map((section) => (
          <div
            key={section.id}
            className={`section-card relative h-screen w-full overflow-hidden ${section.bg} text-white flex items-center justify-center px-4 md:px-10 lg:px-16 xl:px-20 shadow-2xl`}
          >
            {section.backgroundImage && (
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="free-bg-motion absolute top-[-10%] left-[-10%] w-[120%] h-[120%]">
                  <img
                    src={section.backgroundImage}
                    alt=""
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>

                <div className="absolute inset-0 bg-black/40" />
              </div>
            )}

            <div className="relative z-10 grid w-full max-w-[1450px] mx-auto grid-cols-1 md:grid-cols-[44%_56%] items-center gap-8 md:gap-8 lg:gap-10">
              <div className="section-text w-full min-w-0">
                <h3 className="whitespace-nowrap text-[24px] font-extrabold leading-[1.05] sm:text-[32px] md:text-[44px] lg:text-[52px] xl:text-[58px]">
                  <span className={section.accentColor}>{section.title}</span>
                </h3>

                <div className="max-w-xl">
                  <p className="mt-5 text-gray-100 text-base md:text-[1.1rem] lg:text-[1.2rem] font-medium leading-relaxed opacity-90 md:mt-6">
                    {section.description}
                  </p>

                  <div className="mt-4 flex justify-center md:mt-5">
                    <Link
                      href={section.href}
                      className="w-fit cursor-pointer rounded-full bg-white px-10 py-3 text-base font-semibold text-[#1E6F9F] shadow-md transition-all duration-150 hover:bg-[#1E6F9F] hover:text-white md:text-lg"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className={`relative w-full min-w-0 ${section.panelImages ? 'overflow-visible' : 'overflow-hidden'}`}
              >
                {(section.panelImages || section.rightImage) && (
                  <div className="free-learning-image-wrapper group flex h-[clamp(280px,48vh,560px)] w-full cursor-pointer items-center justify-center overflow-visible px-2 sm:px-2">
                    {section.panelImages ? (
                      <div className="free-learning-hero-composition relative flex h-full w-full items-center justify-center overflow-visible">
                        <div className="relative mx-auto hidden w-[90%] max-w-[520px] overflow-visible md:block">
                          <div className="relative mx-auto w-full max-w-[320px]">
                            <div className="relative z-[1] aspect-square w-full">
                              <img
                                src={section.panelImages[1]}
                                alt={section.title}
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                className="h-full w-full object-contain object-center drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                              />
                            </div>
                            <div className="absolute bottom-0 right-[calc(100%-11.7%)] z-[2] aspect-square w-[55%]">
                              <img
                                src={section.panelImages[0]}
                                alt=""
                                loading="eager"
                                decoding="async"
                                className="h-full w-full object-contain object-center drop-shadow-2xl"
                              />
                            </div>

                            <div className="absolute top-[18%] left-[85.7%] z-[2] aspect-square w-[55%]">
                              <img
                                src={section.panelImages[2]}
                                alt=""
                                loading="eager"
                                decoding="async"
                                className="h-full w-full object-contain object-center drop-shadow-2xl"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex w-full flex-col items-center gap-4 py-4 md:hidden">
                          <div className="aspect-square w-full max-w-[220px]">
                            <img
                              src={section.panelImages[1]}
                              alt={section.title}
                              className="h-full w-full object-contain object-center drop-shadow-2xl"
                            />
                          </div>
                          <div className="aspect-square w-full max-w-[180px]">
                            <img
                              src={section.panelImages[2]}
                              alt=""
                              className="h-full w-full object-contain object-center drop-shadow-2xl"
                            />
                          </div>
                          <div className="aspect-square w-full max-w-[140px]">
                            <img
                              src={section.panelImages[0]}
                              alt=""
                              className="h-full w-full object-contain object-center drop-shadow-2xl"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={section.rightImage}
                        alt={section.title}
                        className="free-learning-section-image h-full w-auto max-w-none object-contain object-center drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.12]"
                      />
                    )}

                    {section.floatingImage && (
                      <img
                        src={section.floatingImage}
                        alt=""
                        className="absolute bottom-0 left-4 w-[114px] rotate-[-6deg] rounded-xl shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110 md:w-[145px] lg:w-[167px]"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FreeCourses;
