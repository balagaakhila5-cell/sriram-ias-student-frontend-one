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
    left: "160px",
    top: "0px",
  },
  {
    left: "20px",
    top: "360px",
  },
  {
    left: "325px",
    top: "360px",
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
      <section className="about-section-bg relative -mt-[1px] w-full overflow-hidden pt-[30px] pb-[35px] min-h-[1120px]">
        {/* LEFT / RIGHT SOFT BLUE CIRCLES WITH LIGHT EFFECT */}
        <div className="side-circle-left pointer-events-none" />
        <div className="side-circle-right pointer-events-none" />

        {/* BOTTOM WAVE LINES ONLY */}
        <div className="bottom-wave-lines pointer-events-none" />

        {/* ONLY 2 ROTATING BLUE DOT CIRCLE LINES */}
        <div className="clean-orbit-wrap pointer-events-none">
          <div className="clean-orbit clean-orbit-one">
            <span className="clean-dot clean-dot-one" />
          </div>

          <div className="clean-orbit clean-orbit-two">
            <span className="clean-dot clean-dot-two" />
          </div>
        </div>

        <div className="about-main-grid relative z-10 mx-auto grid w-full max-w-[1366px] grid-cols-[700px_650px] items-start justify-center gap-[20px] px-[20px]">
          {/* LEFT TEXT CARDS */}
          <div className="about-left-cards flex flex-col gap-[28px]">
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
            <div className="absolute left-[258px] top-[198px] h-[330px] w-[5px] origin-top rotate-[34deg] rounded-full bg-gradient-to-b from-[#D86D7B] via-[#8C87B7] to-[#2D9CDB]" />

            <div className="absolute left-[258px] top-[198px] h-[330px] w-[5px] origin-top rotate-[-34deg] rounded-full bg-gradient-to-b from-[#D86D7B] via-[#8C87B7] to-[#2D9CDB]" />

            <div className="absolute left-[260px] top-[500px] z-[5] h-[5px] w-[95px] rounded-full bg-gradient-to-r from-[#2D9CDB] via-[#B95D63] to-[#2D9CDB]" />

            {circleImages.map((item, index) => {
              const positionIndex =
                (index + activeIndex) % imagePositions.length;
              const position = imagePositions[positionIndex];

              return (
                <div
                  key={item.src}
                  className="absolute z-10 h-[245px] w-[245px] overflow-hidden rounded-full shadow-[0px_14px_35px_rgba(0,0,0,0.16)] transition-all duration-[900ms] ease-in-out hover:scale-105"
                  style={{
                    left: position.left,
                    top: position.top,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="245px"
                    className="object-cover scale-[1.08]"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <style jsx global>{`
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

          /* TEXT CARDS MOVED RIGHT */
          .about-left-cards {
            transform: translateX(42px);
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
            background-size: 100% 1120px;
            background-repeat: no-repeat;
            background-position: center bottom;
            opacity: 1;
          }

          /* HALF CIRCLE ORBITS MOVED UP */
          .clean-orbit-wrap {
            position: absolute;
            left: 235px;
            top: -650px;
            width: 900px;
            height: 900px;
            z-index: 4;
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

          .about-text-card {
            cursor: pointer;
          }

          @media (max-width: 1279px) {
            .about-left-cards {
              transform: translateX(24px);
            }

            .clean-orbit-wrap {
              left: 120px;
              top: -640px;
            }

            .bottom-wave-lines {
              background-size: 1440px 1120px;
            }
          }

          @media (max-width: 1023px) {
            .about-main-grid {
              grid-template-columns: 1fr !important;
            }

            .about-left-cards {
              transform: translateX(0);
            }

            .clean-orbit-wrap {
              display: none;
            }

            .bottom-wave-lines {
              background-size: cover;
            }

            .side-circle-left,
            .side-circle-right {
              display: none;
            }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;