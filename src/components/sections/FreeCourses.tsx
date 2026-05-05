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
      title: 'Daily Quizzes',
      description:
        'Participate in our daily quizzes to test your knowledge, strengthen your understanding of key concepts, and stay consistent with your learning journey.',
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
      title: 'Daily Mains Question',
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
      if (prefersReducedMotion) return;

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

      // BACKGROUND MOTION FOR ALL CARDS
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
            duration: 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            force3D: true,
          }
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
            className={`section-card relative h-screen w-full overflow-hidden ${section.bg} text-white flex items-center justify-center px-4 md:px-10 lg:px-16 xl:px-20 shadow-2xl`}
          >
            {/* BACKGROUND IMAGE WITH MOTION */}
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

            <div className="relative z-10 grid w-full max-w-[1450px] mx-auto grid-cols-1 md:grid-cols-[60%_40%] items-center gap-8 md:gap-10 lg:gap-12">
              {/* Text */}
              <div className="section-text w-full min-w-0 space-y-8 md:space-y-10 overflow-visible">
                <h3 className="text-[38px] md:text-[52px] lg:text-[62px] xl:text-[70px] font-extrabold leading-[1.02] whitespace-nowrap">
                  <span className={section.accentColor}>
                    {section.title}
                  </span>
                </h3>

                <p className="text-gray-100 text-base md:text-[1.1rem] lg:text-[1.2rem] font-medium leading-relaxed max-w-xl opacity-90">
                  {section.description}
                </p>

                <button className="bg-white text-[#1E6F9F] px-6 py-2 rounded-md font-semibold text-sm md:text-base hover:bg-[#1E6F9F] hover:text-white transition-all duration-300 w-fit shadow-md">
                  Explore
                </button>
              </div>

              {/* Image */}
              <div className="w-full min-w-0 flex justify-center md:justify-end overflow-visible">
                {section.rightImage && (
                  <div className="section-image-wrapper relative w-full h-[240px] md:h-[330px] lg:h-[400px] xl:h-[440px] flex items-center justify-center overflow-visible">
                    <img
                      src={section.rightImage}
                      alt={section.title}
                      className="section-image h-full w-auto max-w-none object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
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