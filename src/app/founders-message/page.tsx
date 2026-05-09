'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const FoundersMessagePage = () => {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />

      {/* HERO BANNER - SAME HEIGHT LIKE ABOUT US */}
      <section className="relative w-full h-[430px] overflow-hidden">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="Founder's Message Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Left side dark only */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 18%, rgba(0,0,0,0.32) 34%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0) 68%)',
          }}
        />

        <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-[88px] pt-[80px]">
          <h1 className="founder-hero-heading">FOUNDER&apos;S MESSAGE</h1>
        </div>
      </section>

      {/* FOUNDER MESSAGE SECTION */}
      <section className="relative bg-[#f8fbff] overflow-hidden min-h-[960px]">
        <div className="absolute inset-0 founder-page-bg" />

        <div className="founder-moving-bg">
          <Image
            src="/assets/about/founder's-message/background-animation-founder.png"
            alt="Founder background animation"
            fill
            sizes="75vw"
            className="object-cover object-right"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-[28px] xl:px-[36px] py-[34px] lg:py-[38px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.62fr_0.58fr] gap-0 lg:gap-8 xl:gap-10 items-start">
            {/* LEFT DIALOG BOX */}
            <div className="relative z-20 lg:-ml-[10px] xl:-ml-[18px]">
              <div className="dialog-box-wrap">
                <Image
                  src="/assets/about/founder's-message/dialog-box.png"
                  alt="Founder message dialog box"
                  fill
                  priority
                  sizes="1120px"
                  className="object-fill"
                />

                <div className="dialog-text-content">
                  <p>
                    Dear Aspiring Civil Servants, Welcome to SRIRAM&apos;s IAS,
                    a place where dreams of public service take shape and where
                    your commitments meet our decades of experience.
                  </p>

                  <p>
                    By choosing this path, you&apos;ve already shown courage,
                    clarity, and a deep sense of purpose to serve the Nation.
                    The journey to becoming a Civil Servant is one of the most
                    challenging and rewarding which you can undertake in your
                    career. At SRIRAM&apos;s IAS, we stand by you at every step
                    of your journey towards success.
                  </p>

                  <p>
                    At SRIRAM&apos;s IAS, we believe preparation for the UPSC
                    Civil Services Examinations (CSE) isn&apos;t just about
                    clearing an exam, it&apos;s about shaping the administrators
                    that India needs. That&apos;s why our ecosystem is built not
                    just on knowledge, but on mentorship, innovation and
                    transformation. At SRIRAM&apos;s IAS, we&apos;re not just
                    preparing you for an exam, but also for a life of leadership
                    and service.
                  </p>

                  <p className="welcome-text">
                    Welcome to SRIRAM&apos;s IAS, Let&apos;s begin!
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FOUNDER IMAGE */}
            <div className="relative z-30 flex flex-col items-center right-founder-col">
              <div className="founder-photo-wrap">
                <div className="founder-circle-mask">
                  <Image
                    src="/assets/about/founder's-message/Sriram Sir_Founder page1.png"
                    alt="Sriram Srirangam Founder"
                    fill
                    priority
                    sizes="650px"
                    className="founder-main-img"
                  />
                </div>
              </div>

              {/* TEXT OUTSIDE CIRCLE */}
              <div className="text-center founder-details">
                <h2 className="best-wishes-text">Best Wishes</h2>
                <h3 className="founder-name">Sriram Srirangam</h3>
                <p className="founder-role">Founder</p>
                <p className="founder-brand">SRIRAM&apos;s IAS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .founder-hero-heading {
          font-size: clamp(42px, 5vw, 70px);
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 32%,
            #a7a6ff 55%,
            #817bf3 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .founder-page-bg {
          background:
            radial-gradient(
              circle at 0% 18%,
              rgba(255, 246, 230, 0.95) 0%,
              rgba(255, 255, 255, 0.82) 34%,
              transparent 58%
            ),
            linear-gradient(
              100deg,
              #fffaf2 0%,
              #ffffff 36%,
              #e8f6ff 100%
            );
        }

        .founder-moving-bg {
          position: absolute;
          right: -90px;
          top: 0;
          bottom: 0;
          width: 66%;
          opacity: 0.9;
          pointer-events: none;
          animation: founderBgMove 5s ease-in-out infinite alternate;
          transform-origin: right center;
        }

        @keyframes founderBgMove {
          0% {
            transform: translateX(0px) translateY(0px) scale(1);
          }

          100% {
            transform: translateX(-22px) translateY(16px) scale(1.045);
          }
        }

        .dialog-box-wrap {
          position: relative;
          width: 100%;
          max-width: 1125px;
          height: 820px;
          overflow: visible;
        }

        .dialog-text-content {
          position: relative;
          z-index: 2;
          padding: 72px 112px 126px 112px;
          color: #4f5b63;
          font-size: 18.2px !important;
          line-height: 1.76 !important;
          font-weight: 600 !important;
          letter-spacing: 0 !important;
        }

        .dialog-text-content p {
          margin-bottom: 34px !important;
          font-size: 18.2px !important;
          line-height: 1.76 !important;
          font-weight: 600 !important;
          letter-spacing: 0 !important;
          color: #4f5b63 !important;
        }

        .welcome-text {
          text-align: center;
          margin-bottom: 0 !important;
        }

        .right-founder-col {
          padding-top: 0;
          margin-left: -20px;
          margin-top: -20px;
        }

        .founder-photo-wrap {
          position: relative;
          width: 590px;
          height: 540px;
          overflow: visible;
        }

        .founder-circle-mask {
          position: relative;
          width: 455px;
          height: 455px;
          margin: 95px auto 0 auto;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #149fda 0%,
            #239bd6 42%,
            #d87082 100%
          );
        }

        .founder-main-img {
          object-fit: contain;
          object-position: center bottom;
          transform: scale(1.62) translateY(38px);
          transform-origin: center bottom;
        }

        .founder-details {
          margin-top: 54px;
          position: relative;
          z-index: 12;
        }

        .best-wishes-text {
          font-size: 38px;
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(
            90deg,
            #159fda 0%,
            #3b98d5 34%,
            #9383bf 62%,
            #d66f7c 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .founder-name {
          margin-top: 14px;
          font-size: 38px;
          line-height: 1.15;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #4d5660;
        }

        .founder-role {
          margin-top: 16px;
          font-size: 28px;
          line-height: 1.2;
          font-weight: 800;
          color: #56616b;
        }

        .founder-brand {
          margin-top: 14px;
          font-size: 28px;
          line-height: 1.2;
          font-weight: 900;
          color: #4f5964;
        }

        @media (min-width: 1280px) and (max-width: 1450px) {
          .dialog-box-wrap {
            max-width: 1060px;
            height: 785px;
          }

          .dialog-text-content {
            padding: 66px 98px 116px 98px;
            font-size: 17.2px !important;
            line-height: 1.74 !important;
          }

          .dialog-text-content p {
            font-size: 17.2px !important;
            line-height: 1.74 !important;
            margin-bottom: 31px !important;
          }

          .right-founder-col {
            margin-left: -16px;
            margin-top: -18px;
          }

          .founder-photo-wrap {
            width: 560px;
            height: 515px;
          }

          .founder-circle-mask {
            width: 430px;
            height: 430px;
            margin: 88px auto 0 auto;
          }

          .founder-main-img {
            transform: scale(1.58) translateY(36px);
          }

          .founder-details {
            margin-top: 50px;
          }

          .best-wishes-text {
            font-size: 35px;
          }

          .founder-name {
            font-size: 36px;
          }

          .founder-role,
          .founder-brand {
            font-size: 26px;
          }
        }

        @media (max-width: 1279px) {
          .dialog-box-wrap {
            max-width: 920px;
            height: 730px;
          }

          .dialog-text-content {
            padding: 58px 78px 92px 78px;
            font-size: 16px !important;
            line-height: 1.7 !important;
            font-weight: 600 !important;
          }

          .dialog-text-content p {
            font-size: 16px !important;
            line-height: 1.7 !important;
            font-weight: 600 !important;
            margin-bottom: 28px !important;
          }

          .right-founder-col {
            padding-top: 16px;
            margin-left: 0;
            margin-top: -12px;
          }

          .founder-photo-wrap {
            width: 500px;
            height: 450px;
          }

          .founder-circle-mask {
            width: 390px;
            height: 390px;
            margin: 78px auto 0 auto;
          }

          .founder-main-img {
            transform: scale(1.52) translateY(32px);
          }

          .founder-details {
            margin-top: 44px;
          }

          .best-wishes-text {
            font-size: 31px;
          }

          .founder-name {
            font-size: 32px;
          }

          .founder-role,
          .founder-brand {
            font-size: 24px;
          }
        }

        @media (max-width: 1023px) {
          .founder-moving-bg {
            width: 100%;
            right: -160px;
            opacity: 0.45;
          }

          .dialog-box-wrap {
            max-width: 100%;
            height: auto;
            background: linear-gradient(
              135deg,
              rgba(221, 246, 255, 0.94) 0%,
              rgba(202, 238, 252, 0.94) 48%,
              rgba(184, 230, 250, 0.98) 100%
            );
            border-radius: 70px;
          }

          .dialog-box-wrap > :global(img) {
            display: none;
          }

          .dialog-text-content {
            padding: 42px 40px;
            font-size: 15px !important;
            line-height: 1.65 !important;
            font-weight: 500 !important;
          }

          .dialog-text-content p {
            font-size: 15px !important;
            line-height: 1.65 !important;
            font-weight: 500 !important;
            margin-bottom: 18px !important;
          }

          .right-founder-col {
            padding-top: 30px;
            margin-left: 0;
            margin-top: 0;
          }
        }

        @media (max-width: 640px) {
          .dialog-box-wrap {
            border-radius: 38px;
          }

          .dialog-text-content {
            padding: 32px 22px;
            font-size: 13px !important;
            line-height: 1.6 !important;
            font-weight: 500 !important;
          }

          .dialog-text-content p {
            font-size: 13px !important;
            line-height: 1.6 !important;
            font-weight: 500 !important;
          }

          .founder-photo-wrap {
            width: 360px;
            height: 350px;
          }

          .founder-circle-mask {
            width: 285px;
            height: 285px;
            margin: 58px auto 0 auto;
          }

          .founder-main-img {
            transform: scale(1.46) translateY(26px);
          }

          .founder-details {
            margin-top: 32px;
          }

          .best-wishes-text {
            font-size: 28px;
          }

          .founder-name {
            font-size: 29px;
          }

          .founder-role,
          .founder-brand {
            font-size: 23px;
          }
        }
      `}</style>
    </main>
  );
};

export default FoundersMessagePage;