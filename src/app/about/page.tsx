"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const circleImages = [
  {
    src: "/assets/about/about-us/Ellipse 56.png",
    alt: "Student",
  },
  {
    src: "/assets/about/about-us/Ellipse 57.png",
    alt: "Classroom Student",
  },
  {
    src: "/assets/about/about-us/Ellipse 58.png",
    alt: "Classroom Student",
  },
];

const imagePositions = [
  {
    left: "140px",
    top: "0px",
  },
  {
    left: "0px",
    top: "385px",
  },
  {
    left: "345px",
    top: "385px",
  },
];

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % circleImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[390px] w-full overflow-hidden">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="About Us Banner"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full w-full items-center px-[90px] pt-[90px]">
          <h1 className="font-['Montserrat'] text-[58px] font-extrabold uppercase tracking-[1px] text-white">
            ABOUT <span className="text-[#B8B2FF]">US</span>
          </h1>
        </div>
      </section>

      {/* ABOUT CONTENT SECTION */}
      <section className="relative -mt-[1px] w-full overflow-hidden bg-[#F6FBFF] pt-[38px] pb-[150px] min-h-[1120px]">
        {/* STATIC BACKGROUND */}
        <div className="about-page-bg-motion absolute inset-0 pointer-events-none" />

        {/* BLUE MOVING DOTS */}
        <div className="half-circle-orbit pointer-events-none">
          <span className="orbit-dot orbit-dot-main" />
          <span className="orbit-dot orbit-dot-small" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1366px] grid-cols-[700px_650px] items-start justify-center gap-[20px] px-[20px]">
          {/* LEFT TEXT CARDS */}
          <div className="flex flex-col gap-[28px]">
            <div className="about-text-card rounded-[10px] bg-white px-[30px] py-[26px] shadow-[0px_8px_28px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.025] hover:bg-[#F7F3ED] hover:shadow-[0px_18px_40px_rgba(0,0,0,0.12)]">
              <p className="font-['Montserrat'] text-[18px] leading-[39px] font-semibold text-[#666666]">
                SRIRAM&apos;s IAS is one of the premier institutions for
                Preparation of UPSC Civil Services Examination. Established in
                1985 by Sriram Sir, a visionary mentor and academician, the
                institute has grown into a trusted name in Civil Services
                coaching, known for its academic excellence and unwavering
                commitment to aspirants&apos; success.
              </p>
            </div>

            <div className="about-text-card rounded-[10px] bg-white px-[30px] py-[26px] shadow-[0px_8px_28px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.025] hover:bg-[#F7F3ED] hover:shadow-[0px_18px_40px_rgba(0,0,0,0.12)]">
              <p className="font-['Montserrat'] text-[18px] leading-[39px] font-semibold text-[#666666]">
                We believe that preparation for the Civil Services is more than
                a career choice, it is a journey towards leadership and public
                service. The hallmark of SRIRAM&apos;s IAS lies in its
                student-first approach. Every aspect of the program is designed
                to benefit the aspirants i.e. from meticulously planned
                lectures and updated study materials to a dynamic assessment
                methodology that keeps preparation on track.
              </p>
            </div>

            <div className="about-text-card rounded-[10px] bg-white px-[30px] py-[26px] shadow-[0px_8px_28px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.025] hover:bg-[#F7F3ED] hover:shadow-[0px_18px_40px_rgba(0,0,0,0.12)]">
              <p className="font-['Montserrat'] text-[18px] leading-[39px] font-semibold text-[#666666]">
                The distinguished faculty team comprises highly experienced
                educators, retired bureaucrats, and subject knowledge experts
                who ensure conceptual clarity and exam-oriented focus across
                all stages i.e. Prelims, Mains and Interview. With Centers in
                New Delhi, Hyderabad and Pune, we make sure to provide
                accessible guidance to students across the country. With 40
                years of Excellence, and a proven track record, we remain
                dedicated to guiding aspirants with the clarity, conviction and
                care they deserve. Our legacy is built on a foundation of
                rigorous academic standards combined with personalized
                mentorship.
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE NETWORK */}
          <div className="relative mt-[170px] h-[840px] w-[650px] shrink-0 overflow-visible">
            {/* Diagonal connector line to bottom left image */}
            <div className="absolute left-[282px] top-[218px] h-[340px] w-[5px] origin-top rotate-[34deg] rounded-full bg-gradient-to-b from-[#D86D7B] via-[#8C87B7] to-[#2D9CDB]" />

            {/* Diagonal connector line to bottom right image */}
            <div className="absolute left-[282px] top-[218px] h-[340px] w-[5px] origin-top rotate-[-34deg] rounded-full bg-gradient-to-b from-[#D86D7B] via-[#8C87B7] to-[#2D9CDB]" />

            {/* Straight gradient line between bottom two images */}
            <div className="absolute left-[285px] top-[528px] z-[5] h-[5px] w-[95px] rounded-full bg-gradient-to-r from-[#2D9CDB] via-[#B95D63] to-[#2D9CDB]" />

            {circleImages.map((item, index) => {
              const positionIndex =
                (index + activeIndex) % imagePositions.length;
              const position = imagePositions[positionIndex];

              return (
                <div
                  key={item.src}
                  className="absolute z-10 h-[285px] w-[285px] overflow-hidden rounded-full shadow-[0px_14px_35px_rgba(0,0,0,0.16)] transition-all duration-[900ms] ease-in-out hover:scale-105"
                  style={{
                    left: position.left,
                    top: position.top,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="285px"
                    className="object-cover scale-[1.08]"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <style jsx global>{`
          .about-page-bg-motion {
            background-image: url("/assets/about/about-us/about-us-background-animation.png");
            background-size: 155% 155%;
            background-repeat: no-repeat;
            background-position: center -360px;
            opacity: 1;
            min-height: 1250px;
          }

          .half-circle-orbit {
            position: absolute;
            left: 190px;
            top: -235px;
            width: 760px;
            height: 760px;
            border-radius: 50%;
            border: 2px solid rgba(133, 151, 255, 0.22);
            z-index: 2;
          }

          .half-circle-orbit::before {
            content: "";
            position: absolute;
            inset: 95px;
            border-radius: 50%;
            border: 2px solid rgba(133, 151, 255, 0.2);
          }

          .half-circle-orbit::after {
            content: "";
            position: absolute;
            inset: 190px;
            border-radius: 50%;
            border: 2px solid rgba(133, 151, 255, 0.16);
          }

          .orbit-dot {
            position: absolute;
            border-radius: 50%;
            z-index: 4;
          }

          .orbit-dot-main {
            width: 18px;
            height: 18px;
            left: calc(50% - 9px);
            top: calc(50% - 9px);
            background: #18a8e8;
            border: 4px solid #dff6ff;
            box-shadow:
              0 0 0 8px rgba(24, 168, 232, 0.16),
              0 0 18px rgba(24, 168, 232, 0.65);
            animation: mainDotFullCircle 5s linear infinite;
          }

          .orbit-dot-small {
            width: 12px;
            height: 12px;
            left: calc(50% - 6px);
            top: calc(50% - 6px);
            background: #1ca7df;
            border: 3px solid #e6f9ff;
            box-shadow:
              0 0 0 5px rgba(28, 167, 223, 0.14),
              0 0 14px rgba(28, 167, 223, 0.55);
            animation: smallDotFullCircle 6s linear infinite;
          }

          @keyframes mainDotFullCircle {
            0% {
              transform: rotate(0deg) translateX(380px) rotate(0deg);
            }

            100% {
              transform: rotate(360deg) translateX(380px) rotate(-360deg);
            }
          }

          @keyframes smallDotFullCircle {
            0% {
              transform: rotate(0deg) translateX(285px) rotate(0deg);
            }

            100% {
              transform: rotate(360deg) translateX(285px) rotate(-360deg);
            }
          }

          .about-text-card {
            cursor: pointer;
          }

          @media (max-width: 1279px) {
            .about-page-bg-motion {
              background-size: cover;
              background-position: center top;
            }

            .half-circle-orbit {
              left: 80px;
              top: -220px;
            }
          }

          @media (max-width: 1023px) {
            .half-circle-orbit {
              display: none;
            }

            .about-page-bg-motion {
              background-size: cover;
              background-position: center top;
            }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;