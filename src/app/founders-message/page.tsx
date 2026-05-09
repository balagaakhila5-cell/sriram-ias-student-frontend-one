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

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[24px] xl:px-[28px] pt-[42px] pb-[10px]">
          <div className="founder-main-grid">
            {/* LEFT DIALOG BOX */}
            <div className="relative z-20 w-full dialog-left-col">
              <div className="dialog-box-wrap">
                <Image
                  src="/assets/about/founder's-message/dialog-box.png"
                  alt="Founder message dialog box"
                  fill
                  priority
                  sizes="880px"
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
                    Civil Services Examinations CSE isn&apos;t just about
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
                  sizes="640px"
                  className="founder-main-img"
                />
              </div>

              <div className="founder-details">
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

        .founder-main-grid {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(750px, 880px) minmax(430px, 540px);
          align-items: start;
          justify-content: center;
          column-gap: 0;
        }

        .dialog-left-col {
          margin-top: 34px;
        }

        .dialog-box-wrap {
          position: relative;
          width: 100%;
          max-width: 880px;
          height: 780px;
          overflow: visible;
        }

        .dialog-text-content {
          position: relative;
          z-index: 2;
          padding: 66px 96px 82px 92px;
          color: #4f5b63;
          font-size: 17.5px !important;
          line-height: 1.82 !important;
          font-weight: 600 !important;
          letter-spacing: 0 !important;
        }

        .dialog-text-content p {
          margin-bottom: 26px !important;
          font-size: 17.5px !important;
          line-height: 1.82 !important;
          font-weight: 600 !important;
          letter-spacing: 0 !important;
          color: #4f5b63 !important;
        }

        .welcome-text {
          text-align: center;
          margin-top: -4px !important;
          margin-bottom: 0 !important;
        }

        .right-founder-col {
          margin-left: 0;
          margin-top: 34px;
          transform: translateX(78px);
        }

        .founder-photo-wrap {
          position: relative;
          width: 640px;
          height: 610px;
          overflow: visible;
        }

        .founder-main-img {
          object-fit: contain;
          object-position: center center;
        }

        .founder-details {
          margin-top: 28px;
          position: relative;
          z-index: 12;
          width: 100%;
          text-align: center;
          transform: translateX(0);
        }

        .best-wishes-text {
          font-size: 36px;
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
          font-size: 37px;
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
          margin-top: 12px;
          font-size: 27px;
          line-height: 1.2;
          font-weight: 900;
          color: #4f5964;
        }

        @media (min-width: 1280px) and (max-width: 1450px) {
          .founder-main-grid {
            grid-template-columns: minmax(730px, 850px) minmax(390px, 500px);
            column-gap: 0;
          }

          .dialog-left-col {
            margin-top: 32px;
          }

          .dialog-box-wrap {
            max-width: 850px;
            height: 780px;
          }

          .dialog-text-content {
            padding: 64px 92px 80px 88px;
            font-size: 17px !important;
            line-height: 1.78 !important;
          }

          .dialog-text-content p {
            font-size: 17px !important;
            line-height: 1.78 !important;
            margin-bottom: 25px !important;
          }

          .right-founder-col {
            margin-top: 32px;
            transform: translateX(55px);
          }

          .founder-photo-wrap {
            width: 610px;
            height: 580px;
          }

          .founder-details {
            margin-top: 24px;
            width: 100%;
            text-align: center;
            transform: translateX(0);
          }

          .best-wishes-text {
            font-size: 35px;
          }

          .founder-name {
            font-size: 36px;
          }

          .founder-role {
            font-size: 27px;
          }

          .founder-brand {
            font-size: 26px;
          }
        }

        @media (max-width: 1279px) {
          .founder-main-grid {
            grid-template-columns: 1fr;
            row-gap: 20px;
          }

          .dialog-left-col {
            margin-top: 20px;
          }

          .dialog-box-wrap {
            max-width: 980px;
            height: 780px;
            margin: 0 auto;
          }

          .dialog-text-content {
            padding: 58px 82px 80px 82px;
            font-size: 16.5px !important;
            line-height: 1.75 !important;
            font-weight: 600 !important;
          }

          .dialog-text-content p {
            font-size: 16.5px !important;
            line-height: 1.75 !important;
            font-weight: 600 !important;
            margin-bottom: 22px !important;
          }

          .right-founder-col {
            padding-top: 16px;
            margin-left: 0;
            margin-top: 20px;
            transform: translateX(0);
          }

          .founder-photo-wrap {
            width: 580px;
            height: 550px;
          }

          .founder-details {
            margin-top: 18px;
            width: 100%;
            text-align: center;
            transform: translateX(0);
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
            margin-top: 20px;
            transform: translateX(0);
          }

          .founder-photo-wrap {
            width: 500px;
            height: 475px;
          }

          .founder-details {
            margin-top: 12px;
            width: 100%;
            text-align: center;
            transform: translateX(0);
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
            width: 380px;
            height: 360px;
          }

          .founder-details {
            margin-top: 8px;
            width: 100%;
            text-align: center;
            transform: translateX(0);
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