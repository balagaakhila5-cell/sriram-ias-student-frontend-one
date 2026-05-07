"use client";

import React from "react";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const AboutPage = () => {
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
      <section className="relative w-full overflow-hidden bg-[#F6FBFF] pt-[70px] pb-[110px]">
        {/* Moving background animation */}
        <div className="about-page-bg-motion absolute inset-0 pointer-events-none" />

        {/* Big background circles like Figma */}
        <div className="absolute right-[3%] top-[8%] h-[265px] w-[265px] rounded-full bg-[#DDF0FF]/75" />
        <div className="absolute right-[18%] top-[33%] h-[165px] w-[165px] rounded-full bg-[#EAF7FF]/85" />
        <div className="absolute left-[-5%] top-[24%] h-[215px] w-[215px] rounded-full bg-[#DDF0FF]/65" />

        <div className="relative z-10 grid w-full grid-cols-[720px_1fr] items-start gap-[40px] px-[24px]">
          {/* LEFT TEXT CARDS */}
          <div className="relative flex flex-col gap-[28px]">
            {/* Small blue dot/circle beside first text card like Figma */}
            <div className="absolute right-[-42px] top-[72px] z-20 h-[10px] w-[10px] rounded-full bg-[#3A9AD7]" />

            <div className="about-text-card rounded-[10px] bg-white px-[30px] py-[26px] shadow-[0px_8px_28px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.025] hover:bg-[#F0FAFF] hover:shadow-[0px_18px_40px_rgba(24,151,216,0.16)]">
              <p className="font-['Montserrat'] text-[18px] leading-[39px] font-semibold text-[#666666]">
                SRIRAM&apos;s IAS is one of the premier institutions for
                Preparation of UPSC Civil Services Examination. Established in
                1985 by Sriram Sir, a visionary mentor and academician, the
                institute has grown into a trusted name in Civil Services
                coaching, known for its academic excellence and unwavering
                commitment to aspirants&apos; success.
              </p>
            </div>

            <div className="about-text-card rounded-[10px] bg-white px-[30px] py-[26px] shadow-[0px_8px_28px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.025] hover:bg-[#FFF8F8] hover:shadow-[0px_18px_40px_rgba(185,93,99,0.16)]">
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

            <div className="about-text-card rounded-[10px] bg-white px-[30px] py-[26px] shadow-[0px_8px_28px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.025] hover:bg-[#F6FFF0] hover:shadow-[0px_18px_40px_rgba(111,142,59,0.16)]">
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
                mentorship. At SRIRAM&apos;s IAS, we believe that successful UPSC
                CSE preparation goes beyond memorizing facts, it requires a deep
                understanding of concepts, practical insights into governance
                and a holistic development of each candidate&apos;s skills.
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE NETWORK */}
          <div className="relative mt-[26px] h-[700px] w-full">
            {/* Small blue dot beside image network */}
            <div className="absolute left-[22px] top-[44px] h-[11px] w-[11px] rounded-full bg-[#3A9AD7]" />

            {/* Soft circles around top girl image like Figma */}
            <div className="absolute left-[50%] top-[-40px] h-[270px] w-[270px] -translate-x-[5%] rounded-full bg-[#DDF0FF]/80" />
            <div className="absolute left-[42%] top-[205px] h-[165px] w-[165px] rounded-full bg-[#EAF7FF]/90" />

            {/* Diagonal connector lines - behind images */}
            <div className="absolute left-[50%] top-[185px] h-[330px] w-[5px] origin-top rotate-[34deg] rounded-full bg-gradient-to-b from-[#D86D7B] via-[#8C87B7] to-[#2D9CDB]" />

            <div className="absolute left-[50%] top-[185px] h-[330px] w-[5px] origin-top rotate-[-34deg] rounded-full bg-gradient-to-b from-[#D86D7B] via-[#8C87B7] to-[#2D9CDB]" />

            {/* Bottom straight gradient line between bottom two images */}
            <div className="absolute left-[350px] top-[512px] h-[5px] w-[115px] rounded-full bg-gradient-to-r from-[#2D9CDB] via-[#B95D63] to-[#2D9CDB]" />

            {/* Top image */}
            <div className="absolute left-1/2 top-0 z-10 h-[245px] w-[245px] -translate-x-1/2 overflow-hidden rounded-full border-[9px] border-white shadow-[0px_15px_42px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-110">
              <Image
                src="/assets/about/about-us/Ellipse 56.png"
                alt="Student"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom left image */}
            <div className="absolute left-[105px] top-[390px] z-10 h-[245px] w-[245px] overflow-hidden rounded-full border-[9px] border-white shadow-[0px_15px_42px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-110">
              <Image
                src="/assets/about/about-us/Ellipse 57.png"
                alt="Classroom"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom right image */}
            <div className="absolute right-[105px] top-[390px] z-10 h-[245px] w-[245px] overflow-hidden rounded-full border-[9px] border-white shadow-[0px_15px_42px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-110">
              <Image
                src="/assets/about/about-us/Ellipse 58.png"
                alt="Classroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <style jsx global>{`
          .about-page-bg-motion {
            background-image: url("/assets/about/about-us/about-us-background-animation.png");
            background-size: 120% 120%;
            background-repeat: no-repeat;
            background-position: center bottom;
            opacity: 1;
            animation: aboutPageWaveMove 4s ease-in-out infinite alternate;
            will-change: transform, background-position;
          }

          @keyframes aboutPageWaveMove {
            0% {
              transform: translateX(-26px) translateY(16px) scale(1.05);
              background-position: left bottom;
            }

            50% {
              transform: translateX(26px) translateY(-14px) scale(1.08);
              background-position: center bottom;
            }

            100% {
              transform: translateX(-18px) translateY(12px) scale(1.06);
              background-position: right bottom;
            }
          }

          .about-text-card {
            cursor: pointer;
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;