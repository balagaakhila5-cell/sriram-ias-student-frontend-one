"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const circleImages = [
  {
    src: "/assets/about/about-us/Ellipse 56.png",
    alt: "Student",
    objectPosition: "center center",
  },
  {
    src: "/assets/about/about-us/Ellipse 57.png",
    alt: "Classroom Student",
    objectPosition: "58% center",
  },
  {
    src: "/assets/about/about-us/Ellipse 58.png",
    alt: "Classroom Student",
    objectPosition: "center center",
  },
];

/* Position 0 = top, 1 = bottom-left, 2 = bottom-right */
const imagePositions = [
  { left: "50%", top: "0%", transform: "translateX(-50%)" },
  { left: "16%", top: "43%" },
  { left: "52%", top: "43%" },
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
    <main className="min-h-screen overflow-hidden bg-white">
      <Header />

      <section className="relative h-[300px] w-full overflow-hidden sm:h-[340px] md:h-[390px]">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="About Us Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-black/95 via-black/75 to-transparent md:w-[52%]" />
        <div className="absolute inset-y-0 right-0 w-[38%] bg-gradient-to-l from-black/20 to-transparent" />

        <div className="relative z-10 flex h-full w-full items-center px-6 pt-[70px] sm:px-10 md:px-[72px] md:pt-[90px] lg:px-[82px]">
          <h1 className="font-['Montserrat'] text-[clamp(36px,8vw,58px)] font-extrabold uppercase leading-[1.15] tracking-[1px] text-white">
            ABOUT <br className="block sm:hidden" />
            <span className="text-[#B8B2FF]">US</span>
          </h1>
        </div>
      </section>

      <section className="about-section-bg relative -mt-[1px] w-full overflow-hidden px-4 pb-12 pt-7 sm:px-6 sm:pb-14 sm:pt-8 md:px-8 lg:px-6 lg:pb-[35px] lg:pt-[30px] xl:px-0">
        <div className="side-circle-left pointer-events-none" />
        <div className="side-circle-right pointer-events-none" />
        <div className="bottom-wave-lines pointer-events-none" />

        <div className="clean-orbit-wrap pointer-events-none">
          <div className="clean-orbit clean-orbit-one">
            <span className="clean-dot clean-dot-one" />
          </div>
          <div className="clean-orbit clean-orbit-two">
            <span className="clean-dot clean-dot-two" />
          </div>
        </div>

        <div className="about-main-grid relative z-10 mx-auto grid w-full max-w-[1366px] grid-cols-1 items-start justify-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start lg:gap-4 lg:px-3 xl:grid-cols-[minmax(0,677px)_minmax(0,627px)] xl:gap-5 xl:px-5">
          <div className="about-left-cards flex w-full min-w-0 flex-col gap-5 md:gap-7 lg:max-w-none">
            <div className="about-text-card about-text-card--one rounded-[12px] bg-white px-4 py-5 shadow-[0px_4px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#F7F3ED] hover:shadow-[0px_18px_40px_rgba(0,0,0,0.12)] sm:px-5 sm:py-6 md:px-[30px] md:py-[26px]">
              <p className="about-card-text font-['Montserrat'] font-semibold text-[#666666]">
                SRIRAM&apos;s IAS is one of the premier institutions for
                Preparation of UPSC Civil Services Examination. Established in
                1985 by Sriram Sir, a visionary mentor and academician, the
                institute has grown into a trusted name in Civil Services
                coaching, known for its academic excellence and unwavering
                commitment to aspirants&apos; success.
              </p>
            </div>

            <div className="about-text-card about-text-card--two rounded-[12px] bg-white px-4 py-5 shadow-[0px_4px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#F7F3ED] hover:shadow-[0px_18px_40px_rgba(0,0,0,0.12)] sm:px-5 sm:py-6 md:px-[30px] md:py-[26px]">
              <p className="about-card-text font-['Montserrat'] font-semibold text-[#666666]">
                We believe that preparation for the Civil Services is more than
                a career choice, it is a journey towards leadership and public
                service. The hallmark of SRIRAM&apos;s IAS lies in its
                student-first approach. Every aspect of the program is designed
                to benefit the aspirants i.e. from meticulously planned lectures
                and updated study materials to a dynamic assessment methodology
                that keeps preparation on track.
              </p>
            </div>

            <div className="about-text-card about-text-card--three rounded-[12px] bg-white px-4 py-5 shadow-[0px_4px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#F7F3ED] hover:shadow-[0px_18px_40px_rgba(0,0,0,0.12)] sm:px-5 sm:py-6 md:px-[30px] md:py-[26px]">
              <p className="about-card-text font-['Montserrat'] font-semibold text-[#666666]">
                The distinguished faculty team comprises highly experienced
                educators, retired bureaucrats, and subject knowledge experts
                who ensure conceptual clarity and exam-oriented focus across all
                stages i.e. Prelims, Mains and Interview. With Centers in New
                Delhi, Hyderabad and Pune, we make sure to provide accessible
                guidance to students across the country. With 40 years of
                Excellence, and a proven track record, we remain dedicated to
                guiding aspirants with the clarity, conviction and care they
                deserve. Our legacy is built on a foundation of rigorous
                academic standards combined with personalized mentorship.
              </p>
            </div>
          </div>

          <div className="about-circle-network relative mx-auto mt-4 w-full min-w-0 max-w-[340px] shrink-0 overflow-visible sm:max-w-[480px] md:max-w-[560px] lg:mx-0 lg:mt-[48px] lg:max-w-none lg:w-full xl:mt-[170px] xl:max-w-[627px]">
            <div className="about-network-stage relative w-full" style={{ aspectRatio: "627 / 594" }}>
              <div className="about-line about-line-left absolute left-[50%] top-[22%] hidden h-[42%] w-[4px] origin-top -translate-x-1/2 rotate-[32deg] rounded-full bg-gradient-to-b from-[#2D9CDB] via-[#8C87B7] to-[#D86D7B] sm:block" />
              <div className="about-line about-line-right absolute left-[50%] top-[22%] hidden h-[42%] w-[4px] origin-top -translate-x-1/2 rotate-[-32deg] rounded-full bg-gradient-to-b from-[#2D9CDB] via-[#8C87B7] to-[#D86D7B] sm:block" />
              <div className="about-line about-line-middle absolute left-[50%] top-[58%] z-[5] hidden h-[5px] w-[48%] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2D9CDB] via-[#8C87B7] to-[#D86D7B] sm:block" />
              {circleImages.map((item, index) => {
                const positionIndex =
                  (index + activeIndex) % imagePositions.length;
                const position = imagePositions[positionIndex];

                return (
                  <div
                    key={item.src}
                    className="about-floating-circle absolute z-10 aspect-square w-[31.5%] overflow-hidden rounded-full shadow-[0px_14px_35px_rgba(0,0,0,0.16)] transition-all duration-[900ms] ease-in-out hover:scale-105"
                    style={{
                      left: position.left,
                      top: position.top,
                      transform: position.transform,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 200px"
                      className="object-contain object-center"
                      style={{ objectPosition: item.objectPosition }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          .about-section-bg {
            background:
              radial-gradient(
                circle at 0% 14%,
                rgba(209, 237, 253, 0.72) 0%,
                rgba(234, 247, 255, 0.88) 18%,
                transparent 34%
              ),
              radial-gradient(
                circle at 100% 39%,
                rgba(209, 237, 253, 0.72) 0%,
                rgba(234, 247, 255, 0.88) 18%,
                transparent 35%
              ),
              linear-gradient(
                180deg,
                #eaf7ff 0%,
                #eef8ff 12%,
                #f8fcff 36%,
                #eef8ff 100%
              );
          }

          .about-left-cards {
            transform: none;
            max-width: 677px;
            width: 100%;
            padding-top: 12px;
            margin: 0 auto;
          }

          .about-circle-network {
            transform: none;
            margin-left: auto;
            margin-right: auto;
          }

          .about-text-card {
            cursor: pointer;
            width: 100%;
            max-width: 677px;
            margin-left: auto;
            margin-right: auto;
          }

          .about-text-card--one {
            min-height: auto;
            margin-bottom: 0;
          }

          .about-text-card--two {
            min-height: auto;
            margin-top: 0;
          }

          .about-text-card--three {
            min-height: auto;
          }

          .about-card-text {
            font-size: clamp(14px, 2.8vw, 15px);
            line-height: clamp(26px, 5.2vw, 30px);
            font-weight: 600;
          }

          .about-network-stage {
            width: 100%;
          }

          .side-circle-left {
            position: absolute;
            left: -150px;
            top: -28px;
            width: 310px;
            height: 310px;
            border-radius: 50%;
            z-index: 2;
            background:
              radial-gradient(
                circle at 68% 38%,
                rgba(255, 255, 255, 0.76) 0%,
                rgba(218, 241, 255, 0.82) 28%,
                rgba(196, 229, 249, 0.68) 62%,
                rgba(196, 229, 249, 0.18) 100%
              );
            box-shadow:
              0 0 45px rgba(111, 192, 236, 0.28),
              inset 20px 18px 45px rgba(255, 255, 255, 0.55),
              inset -18px -18px 45px rgba(94, 177, 224, 0.18);
            animation: softCircleGlow 3.8s ease-in-out infinite alternate;
          }

          .side-circle-right {
            position: absolute;
            right: -145px;
            top: 120px;
            width: 320px;
            height: 320px;
            border-radius: 50%;
            z-index: 2;
            background:
              radial-gradient(
                circle at 32% 36%,
                rgba(255, 255, 255, 0.76) 0%,
                rgba(218, 241, 255, 0.82) 30%,
                rgba(196, 229, 249, 0.68) 64%,
                rgba(196, 229, 249, 0.18) 100%
              );
            box-shadow:
              0 0 45px rgba(111, 192, 236, 0.28),
              inset -20px 18px 45px rgba(255, 255, 255, 0.55),
              inset 18px -18px 45px rgba(94, 177, 224, 0.18);
            animation: softCircleGlow 4.2s ease-in-out infinite alternate;
          }

          @keyframes softCircleGlow {
            0% {
              opacity: 0.72;
              transform: scale(1);
              filter: brightness(1);
            }
            100% {
              opacity: 0.96;
              transform: scale(1.025);
              filter: brightness(1.04);
            }
          }

          .bottom-wave-lines {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 430px;
            z-index: 1;
            background-image: url("/assets/about/about-us/background-anime-2.png");
            background-size: 120% 1120px;
            background-repeat: no-repeat;
            background-position: 0% bottom;
            opacity: 1;
            animation: bottomWaveDrift 18s linear infinite;
          }

          @keyframes bottomWaveDrift {
            0% {
              background-position: 0% bottom;
            }
            100% {
              background-position: 100% bottom;
            }
          }

          .clean-orbit-wrap {
            position: absolute;
            left: 235px;
            top: -650px;
            width: 900px;
            height: 900px;
            z-index: 4;
            pointer-events: none;
          }

          .clean-orbit {
            position: absolute;
            border-radius: 50%;
            border: 2px solid rgba(133, 151, 255, 0.26);
          }

          .clean-orbit-one {
            inset: 0;
          }

          .clean-orbit-two {
            inset: 110px;
            border-color: rgba(133, 151, 255, 0.2);
          }

          .clean-dot {
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 50%;
            background: #18a8e8;
            border: 4px solid #dff6ff;
            box-shadow:
              0 0 0 8px rgba(24, 168, 232, 0.15),
              0 0 18px rgba(24, 168, 232, 0.6);
          }

          .clean-dot-one {
            width: 17px;
            height: 17px;
            margin-left: -8.5px;
            margin-top: -8.5px;
            animation: rotateDotOne 6s linear infinite;
          }

          .clean-dot-two {
            width: 11px;
            height: 11px;
            margin-left: -5.5px;
            margin-top: -5.5px;
            animation: rotateDotTwo 7s linear infinite;
          }

          @keyframes rotateDotOne {
            0% {
              transform: rotate(15deg) translateX(450px) rotate(-15deg);
            }
            100% {
              transform: rotate(375deg) translateX(450px) rotate(-375deg);
            }
          }

          @keyframes rotateDotTwo {
            0% {
              transform: rotate(190deg) translateX(340px) rotate(-190deg);
            }
            100% {
              transform: rotate(550deg) translateX(340px) rotate(-550deg);
            }
          }

          @media (min-width: 768px) {
            .about-card-text {
              font-size: clamp(15px, 1.8vw, 16px);
              line-height: clamp(28px, 3.4vw, 32px);
            }
          }

          @media (min-width: 1280px) {
            .about-card-text {
              font-size: 17px;
              line-height: 36px;
            }

            .about-left-cards {
              transform: translateX(42px);
              margin: 0;
            }

            .about-circle-network {
              transform: translateX(45px);
              width: 627px;
              max-width: 627px;
              margin-left: 0;
              margin-right: 0;
            }

            .about-text-card--one {
              margin-bottom: 16px;
            }

            .about-text-card--two {
              margin-top: 28px;
            }

            .about-text-card--three {
              padding-bottom: 22px !important;
            }

            .about-line-left,
            .about-line-right {
              width: 5px;
            }

            .about-line-middle {
              top: 58%;
              width: 44%;
              height: 6px;
            }

            .clean-orbit-wrap {
              left: 235px;
              top: -650px;
            }
          }

          @media (min-width: 1024px) and (max-width: 1279px) {
            .about-left-cards {
              transform: none;
              margin: 0;
              max-width: 100%;
              width: 100%;
              padding-top: 8px;
            }

            .about-text-card {
              margin-left: 0;
              margin-right: 0;
              max-width: 100%;
            }

            .about-text-card--one {
              margin-bottom: 10px;
            }

            .about-text-card--two {
              margin-top: 12px;
            }

            .about-text-card--three {
              padding-bottom: 18px !important;
            }

            .about-card-text {
              font-size: 14px;
              line-height: 26px;
            }

            .about-circle-network {
              transform: none;
              margin-left: 0;
              margin-right: 0;
              margin-top: 48px;
              width: 100%;
              max-width: 100%;
            }

            .about-network-stage {
              max-width: 100%;
            }

            .clean-orbit-wrap {
              left: 60px;
              top: -620px;
              transform: scale(0.72);
              transform-origin: top left;
            }

            .bottom-wave-lines {
              background-size: 130% 1120px;
            }

            .side-circle-left {
              left: -100px;
              width: 220px;
              height: 220px;
            }

            .side-circle-right {
              right: -100px;
              width: 230px;
              height: 230px;
            }
          }

          @media (max-width: 1279px) {
            .side-circle-left {
              left: -120px;
              width: 260px;
              height: 260px;
            }

            .side-circle-right {
              right: -120px;
              width: 270px;
              height: 270px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .bottom-wave-lines {
              animation: none;
            }
          }

          @media (max-width: 1023px) {
            .about-left-cards,
            .about-circle-network {
              transform: none;
            }

            .clean-orbit-wrap {
              display: none;
            }

            .bottom-wave-lines {
              background-size: 160% auto;
            }

            .side-circle-left,
            .side-circle-right {
              display: none;
            }
          }

          @media (max-width: 767px) {
            .about-section-bg {
              min-height: auto;
            }

            .about-main-grid {
              max-width: 100% !important;
            }

            .about-line-left,
            .about-line-right,
            .about-line-middle {
              display: block;
            }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
