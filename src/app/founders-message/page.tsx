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
      <section className="relative w-full h-[390px] overflow-hidden">
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

        <div className="relative z-10 h-full flex items-start px-6 sm:px-10 lg:px-[88px] pt-[210px]">
          <h1 className="founder-hero-heading">FOUNDER&apos;S MESSAGE</h1>
        </div>
      </section>

      {/* FOUNDER MESSAGE SECTION */}
      <section className="relative bg-[#f8fbff] overflow-hidden min-h-[820px]">
        <div className="absolute inset-0 founder-page-bg" />

        <div className="founder-moving-bg">
          <Image
            src="/assets/about/founder's-message/background-animation-founder.png"
            alt="Founder background animation"
            fill
            sizes="80vw"
            className="object-cover object-right"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1366px] mx-auto px-0 pt-[62px] pb-[90px]">
          <div className="founder-main-grid">
            {/* LEFT DIALOG BOX */}
            <div className="relative z-20 dialog-left-col">
              <div className="dialog-box-wrap">
                <Image
                  src="/assets/about/founder's-message/dialog-box.png"
                  alt="Founder message dialog box"
                  fill
                  priority
                  sizes="850px"
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
            <div className="relative z-30 right-founder-col">
              <div className="founder-photo-wrap">
                <Image
                  src="/assets/about/founder's-message/sriram-founder.png"
                  alt="Sriram Srirangam Founder"
                  fill
                  priority
                  sizes="465px"
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
              rgba(255, 246, 230, 0.96) 0%,
              rgba(255, 255, 255, 0.86) 34%,
              transparent 58%
            ),
            linear-gradient(
              100deg,
              #fffaf2 0%,
              #ffffff 35%,
              #e8f6ff 100%
            );
        }

        .founder-moving-bg {
          position: absolute;
          right: -28px;
          top: 0;
          bottom: 0;
          width: 68%;
          opacity: 0.95;
          pointer-events: none;
          animation: founderBgMove 5s ease-in-out infinite alternate;
          transform-origin: right center;
        }

        @keyframes founderBgMove {
          0% {
            transform: translateX(0px) translateY(0px) scale(1);
          }

          100% {
            transform: translateX(-16px) translateY(10px) scale(1.025);
          }
        }

        .founder-main-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 850px 465px;
          align-items: start;
          justify-content: center;
          column-gap: 12px;
        }

        .dialog-left-col {
          margin-top: 0;
          transform: translateX(-8px);
        }

        /* DIALOG WIDTH DECREASED */
        .dialog-box-wrap {
          position: relative;
          width: 850px;
          height: 760px;
          overflow: visible;
        }

        /* TEXT WIDTH DECREASED TO FIT INSIDE SMALLER DIALOG */
        .dialog-text-content {
          position: relative;
          z-index: 2;
          width: 755px;
          max-width: 755px;
          padding: 74px 20px 170px 82px;
          color: #4d5961;
          font-size: 17px !important;
          line-height: 1.85 !important;
          font-weight: 700 !important;
          letter-spacing: 0 !important;
          box-sizing: border-box;
        }

        .dialog-text-content p {
          margin-bottom: 42px !important;
          font-size: 17px !important;
          line-height: 1.85 !important;
          font-weight: 700 !important;
          letter-spacing: 0 !important;
          color: #4d5961 !important;
        }

        .dialog-text-content p:nth-child(2) {
          margin-bottom: 42px !important;
        }

        .dialog-text-content p:nth-child(3) {
          margin-bottom: 12px !important;
        }

        .welcome-text {
          text-align: center;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          white-space: nowrap;
          padding-right: 40px;
        }

        .right-founder-col {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateX(6px);
        }

        .founder-photo-wrap {
          position: relative;
          width: 465px;
          height: 465px;
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
        }

        .best-wishes-text {
          font-size: 33px;
          line-height: 1.05;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(
            90deg,
            #159fda 0%,
            #3b98d5 32%,
            #9383bf 62%,
            #d66f7c 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .founder-name {
          margin-top: 17px;
          font-size: 34px;
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #4d5660;
        }

        .founder-role {
          margin-top: 21px;
          font-size: 26px;
          line-height: 1.15;
          font-weight: 800;
          color: #56616b;
        }

        .founder-brand {
          margin-top: 22px;
          font-size: 25px;
          line-height: 1.15;
          font-weight: 900;
          color: #4f5964;
        }

        @media (min-width: 1280px) and (max-width: 1450px) {
          .founder-main-grid {
            grid-template-columns: 840px 450px;
            column-gap: 10px;
          }

          .dialog-left-col {
            transform: translateX(-6px);
          }

          .dialog-box-wrap {
            width: 840px;
            height: 760px;
          }

          .dialog-text-content {
            width: 745px;
            max-width: 745px;
            padding: 72px 20px 170px 82px;
            font-size: 16.8px !important;
            line-height: 1.82 !important;
            box-sizing: border-box;
          }

          .dialog-text-content p {
            font-size: 16.8px !important;
            line-height: 1.82 !important;
            margin-bottom: 40px !important;
          }

          .dialog-text-content p:nth-child(2) {
            margin-bottom: 40px !important;
          }

          .dialog-text-content p:nth-child(3) {
            margin-bottom: 12px !important;
          }

          .right-founder-col {
            margin-top: 8px;
            transform: translateX(4px);
          }

          .founder-photo-wrap {
            width: 450px;
            height: 450px;
          }

          .founder-details {
            margin-top: 26px;
          }

          .best-wishes-text {
            font-size: 31px;
          }

          .founder-name {
            font-size: 32px;
          }

          .founder-role {
            font-size: 25px;
          }

          .founder-brand {
            font-size: 24px;
          }
        }

        @media (max-width: 1279px) {
          .founder-main-grid {
            grid-template-columns: 1fr;
            row-gap: 30px;
            padding: 0 24px;
          }

          .dialog-left-col {
            transform: translateX(0);
          }

          .dialog-box-wrap {
            width: 100%;
            max-width: 850px;
            height: 760px;
            margin: 0 auto;
          }

          .dialog-text-content {
            width: 88%;
            max-width: 755px;
            padding: 72px 20px 170px 82px;
            font-size: 16.5px !important;
            line-height: 1.78 !important;
            font-weight: 700 !important;
            box-sizing: border-box;
          }

          .dialog-text-content p {
            font-size: 16.5px !important;
            line-height: 1.78 !important;
            font-weight: 700 !important;
            margin-bottom: 36px !important;
          }

          .right-founder-col {
            margin-top: 8px;
            transform: translateX(0);
          }

          .founder-photo-wrap {
            width: 450px;
            height: 450px;
          }

          .founder-details {
            margin-top: 26px;
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
            border-radius: 64px;
          }

          .dialog-box-wrap > :global(img) {
            display: none;
          }

          .dialog-text-content {
            width: 100%;
            max-width: 100%;
            padding: 42px 40px 42px;
            font-size: 14.5px !important;
            line-height: 1.65 !important;
            font-weight: 600 !important;
          }

          .dialog-text-content p {
            font-size: 14.5px !important;
            line-height: 1.65 !important;
            font-weight: 600 !important;
            margin-bottom: 18px !important;
          }

          .welcome-text {
            white-space: normal;
            padding-right: 0;
          }

          .founder-photo-wrap {
            width: 350px;
            height: 350px;
          }

          .founder-details {
            margin-top: 22px;
          }

          .best-wishes-text {
            font-size: 28px;
          }

          .founder-name {
            font-size: 29px;
          }

          .founder-role {
            font-size: 22px;
          }

          .founder-brand {
            font-size: 22px;
          }
        }

        @media (max-width: 640px) {
          .founder-main-grid {
            row-gap: 16px;
            padding: 0 16px;
          }

          .dialog-box-wrap {
            border-radius: 36px;
          }

          .dialog-text-content {
            padding: 30px 22px 30px;
            font-size: 12.5px !important;
            line-height: 1.6 !important;
            font-weight: 600 !important;
          }

          .dialog-text-content p {
            font-size: 12.5px !important;
            line-height: 1.6 !important;
            font-weight: 600 !important;
            margin-bottom: 14px !important;
          }

          .founder-photo-wrap {
            width: 285px;
            height: 285px;
          }

          .founder-details {
            margin-top: 20px;
          }

          .best-wishes-text {
            font-size: 23px;
          }

          .founder-name {
            font-size: 24px;
          }

          .founder-role,
          .founder-brand {
            font-size: 18px;
          }
        }
      `}</style>
    </main>
  );
};

export default FoundersMessagePage;