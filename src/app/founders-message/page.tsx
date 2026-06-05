'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const FoundersMessagePage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Header />

      {/* HERO BANNER */}
      <section className="relative h-[280px] w-full overflow-hidden sm:h-[340px] md:h-[390px]">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="Founder's Message Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-black/95 via-black/75 to-transparent md:w-[55%]" />
        <div className="absolute inset-y-0 right-0 w-[38%] bg-gradient-to-l from-black/20 to-transparent" />

        <div className="relative z-10 flex h-full w-full min-w-0 items-end px-4 pb-8 sm:items-center sm:px-10 sm:pb-0 lg:px-[88px]">
          <h1 className="founder-hero-heading max-w-full break-words">
            FOUNDER&apos;S MESSAGE
          </h1>
        </div>
      </section>

      {/* FOUNDER MESSAGE SECTION */}
      <section className="founder-section relative overflow-x-hidden bg-[#f8fbff]">
        <div className="founder-page-bg absolute inset-0" />

        <div className="founder-moving-bg">
          <Image
            src="/assets/about/founder's-message/background-animation-founder.png"
            alt="Founder background animation"
            fill
            sizes="80vw"
            className="object-cover object-right"
          />
        </div>

        <div className="relative z-10 mx-auto w-full min-w-0 max-w-[1440px] box-border px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-[110px] lg:pt-[62px]">
          <div className="founder-main-grid">
            {/* LEFT — single message box */}
            <div className="dialog-left-col relative z-20 w-full min-w-0 max-w-full">
              <div className="dialog-box-wrap">
                <div className="dialog-box-bg" aria-hidden>
                  <Image
                    src="/assets/about/founder's-message/dialog-box.png"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1023px) 100vw, 803px"
                    className="object-fill"
                  />
                </div>

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

            {/* RIGHT FOUNDER */}
            <div className="right-founder-col relative z-30 w-full min-w-0 max-w-full">
              <div className="founder-photo-wrap">
                <Image
                  src="/assets/about/founder's-message/sriram-founder.png"
                  alt="Sriram Srirangam Founder"
                  fill
                  priority
                  sizes="(max-width: 768px) 78vw, 460px"
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
        .founder-section {
          --fm-dialog-w: min(803px, 100%);
          --fm-founder-group-w: min(608px, 100%);
          --fm-founder-photo: min(290px, 78vw);
          --fm-font-size: 16px;
          --fm-line-height: 26px;
        }

        @media (min-width: 640px) {
          .founder-section {
            --fm-founder-photo: min(340px, 72vw);
          }
        }

        @media (min-width: 1024px) {
          .founder-section {
            --fm-founder-photo: min(460px, 92%);
          }
        }

        .founder-hero-heading {
          font-size: clamp(22px, 6.5vw, 70px);
          line-height: 1.05;
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
            linear-gradient(100deg, #fffaf2 0%, #ffffff 35%, #e8f6ff 100%);
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
          display: grid;
          grid-template-columns: 1fr;
          align-items: start;
          justify-content: center;
          row-gap: clamp(28px, 5vw, 48px);
          width: 100%;
          max-width: 1411px;
          margin: 0 auto;
          min-width: 0;
        }

        @media (min-width: 1024px) {
          .founder-main-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            column-gap: clamp(12px, 2vw, 28px);
            row-gap: 0;
          }
        }

        .dialog-left-col {
          width: 100%;
          max-width: var(--fm-dialog-w);
          justify-self: end;
          min-width: 0;
        }

        /* Speech bubble — mobile-first: PNG stretches to text height */
        .dialog-box-wrap {
          position: relative;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          margin: 0 auto;
          display: block;
          overflow: hidden;
        }

        .dialog-box-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .dialog-text-content {
          position: relative;
          z-index: 2;
          display: block;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          margin: 0;
          padding: 26px 22px 50px 20px;
          color: #4d5961;
          font-family: 'Montserrat', sans-serif;
          font-size: 10.5px;
          line-height: 16px;
          font-weight: 600;
          overflow-wrap: break-word;
          word-break: break-word;
          hyphens: none;
        }

        .dialog-text-content p {
          margin: 0 0 9px;
          max-width: 100%;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          font-weight: inherit;
          color: inherit;
        }

        .dialog-text-content p:last-child {
          margin-bottom: 0;
        }

        .welcome-text {
          margin-top: 10px !important;
          text-align: center;
          white-space: normal;
        }

        @media (max-width: 360px) {
          .dialog-text-content {
            padding: 24px 18px 46px 18px;
            font-size: 10px;
            line-height: 15px;
          }

          .dialog-text-content p {
            margin-bottom: 8px;
          }
        }

        @media (min-width: 425px) {
          .dialog-text-content {
            padding: 28px 24px 54px 22px;
            font-size: 11px;
            line-height: 17px;
          }

          .dialog-text-content p {
            margin-bottom: 10px;
          }

          .welcome-text {
            margin-top: 12px !important;
          }
        }

        @media (min-width: 640px) {
          .dialog-text-content {
            padding: 32px 28px 60px 26px;
            font-size: 12px;
            line-height: 19px;
          }

          .dialog-text-content p {
            margin-bottom: 11px;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .dialog-text-content {
            padding: 36px 32px 68px 30px;
            font-size: 13px;
            line-height: 21px;
          }

          .founder-moving-bg {
            display: block;
            width: 55%;
            right: 0;
            opacity: 0.4;
            animation: none;
          }
        }

        @media (max-width: 767px) {
          .founder-moving-bg {
            display: none;
          }
        }

        /* Desktop: grid overlay, text + PNG share cell */
        @media (min-width: 1024px) {
          .dialog-box-wrap {
            display: grid;
            grid-template: 1fr / 1fr;
          }

          .dialog-box-wrap::before {
            content: '';
            grid-area: 1 / 1;
            width: 100%;
            padding-bottom: 92.53%;
            visibility: hidden;
            pointer-events: none;
          }

          .dialog-box-bg {
            position: relative;
            grid-area: 1 / 1;
            inset: auto;
            height: 100%;
            min-height: 100%;
            align-self: stretch;
            justify-self: stretch;
          }

          .dialog-text-content {
            grid-area: 1 / 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            width: 84.4%;
            margin: 0 auto;
            padding: clamp(28px, 9.2%, 68px) clamp(16px, 5%, 32px)
              clamp(48px, 22%, 164px) clamp(20px, 9%, 72px);
            font-size: var(--fm-font-size);
            line-height: var(--fm-line-height);
          }

          .dialog-text-content p {
            margin: 0 0 clamp(12px, 2.5%, 20px);
          }

          .welcome-text {
            margin-top: auto !important;
          }

          .founder-moving-bg {
            display: block;
            width: 68%;
            right: -28px;
            opacity: 0.95;
            animation: founderBgMove 5s ease-in-out infinite alternate;
          }
        }

        .right-founder-col {
          display: flex;
          width: 100%;
          max-width: var(--fm-founder-group-w);
          flex-direction: column;
          align-items: center;
          justify-self: start;
          margin-top: 0;
          min-width: 0;
        }

        @media (min-width: 1024px) {
          .right-founder-col {
            margin-top: clamp(24px, 4vw, 48px);
          }
        }

        .founder-photo-wrap {
          position: relative;
          width: min(var(--fm-founder-photo), 100%);
          max-width: 100%;
          aspect-ratio: 1 / 1;
          height: auto;
          overflow: hidden;
        }

        .founder-main-img {
          object-fit: contain;
          object-position: center center;
        }

        .founder-details {
          position: relative;
          z-index: 12;
          width: 100%;
          max-width: 100%;
          margin-top: clamp(16px, 2.5vw, 28px);
          text-align: center;
        }

        .best-wishes-text {
          font-size: clamp(22px, 2.3vw, 33px);
          line-height: 1.05;
          font-weight: 800;
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
          margin-top: clamp(12px, 1.2vw, 17px);
          font-size: clamp(22px, 2.4vw, 34px);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #4d5660;
        }

        .founder-role {
          margin-top: clamp(14px, 1.5vw, 21px);
          font-size: clamp(18px, 1.8vw, 26px);
          line-height: 1.15;
          font-weight: 600;
          color: #56616b;
        }

        .founder-brand {
          margin-top: clamp(14px, 1.5vw, 22px);
          font-size: clamp(18px, 1.7vw, 25px);
          line-height: 1.15;
          font-weight: 700;
          color: #4f5964;
        }

        @media (min-width: 1024px) and (max-width: 1280px) {
          .founder-section {
            --fm-font-size: clamp(12px, 1.1vw, 14px);
            --fm-line-height: clamp(19px, 1.75vw, 22px);
          }

          .dialog-text-content {
            width: 86%;
            padding-bottom: clamp(40px, 18%, 120px);
          }

          .dialog-text-content p {
            margin-bottom: clamp(10px, 1.8%, 14px);
          }

          .founder-moving-bg {
            width: 72%;
            opacity: 0.75;
          }

          .right-founder-col {
            margin-top: clamp(20px, 3vw, 36px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .founder-moving-bg {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
};

export default FoundersMessagePage;
