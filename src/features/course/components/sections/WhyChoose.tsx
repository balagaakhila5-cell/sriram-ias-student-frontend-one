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

const CardItem: React.FC<CardItemProps> = ({
  card,
  activeId,
  setActiveId,
  isLast = false,
}) => {
  const isActive = activeId === card.id;

  return (
    <div
      className="why-choose-card w-full relative"
      onMouseEnter={() => setActiveId(card.id)}
      onMouseLeave={() => setActiveId(null)}
    >
      <div
        className={`w-full rounded-[22px] px-5 md:px-6 py-5 transition-all duration-300 cursor-pointer bg-white ${
          isActive
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

            <h3 className="text-[18px] md:text-[18px] leading-[1.3] font-medium text-[#000000] max-w-[250px]">
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
        className={`absolute left-0 right-0 z-20 transition-all duration-300 ease-in-out ${
          isLast ? "bottom-full mb-2" : "top-full mt-2"
        } ${
          isActive
            ? "opacity-100 pointer-events-auto translate-y-0"
            : `opacity-0 pointer-events-none ${
                isLast ? "translate-y-2" : "-translate-y-2"
              }`
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

  const headingGradientClass =
    "bg-[linear-gradient(90deg,#20A0E0_0%,rgba(225,97,101,0.8)_100%)] bg-clip-text text-transparent";

  const cards: CardData[] = [
    {
      id: 1,
      side: "left",
      title: "Expert Faculty Guidance",
      info: "Learn from experienced mentors with deep subject knowledge and proven UPSC teaching expertise.",
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
      info: "The course is designed to cover the full General Studies syllabus in a structured and exam-oriented way.",
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
      info: "Frequent assessments, answer writing practice, and performance reviews help track preparation consistently.",
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
      info: "Get personal guidance, doubt clarification, and strategic support throughout your preparation journey.",
      icon: <Target size={24} />,
      iconBg: "bg-[#F7ECFF]",
      iconColor: "text-[#8B4CC7]",
      lightBg: "bg-[#FBF5FF]",
      darkText: "text-[#55297E]",
    },
    {
      id: 5,
      side: "right",
      title: `Focused Preparation for ${
        city.charAt(0).toUpperCase() + city.slice(1)
      }`,
      info: "The course structure adapts well to aspirants preparing from major centers with disciplined classroom support.",
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
      info: "Track your growth with measurable progress, regular feedback, and improvement-focused preparation planning.",
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

  if (city === "hyderabad") {
    const hydPoints = cityCards.slice(0, 5);

    return (
      <section
        ref={sectionRef}
        className="w-full px-6 md:px-12 lg:px-20 py-14 md:py-20 relative overflow-hidden font-['Montserrat',sans-serif]"
        style={{
          background:
            "linear-gradient(135deg, #D9E4FB 0%, #E8DFFB 60%, #F3E7F6 100%)",
        }}
      >
        <div className="max-w-[1300px] mx-auto relative z-10">
          <h2 className="font-['Montserrat'] font-extrabold text-[40px] md:text-[40px] leading-[1.2] mb-8 md:mb-12 max-w-[1200px]">
            <span className="text-[rgba(0,0,0,0.8)]">Why Choose the </span>

            <span className={headingGradientClass}>
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
                    <div
                      key={i}
                      className="flex flex-col items-center transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3">
                        <Icon size={18} className="text-white" />
                      </div>

                      <h3 className="text-[16px] md:text-[17px] font-bold text-[#1F1F1F] mb-2">
                        {item.title}
                      </h3>

                      <p className="text-[13px] md:text-[14px] text-[#4A4A4A] leading-relaxed max-w-[240px]">
                        {item.info}
                      </p>
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

                  <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1F1F1F] mb-2">
                    {hydPoints[2].title}
                  </h3>

                  <p className="text-[13px] md:text-[16px] font-normal text-[#4A4A4A] leading-relaxed">
                    {hydPoints[2].info}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-center">
                {hydPoints.slice(3, 5).map((item, i) => {
                  const Icon = item.Icon;

                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3">
                        <Icon size={18} className="text-white" />
                      </div>

                      <h3 className="text-[16px] md:text-[17px] font-bold text-[#1F1F1F] mb-2">
                        {item.title}
                      </h3>

                      <p className="text-[13px] md:text-[14px] text-[#4A4A4A] leading-relaxed max-w-[240px]">
                        {item.info}
                      </p>
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

  if (city === "pune") {
    return (
      <section
        ref={sectionRef}
        className="w-full px-6 md:px-12 lg:px-20 py-14 md:py-20 relative overflow-hidden font-['Montserrat',sans-serif]"
        style={{
          background:
            "linear-gradient(135deg, #E2EEFB 0%, #EEECF9 50%, #F5F0F6 100%)",
        }}
      >
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#D4E6FA] opacity-50 blur-3xl pointer-events-none" />

        <div className="absolute bottom-[35%] right-[-5%] w-[150px] h-[150px] rounded-full bg-[#D9CDF3] opacity-80 pointer-events-none" />
        <div className="absolute bottom-[28%] right-[0%] w-[150px] h-[150px] rounded-full border-[1.5px] border-[#CFC1E1] pointer-events-none" />

        <div className="max-w-[1300px] mx-auto relative z-10">
          <h2 className="font-['Montserrat'] font-extrabold text-[36px] md:text-[40px] leading-[1.2] mb-10 md:mb-12 max-w-[1200px]">
            <span className="text-[rgba(0,0,0,0.8)]">Why Choose the </span>

            <span className={headingGradientClass}>
              {headingCourseTitle}
            </span>
          </h2>

          <div className="relative w-full pb-8 md:pb-16 lg:pb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 relative z-20">
              {cityCards.map((item, i) => {
                const Icon = item.Icon;

                return (
                  <div
                    key={i}
                    className="why-choose-card bg-white hover:bg-[#FFF9DB] rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${item.tileBg} ${item.tileIcon} flex items-center justify-center mb-5`}
                    >
                      <Icon size={20} />
                    </div>

                    <h3 className="text-[16px] font-semibold text-[#1F1F1F] mb-3">
                      {item.title}
                    </h3>

                    <p className="text-[14px] font-medium text-[#00000099] leading-relaxed">
                      {item.info}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:flex absolute bottom-0 right-[2%] xl:right-[8%] w-[420px] xl:w-[480px] justify-center items-end pointer-events-none z-10">
              <svg
                className="absolute bottom-[100px] right-[10px] md:right-[350px] w-12 md:w-16 h-12 md:h-20 text-[#00000066] z-10 animate-float"
                style={{ animationDelay: "1.5s" }}
                width="62"
                height="90"
                viewBox="0 0 62 90"
                fill="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path
                  d="M11.9061 59.007C14.0399 56.5574 15.8161 54.0248 18.0799 52.0519C20.5823 49.871 23.3433 47.7932 26.3353 46.418C29.8446 44.8052 33.2959 46.2527 35.1085 49.2559C37.0537 52.4786 36.4436 56.0161 33.3341 58.7212C29.3168 62.216 24.4634 63.7529 19.286 64.4306C18.0217 64.5962 16.7447 64.6638 15.5494 64.7697C11.2899 71.7057 12.2397 74.3952 23.8318 88.3259C21.9151 90.6212 19.9264 89.6858 18.011 88.428C11.5895 84.2112 7.381 74.0322 8.9194 66.5463C9.075 65.7887 9.2672 65.0385 9.4774 64.1346C8.5276 63.5829 7.68681 63.1466 6.89951 62.629C1.22211 58.8965 -1.37299 52.8372 0.719513 46.3735C1.92801 42.6402 3.93461 39.031 6.20651 35.8059C10.1248 30.2436 15.4029 25.941 21.1064 22.3069C27.9984 17.9155 35.1027 13.8574 42.1096 9.64581C43.1586 9.01531 44.1773 8.33442 45.5222 7.47812C42.8938 6.37782 40.6539 5.62922 38.6289 4.49652C37.8557 4.06402 36.9346 2.33782 37.2011 1.92572C37.7735 1.04062 39.0572 0.595235 40.089 0.0433345C40.3194 -0.0798655 40.7127 0.093918 41.0294 0.141418C46.0793 0.900418 51.1191 1.73633 56.1815 2.39883C60.6526 2.98393 61.463 3.84902 60.8888 8.27582C60.2297 13.3565 57.9174 17.726 54.8043 21.6912C53.798 22.9729 52.5564 24.1143 50.5335 22.5651C50.221 18.0027 54.1896 14.7185 55.0628 9.76282C53.4469 10.4832 52.3049 10.8753 51.2787 11.468C42.3972 16.5983 33.3616 21.4924 24.7395 27.0293C20.0679 30.0294 15.8439 33.8799 11.9321 37.853C9.52771 40.2953 7.6347 43.506 6.3284 46.705C4.1392 52.0657 6.16631 56.2195 11.9061 59.007ZM18.9614 58.096L19.6457 59.1661C22.8097 58.9717 25.7536 58.0054 28.4548 56.2896C30.9511 54.7039 31.8011 53.0737 30.7087 51.8348C29.1529 50.0704 27.4087 51.0416 26.0518 52.071C23.5847 53.9427 21.3141 56.0734 18.9614 58.096Z"
                  fill="#00000066"
                />
              </svg>

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
        <div className="absolute top-15 left-0 w-[180px] h-[180px] md:w-[150px] md:h-[150px] bg-[#FFF0DC] rounded-full opacity-90" />
        <div className="absolute top-[60px] left-[50px] md:top-[130px] md:left-[-20px] w-[150px] h-[150px] md:w-[150px] md:h-[150px] border-[2.5px] border-[#FFA834] rounded-full" />
      </div>

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
          <span className="text-[rgba(0,0,0,0.8)]">Why Choose the </span>

          <span className={headingGradientClass}>
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