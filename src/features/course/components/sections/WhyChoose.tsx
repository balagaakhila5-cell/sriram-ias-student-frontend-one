"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  FileText,
  Users,
  Target,
  ClipboardCheck,
  TrendingUp,
  Clock,
  RefreshCw,
  HandHelping,
  Ban,
  Calendar,
} from "lucide-react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface CourseData {
  city?: string;
  title?: string;
}

interface Props {
  course: CourseData;
}

interface CardData {
  id: number;
  side: "left" | "right";
  title: string;
  info: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  lightBg: string;
  darkText: string;
}

interface CardItemProps {
  card: CardData;
  activeId: number | null;
  setActiveId: React.Dispatch<React.SetStateAction<number | null>>;
  isLast?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({ card, activeId, setActiveId, isLast = false }) => {
  const isActive = activeId === card.id;

  return (
    <div
      className="why-choose-card w-full relative"
      onMouseEnter={() => setActiveId(card.id)}
      onMouseLeave={() => setActiveId(null)}
    >
      <div
        className={`w-full rounded-[22px] px-5 md:px-6 py-5 transition-all duration-300 cursor-pointer bg-white ${isActive
          ? "shadow-[0_16px_35px_rgba(0,0,0,0.08)]"
          : "shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-[54px] h-[54px] rounded-full flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}
            >
              {card.icon}
            </div>

            <h3 className="text-[18px] md:text-[18px] leading-[1.3] font-medium text-[#000000] max-w-[250px] font-medium">
              {card.title}
            </h3>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <img
              src="/assets/why-choose/ri_cursor-hand.png"
              alt="cursor"
              className="w-6 h-6 object-contain opacity-70 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 z-20 transition-all duration-300 ease-in-out ${isLast ? "bottom-full mb-2" : "top-full mt-2"
          } ${isActive
            ? "opacity-100 pointer-events-auto translate-y-0"
            : `opacity-0 pointer-events-none ${isLast ? "translate-y-2" : "-translate-y-2"}`
          }`}
      >
        <div
          className={`rounded-[20px] px-5 md:px-6 py-4 text-[15px] md:text-[16px] font-semibold leading-[1.7] shadow-[0_10px_25px_rgba(0,0,0,0.07)] ${card.lightBg} ${card.darkText}`}
        >
          {card.info}
        </div>
      </div>
    </div>
  );
};

const WhyChoose: React.FC<Props> = ({ course }) => {
  const city = course?.city?.toLowerCase() || "delhi";
  const [activeLeftId, setActiveLeftId] = useState<number | null>(null);
  const [activeRightId, setActiveRightId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const headingCourseTitle =
    course?.title || "2-Years General Studies Comprehensive Course";

  const cards: CardData[] = [
    {
      id: 1,
      side: "left",
      title: "Expert Faculty Guidance",
      info:
        "Learn from experienced mentors with deep subject knowledge and proven UPSC teaching expertise.",
      icon: <Users size={24} />,
      iconBg: "bg-[#FCE7EA]",
      iconColor: "text-[#D9506A]",
      lightBg: "bg-[#FFF5F7]",
      darkText: "text-[#5F2230]",
    },
    {
      id: 2,
      side: "left",
      title: "Complete GS Coverage",
      info:
        "The course is designed to cover the full General Studies syllabus in a structured and exam-oriented way.",
      icon: <BookOpen size={24} />,
      iconBg: "bg-[#EAF4FF]",
      iconColor: "text-[#2D83D5]",
      lightBg: "bg-[#F3F8FF]",
      darkText: "text-[#1F4E7A]",
    },
    {
      id: 3,
      side: "left",
      title: "Regular Tests & Evaluation",
      info:
        "Frequent assessments, answer writing practice, and performance reviews help track preparation consistently.",
      icon: <ClipboardCheck size={24} />,
      iconBg: "bg-[#EEF7EC]",
      iconColor: "text-[#4C8C4A]",
      lightBg: "bg-[#F5FBF4]",
      darkText: "text-[#2F5A2D]",
    },
    {
      id: 4,
      side: "right",
      title: "Personal Mentorship Support",
      info:
        "Get personal guidance, doubt clarification, and strategic support throughout your preparation journey.",
      icon: <Target size={24} />,
      iconBg: "bg-[#F7ECFF]",
      iconColor: "text-[#8B4CC7]",
      lightBg: "bg-[#FBF5FF]",
      darkText: "text-[#55297E]",
    },
    {
      id: 5,
      side: "right",
      title: `Focused Preparation for ${city.charAt(0).toUpperCase() + city.slice(1)}`,
      info:
        "The course structure adapts well to aspirants preparing from major centers with disciplined classroom support.",
      icon: <FileText size={24} />,
      iconBg: "bg-[#FFF4E8]",
      iconColor: "text-[#C7771A]",
      lightBg: "bg-[#FFF9F2]",
      darkText: "text-[#7A4A14]",
    },
    {
      id: 6,
      side: "right",
      title: "Performance Improvement Tracking",
      info:
        "Track your growth with measurable progress, regular feedback, and improvement-focused preparation planning.",
      icon: <TrendingUp size={24} />,
      iconBg: "bg-[#E9F7F7]",
      iconColor: "text-[#1C8A8A]",
      lightBg: "bg-[#F3FCFC]",
      darkText: "text-[#145A5A]",
    },
  ];

  const leftCards = cards.filter((card) => card.side === "left");
  const rightCards = cards.filter((card) => card.side === "right");

  const cityCards = [
    {
      title: "Ample Time For Mystery",
      info: "Spreads the syllabus over two years, allowing thorough understanding without burnout.",
      Icon: Clock,
      tileBg: "bg-[#FFF4E8]",
      tileIcon: "text-[#C7771A]",
    },
    {
      title: "Integrated Prelims + Mains",
      info: "Eliminates the need for multiple programs with our all-in-one strategy..",
      Icon: BookOpen,
      tileBg: "bg-[#FCE7EA]",
      tileIcon: "text-[#D9506A]",
    },
    {
      title: "Balanced Learning Cycle",
      info: "Includes NCERTs, standard books, tests, answer writing, and revision — all structured over two phases.",
      Icon: RefreshCw,
      tileBg: "bg-[#EAF4FF]",
      tileIcon: "text-[#2D83D5]",
    },
    {
      title: "Handholding all Journey",
      info: "Constant academic and motivational support through mentorship, doubt-clearing, and counselling..",
      Icon: HandHelping,
      tileBg: "bg-[#F7ECFF]",
      tileIcon: "text-[#8B4CC7]",
    },
    {
      title: "Flexibility With Access",
      info: "Recorded classes and digital content ensure seamless learning regardless of time or place.",
      Icon: Ban,
      tileBg: "bg-[#FFEBEE]",
      tileIcon: "text-[#C62828]",
    },
    {
      title: "Timely Coverage of Syllabus",
      info: "Ensures disciplined preparation with ample revision time.",
      Icon: Calendar,
      tileBg: "bg-[#EEF7EC]",
      tileIcon: "text-[#4C8C4A]",
    },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".why-choose-girl",
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".why-choose-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { dependencies: [prefersReducedMotion], scope: sectionRef }
  );

  const gradientHeading = (
    <h2 className="text-[28px] md:text-[42px] lg:text-[42px] leading-[1.2] font-extrabold mb-10 md:mb-14">
      <span className="text-[#1F1F1F]">Why Choose the </span>
      <span className="bg-[linear-gradient(90deg,#E8868D_0%,#9A93C9_48%,#3B94D9_100%)] bg-clip-text text-transparent">
        {headingCourseTitle}?
      </span>
    </h2>
  );

  // ── HYDERABAD LAYOUT ──────────────────────────────────────────────────
  if (city === "hyderabad") {
    const hydPoints = cityCards.slice(0, 5);
    return (
      <section
        ref={sectionRef}
        className="w-full px-6 md:px-12 lg:px-20 py-14 md:py-20 relative overflow-hidden font-['Montserrat',sans-serif]"
        style={{ background: "linear-gradient(135deg, #D9E4FB 0%, #E8DFFB 60%, #F3E7F6 100%)" }}
      >
        <div className="max-w-[1300px] mx-auto relative z-10">
          <h2 className="font-['Montserrat'] font-extrabold text-[40px] md:text-[40px] leading-[1.2] mb-8 md:mb-12 max-w-[1200px]">

            {/* WHY CHOOSE */}
            <span className="text-[rgba(0,0,0,0.8)]">
              Why Choose the{' '}
            </span>

            {/* COURSE TITLE (GRADIENT) */}
            <span className="bg-[linear-gradient(90deg,rgba(225,97,101,0.8)_0%,#20A0E0_100%)] bg-clip-text text-transparent">
              {headingCourseTitle}
            </span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center justify-between">

            <div className="relative w-full lg:w-[50%] h-[400px] md:h-[550px] shrink-0 mx-auto">

              <video
                autoPlay
                loop
                muted
                playsInline
                src="/assets/Hero_video.mp4"
                className="absolute top-[10%] left-[20%] w-[50%] h-[80%] object-cover rounded-tl-[120px] rounded-br-[120px] shadow-xl z-10"
              />

              <img
                src="/assets/why-choose/how-will-1.png"
                alt="Top right feature"
                className="absolute top-[-5%] right-[0%] md:right-[5%] w-[40%] h-[55%] object-cover rounded-bl-[120px] shadow-2xl z-20"
              />

              <img
                src="/assets/why-choose/how-will-3.png"
                alt="Bottom left feature"
                className="absolute bottom-[-8%] left-[0%] md:left-[-5%] w-[40%] h-[55%] object-cover rounded-tr-[120px] shadow-2xl z-20"
              />
            </div>

            <div className="w-full lg:w-[50%]">
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-center">
                {hydPoints.slice(0, 2).map((item, i) => {
                  const Icon = item.Icon;
                  return (
                    <div key={i} className="flex flex-col items-center transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3">
                        <Icon size={18} className="text-white" />
                      </div>
                      <h3 className="text-[16px] md:text-[17px] font-bold text-[#1F1F1F] mb-2">{item.title}</h3>
                      <p className="text-[13px] md:text-[14px] text-[#4A4A4A] leading-relaxed max-w-[240px]">{item.info}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center my-8">
                <div className="flex flex-col items-center text-center max-w-[280px] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 cursor-pointer">
                  {(() => {
                    const Mid = hydPoints[2].Icon;
                    return (
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3">
                        <Mid size={18} className="text-white" />
                      </div>
                    );
                  })()}
                  <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1F1F1F] mb-2">{hydPoints[2].title}</h3>
                  <p className="text-[13px] md:text-[16px] font-normal text-[#4A4A4A] leading-relaxed">{hydPoints[2].info}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-center">
                {hydPoints.slice(3, 5).map((item, i) => {
                  const Icon = item.Icon;
                  return (
                    <div key={i} className="flex flex-col items-center transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3">
                        <Icon size={18} className="text-white" />
                      </div>
                      <h3 className="text-[16px] md:text-[17px] font-bold text-[#1F1F1F] mb-2">{item.title}</h3>
                      <p className="text-[13px] md:text-[14px] text-[#4A4A4A] leading-relaxed max-w-[240px]">{item.info}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // ── PUNE LAYOUT ────────────────────────────────────────────────────────
  if (city === "pune") {
    return (
      <section
        ref={sectionRef}
        className="w-full px-6 md:px-12 lg:px-20 py-14 md:py-20 relative overflow-hidden font-['Montserrat',sans-serif]"
        style={{ background: "linear-gradient(135deg, #E2EEFB 0%, #EEECF9 50%, #F5F0F6 100%)" }}
      >
        {/* --- Background Decorative Shapes --- */}
        {/* Top Left Blob */}
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#D4E6FA] opacity-50 blur-3xl pointer-events-none" />

        {/* Bottom Right Layered Circles */}
        <div className="absolute bottom-[35%] right-[-5%] w-[150px] h-[150px] rounded-full bg-[#D9CDF3] opacity-80 pointer-events-none" />
        <div className="absolute bottom-[28%] right-[0%] w-[150px] h-[150px] rounded-full border-[1.5px] border-[#CFC1E1] pointer-events-none" />

        <div className="max-w-[1300px] mx-auto relative z-10">
          <h2 className="font-['Montserrat'] font-extrabold text-[36px] md:text-[40px] leading-[1.2] mb-10 md:mb-12 max-w-[1200px]">
            {/* WHY CHOOSE */}
            <span className="text-[rgba(0,0,0,0.8)]">
              Why Choose the{' '}
            </span>

            {/* COURSE TITLE (GRADIENT) */}
            <span className="bg-[linear-gradient(90deg,rgba(225,97,101,0.8)_0%,#20A0E0_100%)] bg-clip-text text-transparent">
              {headingCourseTitle}
            </span>
          </h2>

          {/* Wrapper for grid and absolute person to align them perfectly */}
          <div className="relative w-full pb-8 md:pb-16 lg:pb-0">

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 relative z-20">
              {cityCards.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={i}
                    className="why-choose-card bg-white hover:bg-[#FFF9DB] rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1"
                  >
                    <div className={`w-10 h-10 rounded-lg ${item.tileBg} ${item.tileIcon} flex items-center justify-center mb-5`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#1F1F1F] mb-3">{item.title}</h3>
                    <p className="text-[14px] font-medium text-[#00000099] leading-relaxed">{item.info}</p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Right Person & Arrows (Visible on Large Screens) */}
            {/* Positioned in the empty space of columns 3 & 4 */}
            <div className="hidden lg:flex absolute bottom-0 right-[2%] xl:right-[8%] w-[420px] xl:w-[480px] justify-center items-end pointer-events-none z-10">

              {/* SHAPE 1: Left Arrow */}
              <svg className="absolute bottom-[100px] right-[10px] md:right-[350px] w-12 md:w-16 h-12 md:h-20 text-[#00000066] z-10 animate-float" style={{ animationDelay: '1.5s' }} width="62" height="90" viewBox="0 0 62 90" fill="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M11.9061 59.007C14.0399 56.5574 15.8161 54.0248 18.0799 52.0519C20.5823 49.871 23.3433 47.7932 26.3353 46.418C29.8446 44.8052 33.2959 46.2527 35.1085 49.2559C37.0537 52.4786 36.4436 56.0161 33.3341 58.7212C29.3168 62.216 24.4634 63.7529 19.286 64.4306C18.0217 64.5962 16.7447 64.6638 15.5494 64.7697C11.2899 71.7057 12.2397 74.3952 23.8318 88.3259C21.9151 90.6212 19.9264 89.6858 18.011 88.428C11.5895 84.2112 7.381 74.0322 8.9194 66.5463C9.075 65.7887 9.2672 65.0385 9.4774 64.1346C8.5276 63.5829 7.68681 63.1466 6.89951 62.629C1.22211 58.8965 -1.37299 52.8372 0.719513 46.3735C1.92801 42.6402 3.93461 39.031 6.20651 35.8059C10.1248 30.2436 15.4029 25.941 21.1064 22.3069C27.9984 17.9155 35.1027 13.8574 42.1096 9.64581C43.1586 9.01531 44.1773 8.33442 45.5222 7.47812C42.8938 6.37782 40.6539 5.62922 38.6289 4.49652C37.8557 4.06402 36.9346 2.33782 37.2011 1.92572C37.7735 1.04062 39.0572 0.595235 40.089 0.0433345C40.3194 -0.0798655 40.7127 0.093918 41.0294 0.141418C46.0793 0.900418 51.1191 1.73633 56.1815 2.39883C60.6526 2.98393 61.463 3.84902 60.8888 8.27582C60.2297 13.3565 57.9174 17.726 54.8043 21.6912C53.798 22.9729 52.5564 24.1143 50.5335 22.5651C50.221 18.0027 54.1896 14.7185 55.0628 9.76282C53.4469 10.4832 52.3049 10.8753 51.2787 11.468C42.3972 16.5983 33.3616 21.4924 24.7395 27.0293C20.0679 30.0294 15.8439 33.8799 11.9321 37.853C9.52771 40.2953 7.6347 43.506 6.3284 46.705C4.1392 52.0657 6.16631 56.2195 11.9061 59.007ZM18.9614 58.096L19.6457 59.1661C22.8097 58.9717 25.7536 58.0054 28.4548 56.2896C30.9511 54.7039 31.8011 53.0737 30.7087 51.8348C29.1529 50.0704 27.4087 51.0416 26.0518 52.071C23.5847 53.9427 21.3141 56.0734 18.9614 58.096Z" fill="#00000066" />
              </svg>

              <svg className="absolute top-[50px] right-[10px] md:right-[20px] w-12 md:w-16 h-12 md:h-20 text-[#00000066] z-10 animate-float" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">

                <path d="M62.6359 1.38151C52.3069 -1.04187 41.3251 -0.29261 31.5486 3.75252C30.8732 4.03208 30.1989 4.32902 29.5286 4.64216C25.5378 2.30032 20.6168 1.284 15.9842 2.05828C6.55682 3.63372 -0.917921 12.1608 0.0914977 21.3721C0.328519 23.5353 0.987293 25.3616 2.35176 27.1135C3.33258 28.3731 6.60052 27.0503 6.05414 25.477C4.84045 21.981 4.60858 18.2413 5.7221 14.6997C6.75131 11.4263 8.85616 8.50548 11.7468 6.84481C11.8026 6.81285 11.8487 6.78621 11.8885 6.76305C11.9039 6.75818 11.9423 6.74173 12.0232 6.70305C12.2531 6.59257 12.4843 6.48533 12.7198 6.38597C13.1949 6.18539 13.1252 6.21367 13.4698 6.11107C14.4694 5.81321 15.0495 5.7062 16.154 5.63348C17.8647 5.52091 19.7369 5.80069 21.4288 6.3459C22.4145 6.66345 23.3733 7.07296 24.2867 7.56097C21.9167 9.13733 19.7679 10.9932 18.0626 13.1727C15.1399 16.9084 13.9782 22.1874 16.6578 26.3525C19.7889 31.2194 26.2812 31.3931 31.1296 28.7805C36.3744 25.9541 38.65 20.3676 37.4136 14.8579C36.7688 11.9843 35.2518 9.47269 33.189 7.43773C33.4534 7.33003 33.7188 7.22488 33.9853 7.12274C34.1381 7.06414 34.2917 7.00763 34.4452 6.95112C34.5312 6.9217 34.8327 6.81493 34.9197 6.78598C35.4192 6.62084 35.922 6.4645 36.4278 6.31789C37.5528 5.99177 38.6928 5.71153 39.8427 5.4769C40.0255 5.43961 40.2087 5.40418 40.3922 5.36921C40.4758 5.35531 40.6738 5.32078 40.7072 5.31569C41.2883 5.22721 41.8681 5.13781 42.4519 5.06578C43.5615 4.92867 44.6765 4.83277 45.7939 4.77672C49.641 4.58378 54.1683 4.98774 58.1112 5.97256C66.6129 8.09599 74.3919 12.7151 79.6281 19.4798C85.1199 26.5748 88.0235 35.3289 87.515 44.1318C87.2768 48.2578 86.1968 52.2633 84.3868 56.021C83.5746 57.7074 82.4995 59.4493 81.2548 61.1336C79.8651 63.0136 79.0299 63.9538 77.2997 65.5772C76.5498 66.2808 75.7663 66.9471 74.9644 67.5968C74.948 67.61 74.9204 67.6316 74.8887 67.6554C74.7137 67.7851 74.5397 67.9158 74.3633 68.0436C73.8528 68.4137 73.3324 68.7713 72.8026 69.1162C72.3696 69.3983 71.9303 69.6721 71.485 69.9364C71.2874 70.0538 71.0851 70.1649 70.8881 70.2835C70.8361 70.3148 70.7923 70.3412 70.754 70.3646C69.7819 70.8637 68.8004 71.339 67.7878 71.7608C67.3067 71.9611 66.8187 72.1416 66.3324 72.3299C66.3265 72.3322 66.3222 72.3338 66.3168 72.3361C66.2799 72.3472 66.2403 72.359 66.1939 72.3732C65.9718 72.4408 65.7519 72.5156 65.5297 72.5837C64.4145 72.9253 63.2832 73.1979 62.1396 73.4386C62.1134 73.4441 62.068 73.4522 62.0179 73.4608C61.8102 73.4939 61.603 73.5278 61.395 73.5581C60.8174 73.6422 60.2371 73.7117 59.6555 73.7668C59.1903 73.8108 58.724 73.8455 58.2573 73.871C57.9656 73.887 57.6736 73.899 57.3816 73.9078C57.2064 73.9139 57.0312 73.918 56.8557 73.9203C57.1208 73.9231 57.1313 73.9236 56.887 73.9213C48.3803 73.8733 40.1452 70.7306 33.8289 65.0755C32.8471 64.1965 31.9279 63.2631 31.081 62.2723C34.1583 62.7989 37.2496 63.2121 40.3619 63.3421C41.3367 63.3828 42.382 63.0111 43.0063 62.2806C43.4899 61.715 43.6414 60.952 42.8015 60.6016C39.7689 59.3363 36.6509 58.6415 33.4367 57.9207C30.1473 57.183 26.8549 56.4567 23.5686 55.7058C22.307 55.4174 21.1087 55.6155 19.9752 56.2429C19.2121 56.6654 17.7772 57.6819 17.9688 58.7068C18.6126 62.1544 19.3826 65.5753 20.1354 69.0027C20.8763 72.3757 21.2533 76.0848 22.8658 79.1928C23.444 80.3073 25.2255 80.0495 26.1898 79.703C27.3189 79.2975 28.7709 78.3995 28.8004 77.1055C28.8581 74.5784 28.2465 72.0445 27.6099 69.55C33.1516 74.5566 40.3502 77.7204 48.0527 78.8192C58.6988 80.3379 69.7644 77.3853 78.2688 71.1854C86.6762 65.0563 92.6787 56.33 94.4669 46.365C96.2391 36.4883 93.5061 25.936 87.5591 17.7035C81.6541 9.52874 72.7814 3.76203 62.6359 1.38151ZM30.2942 24.5475C29.8184 25.1826 29.2913 25.5921 28.7572 25.8693C28.5402 25.9819 28.2638 26.0898 28.0231 26.1456C27.6942 26.2218 27.3541 26.3221 26.787 26.3059C25.2937 26.2633 23.6851 25.2428 22.7991 23.9574C20.5237 20.6564 21.2822 16.5531 23.7599 13.5841C24.9741 12.1291 26.2948 11.1373 27.8706 10.1455C28.7163 10.9601 29.4597 11.8678 30.065 12.8596C32.1608 16.2942 32.8408 21.1476 30.2942 24.5475ZM62.0005 73.4634C61.5976 73.5273 61.8178 73.4942 62.0005 73.4634V73.4634ZM74.885 67.6577C74.4989 67.944 74.7345 67.7719 74.885 67.6577V67.6577Z" fill="#00000066" />
              </svg>

              {/* Person Image */}
              <img
                src="/assets/course/pune-person-img.png"
                alt="Student pointing"
                className="w-full h-auto object-contain object-bottom -mb-20"
              />
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F7F7F8] px-6 md:px-10 lg:px-14 xl:px-20 py-12 md:py-16 overflow-hidden relative font-['Montserrat',sans-serif]"
    >
      <style>{`
        @keyframes svgFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .svg-float { animation: svgFloat 2.4s ease-in-out infinite; }

        @keyframes bgDrift {
          0%   { transform: scale(1) translate(0px, 0px) rotate(0deg); }
          33%  { transform: scale(1.04) translate(12px, -8px) rotate(1deg); }
          66%  { transform: scale(1.02) translate(-8px, 10px) rotate(-1deg); }
          100% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
        }
        .bg-drift {
          animation: bgDrift 12s ease-in-out infinite;
          transform-origin: center center;
        }
      `}</style>

      <div className="absolute top-[-40px] left-[-60px] md:top-[-60px] md:left-[-80px] z-0 pointer-events-none">
        {/* Light beige filled circle */}
        <div className="absolute top-15 left-0 w-[180px] h-[180px] md:w-[150px] md:h-[150px] bg-[#FFF0DC] rounded-full opacity-90" />
        {/* Orange stroke circle */}
        <div className="absolute top-[60px] left-[50px] md:top-[130px] md:left-[-20px] w-[150px] h-[150px] md:w-[150px] md:h-[150px] border-[2.5px] border-[#FFA834] rounded-full" />
      </div>

      {/* Bottom-Left Purple Circle */}
      <div className="absolute bottom-[-60px] left-[-60px] md:bottom-[-80px] md:left-[-80px] z-0 pointer-events-none">
        <div className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] bg-[#D4CDEF] rounded-full opacity-90" />
      </div>

      <img
        src="/assets/why-choose/background-anime.png"
        alt=""
        className="bg-drift absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none mix-blend-multiply opacity-90 brightness-105"
      />

      <div className="why-choose-girl hidden xl:block absolute bottom-0 right-0 w-[560px] pointer-events-none z-10">
        <img
          src="/assets/course/why-choose-girl.png"
          alt="Student"
          className="w-full h-auto object-contain object-bottom block"
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-2">
        <h2 className="font-['Montserrat'] font-extrabold text-[40px] md:text-[40px] leading-[1.2] mb-8 md:mb-12 max-w-[1200px]">

          {/* WHY CHOOSE */}
          <span className="text-[rgba(0,0,0,0.8)]">
            Why Choose the{' '}
          </span>

          {/* COURSE TITLE (GRADIENT) */}
          <span className="bg-[linear-gradient(90deg,rgba(225,97,101,0.8)_0%,#20A0E0_100%)] bg-clip-text text-transparent">
            {headingCourseTitle}
          </span>
        </h2>

        <div className="xl:pr-[420px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-start">
            <div className="flex flex-col gap-6">
              {leftCards.map((card, index) => (
                <CardItem
                  key={card.id}
                  card={card}
                  activeId={activeLeftId}
                  setActiveId={setActiveLeftId}
                  isLast={index === leftCards.length - 1}
                />
              ))}
            </div>

            <div className="flex flex-col gap-6">
              {rightCards.map((card, index) => (
                <CardItem
                  key={card.id}
                  card={card}
                  activeId={activeRightId}
                  setActiveId={setActiveRightId}
                  isLast={index === rightCards.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;