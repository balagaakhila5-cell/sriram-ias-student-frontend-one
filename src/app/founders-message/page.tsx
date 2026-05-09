'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const FoundersMessagePage = () => {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />

      {/* HERO BANNER */}
      <section className="relative w-full h-[360px] overflow-hidden">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="Founder's Message Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

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
      <section className="relative bg-[#f8fbff] overflow-hidden min-h-[980px]">
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

        <div className="relative z-10 w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-[18px] xl:px-[22px] py-[24px] lg:py-[26px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.64fr_0.56fr] gap-0 lg:gap-4 xl:gap-6 items-start">
            {/* LEFT DIALOG BOX */}
            <div className="relative z-20 lg:ml-[28px] xl:ml-[45px]">
              <div className="dialog-box-wrap">
                <Image
                  src="/assets/about/founder's-message/dialog-box.png"
                  alt="Founder message dialog box"
                  fill
                  priority
                  sizes="1250px"
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
                <Image
                  src="/assets/about/founder's-message/sriram-founder.png"
                  alt="Sriram Srirangam Founder"
                  fill
                  priority
                  sizes="610px"
                  className="founder-main-img"
                />
              </div>

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
          max-width: 1250px;
          height: 900px;
          overflow: visible;
        }

        .dialog-text-content {
          position: relative;
          z-index: 2;
          padding: 72px 128px 95px 112px;
          color: #4f5b63;
          font-size: 18px !important;
          line-height: 1.86 !important;
          font-weight: 600 !important;
          letter-spacing: 0 !important;
        }

        .dialog-text-content p {
          margin-bottom: 34px !important;
          font-size: 18px !important;
          line-height: 1.86 !important;
          font-weight: 600 !important;
          letter-spacing: 0 !important;
          color: #4f5b63 !important;
        }

        .welcome-text {
          text-align: center;
          margin-bottom: 0 !important;
        }

        .right-founder-col {
          margin-left: -34px;
          margin-top: 0;
          transform: translateX(62px);
        }

        .founder-photo-wrap {
          position: relative;
          width: 610px;
          height: 570px;
          overflow: visible;
        }

        .founder-main-img {
          object-fit: contain;
          object-position: center center;
        }

        .founder-details {
          margin-top: 8px;
          position: relative;
          z-index: 12;
        }

        .best-wishes-text {
          font-size: 40px;
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
          margin-top: 16px;
          font-size: 40px;
          line-height: 1.15;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #4d5660;
        }

        .founder-role {
          margin-top: 18px;
          font-size: 29px;
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
            max-width: 1210px;
            height: 880px;
          }

          .dialog-text-content {
            padding: 66px 118px 92px 104px;
            font-size: 17.4px !important;
            line-height: 1.84 !important;
          }

          .dialog-text-content p {
            font-size: 17.4px !important;
            line-height: 1.84 !important;
            margin-bottom: 32px !important;
          }

          .right-founder-col {
            margin-left: -28px;
            margin-top: 0;
            transform: translateX(68px);
          }

          .founder-photo-wrap {
            width: 585px;
            height: 545px;
          }

          .founder-details {
            margin-top: 6px;
          }

          .best-wishes-text {
            font-size: 38px;
          }

          .founder-name {
            font-size: 38px;
          }

          .founder-role {
            font-size: 28px;
          }

          .founder-brand {
            font-size: 27px;
          }
        }

        @media (max-width: 1279px) {
          .dialog-box-wrap {
            max-width: 940px;
            height: 820px;
          }

          .dialog-text-content {
            padding: 62px 80px 95px 80px;
            font-size: 16px !important;
            line-height: 1.8 !important;
            font-weight: 600 !important;
          }

          .dialog-text-content p {
            font-size: 16px !important;
            line-height: 1.8 !important;
            font-weight: 600 !important;
            margin-bottom: 28px !important;
          }

          .right-founder-col {
            padding-top: 16px;
            margin-left: 0;
            margin-top: -8px;
            transform: translateX(0);
          }

          .founder-photo-wrap {
            width: 530px;
            height: 500px;
          }

          .founder-details {
            margin-top: 8px;
          }

          .best-wishes-text {
            font-size: 33px;
          }

          .founder-name {
            font-size: 34px;
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
            transform: translateX(0);
          }

          .founder-photo-wrap {
            width: 450px;
            height: 430px;
          }

          .founder-details {
            margin-top: 8px;
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
            height: 340px;
          }

          .founder-details {
            margin-top: 8px;
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