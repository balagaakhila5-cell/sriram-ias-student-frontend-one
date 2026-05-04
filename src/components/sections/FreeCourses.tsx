'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const FreeCourses: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const sections = [
    {
      id: 'quizzes',
      title: 'Daily Quiz',
      description:
        'Participate in our daily quiz to test your knowledge, strengthen your understanding of key concepts, and stay consistent with your learning journey.',
      bg: 'bg-[#000000]',
      backgroundImage: '/assets/daily_quizes_full_bg.png',
      rightImage: '/assets/daily_quizes_right_image.png',
      accentColor: 'text-[#C5727A]',
    },
    {
      id: 'current-affairs',
      title: 'Daily Current Affairs',
      description:
        'Engage with our daily current affairs designed to help you stay updated with key national and international events while improving your analytical understanding for competitive exams.',
      bg: 'bg-[#5A0A0A]',
      backgroundImage: '/assets/bolgs.png',
      rightImage: '/assets/Group_64.png',
      accentColor: 'text-[#FFCE8C]',
    },
    {
      id: 'mains-question',
      title: 'Daily Mains Questions',
      description:
        'Solve our Daily Mains Questions to improve your answer-writing skills, build strong arguments, and stay consistent with your UPSC Mains preparation.',
      bg: 'bg-[#0d47a1]',
      backgroundImage: '/assets/current_affairs_full_bg.png',
      rightImage: '/assets/current_affairs.png',
      accentColor: 'text-[#EDD1AC]',
    },
    {
      id: 'blogs',
      title: 'Blogs',
      description:
        'Explore our latest blogs for valuable insights, study tips, and expert advice to enhance your preparation and stay motivated on your path to success.',
      bg: 'bg-[#004D40]',
      backgroundImage: '/assets/main_questions_full_bg.png',
      rightImage: '/assets/Group_63.png',
      accentColor: 'text-[#EDD1AC]',
    },
  ];

  useGSAP(
    () => {
      gsap.from('.section-header h2', {
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
        force3D: true,
        scrollTrigger: {
          trigger: '.section-header',
          start: 'top 85%',
          once: true,
        },
      });

      /**
       * IMPORTANT:
       * This animation should run even if background motion looked invisible before.
       * We animate a larger image wrapper, so movement is clearly visible.
       */
      if (!prefersReducedMotion) {
        gsap.utils.toArray<HTMLElement>('.free-bg-motion').forEach((bg, index) => {
          gsap.fromTo(
            bg,
            {
              xPercent: index % 2 === 0 ? -6 : 6,
              yPercent: -5,
              scale: 1.08,
            },
            {
              xPercent: index % 2 === 0 ? 6 : -6,
              yPercent: 5,
              scale: 1.18,
              duration: 3.5,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              force3D: true,
            }
          );
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>('.section-card');

      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: index + 1,
        });

        if (index === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          scrub: true,
          anticipatePin: 1,
        });
      });
    },
    { dependencies: [prefersReducedMotion], scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-white">
      <div className="section-header text-center py-20 px-4 bg-[#EAF7FF]">
        <h2 className="global-section-heading">
          ACCESS FREE LEARNING RESOURCES
        </h2>
      </div>

      <div className="relative">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`section-card relative h-screen w-full overflow-hidden ${section.bg} text-white flex flex-col md:flex-row items-center justify-center gap-16 px-4 md:px-16 lg:px-24 shadow-2xl`}
          >
            {section.backgroundImage && (
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="free-bg-motion absolute top-[-10%] left-[-10%] w-[120%] h-[120%]">
                  <img
                    src={section.backgroundImage}
                    alt=""
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                <div className="absolute inset-0 bg-black/40" />
              </div>
            )}

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-24 md:gap-32 w-full max-w-[1400px] mx-auto">
              <div className="section-text flex-1 space-y-12">
              <h3 className="text-[35px] md:text-[45px] lg:text-[53px] xl:text-[57px] font-extrabold leading-[1.08] whitespace-nowrap">
                  <span className={section.accentColor}>
                    {section.title}
                  </span>
                </h3>

                <p className="text-gray-100 text-lg md:text-[1.2rem] font-medium leading-relaxed max-w-xl opacity-90">
                  {section.description}
                </p>

                <button className="bg-white text-[#1E6F9F] px-6 py-2 rounded-md font-semibold text-sm md:text-base hover:bg-[#1E6F9F] hover:text-white transition-all duration-300 w-fit shadow-md">
                  Explore
                </button>
              </div>

              <div className="flex-1 w-full flex justify-center lg:justify-end overflow-visible pr-8 md:pr-20 lg:pr-24">
                {section.rightImage && (
                  <div className="section-image-wrapper relative w-full max-w-[900px] md:max-w-[1000px] overflow-visible">
                    <img
                      src={section.rightImage}
                      alt={section.title}
                      className="section-image w-[110%] md:w-[130%] max-w-none h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
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