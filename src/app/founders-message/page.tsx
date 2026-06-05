'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const FoundersMessagePage = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <Header />

      {/* HERO BANNER */}
      <section className="relative h-[390px] w-full overflow-hidden">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="Founder's Message Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black/95 via-black/78 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[38%] bg-gradient-to-l from-black/20 to-transparent" />

        <div className="relative z-10 flex h-full items-start px-6 pt-[270px] sm:px-10 lg:px-[88px]">
          <h1 className="founder-hero-heading">FOUNDER&apos;S MESSAGE</h1>
        </div>
      </section>

      {/* FOUNDER MESSAGE SECTION */}
      <section className="founder-section relative min-h-[850px] overflow-hidden bg-[#f8fbff]">
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

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-[110px] pt-[62px] sm:px-6 lg:px-8">
          <div className="founder-main-grid">
            {/* LEFT DIALOG BOX — Figma: 802.67 × 742.6 */}
            <div className="dialog-left-col relative z-20">
              <div className="dialog-box-wrap">
                <Image
                  src="/assets/about/founder's-message/dialog-box.png"
                  alt="Founder message dialog box"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 803px"
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

            {/* RIGHT FOUNDER — Figma group: 607.5 × 476.1 */}
            <div className="right-founder-col relative z-30">
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
        /* Figma design tokens */
        .founder-section {
          --fm-dialog-w: 803px;
          --fm-dialog-h: 743px;
          --fm-text-w: 678px;
          --fm-founder-group-w: 608px;
          --fm-founder-photo: 460px;
          --fm-font-size: 16px;
          --fm-line-height: 26px;
        }

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

        /* Two-column layout — scales proportionally, no collapse until mobile */
        .founder-main-grid {
          display: grid;
          grid-template-columns: minmax(0, var(--fm-dialog-w)) minmax(
              0,
              var(--fm-founder-group-w)
            );
          align-items: start;
          justify-content: center;
          column-gap: clamp(0px, 1.5vw, 12px);
          width: fit-content;
          max-width: 100%;
          margin: 0 auto;
        }

        .dialog-left-col {
          width: 100%;
          max-width: var(--fm-dialog-w);
        }

        .dialog-box-wrap {
          position: relative;
          width: 100%;
          max-width: var(--fm-dialog-w);
          aspect-ratio: 803 / 743;
          height: auto;
          overflow: visible;
        }

        /* Figma text: Montserrat 600, 16px, line-height 26px, width 678px */
        .dialog-text-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-sizing: border-box;
          width: 84.4%;
          max-width: var(--fm-text-w);
          margin: 0 auto;
          padding: 9.2% 4% 22% 9%;
          color: #4d5961;
          font-family: 'Montserrat', sans-serif;
          font-size: var(--fm-font-size);
          line-height: var(--fm-line-height);
          font-weight: 600;
        }

        .dialog-text-content p {
          margin: 0 0 20px;
          font-family: 'Montserrat', sans-serif;
          font-size: inherit;
          line-height: inherit;
          font-weight: 600;
          color: #4d5961;
        }

        .dialog-text-content p:last-child {
          margin-bottom: 0;
        }

        .welcome-text {
          margin-top: auto !important;
          text-align: center;
          white-space: nowrap;
        }

        .right-founder-col {
          display: flex;
          width: 100%;
          max-width: var(--fm-founder-group-w);
          flex-direction: column;
          align-items: center;
          margin-top: clamp(24px, 4vw, 48px);
        }

        .founder-photo-wrap {
          position: relative;
          width: min(var(--fm-founder-photo), 100%);
          aspect-ratio: 1 / 1;
          height: auto;
          overflow: visible;
        }

        .founder-main-img {
          object-fit: contain;
          object-position: center center;
        }

        .founder-details {
          position: relative;
          z-index: 12;
          width: 100%;
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

        /* Scale down proportionally on medium screens — keep 2-column structure */
        @media (max-width: 1439px) {
          .founder-section {
            --fm-dialog-w: min(803px, 56vw);
            --fm-founder-group-w: min(608px, 42vw);
            --fm-founder-photo: min(460px, 34vw);
            --fm-text-w: min(678px, 47vw);
          }
        }

        @media (max-width: 1100px) {
          .founder-section {
            --fm-dialog-w: min(803px, 52vw);
            --fm-founder-group-w: min(608px, 44vw);
            --fm-founder-photo: min(400px, 36vw);
            --fm-font-size: clamp(14px, 1.45vw, 16px);
            --fm-line-height: clamp(22px, 2.3vw, 26px);
          }

          .founder-moving-bg {
            width: 78%;
            opacity: 0.7;
          }
        }

        /* Tablet — still side-by-side, tighter proportions */
        @media (max-width: 900px) {
          .founder-section {
            --fm-dialog-w: 58vw;
            --fm-founder-group-w: 38vw;
            --fm-founder-photo: 38vw;
            --fm-font-size: clamp(12px, 1.6vw, 15px);
            --fm-line-height: clamp(20px, 2.6vw, 24px);
          }

          .founder-main-grid {
            column-gap: 0;
          }

          .right-founder-col {
            margin-top: clamp(16px, 3vw, 32px);
          }
        }

        /* Mobile — stack vertically, preserve aspect ratios */
        @media (max-width: 1023px) {
          .founder-section {
            --fm-dialog-w: 100%;
            --fm-founder-group-w: 100%;
            --fm-founder-photo: min(380px, 78vw);
            --fm-font-size: clamp(13px, 3.6vw, 16px);
            --fm-line-height: clamp(21px, 5.8vw, 26px);
          }

          .founder-main-grid {
            grid-template-columns: 1fr;
            row-gap: clamp(24px, 6vw, 40px);
            width: 100%;
          }

          .dialog-text-content {
            width: 86%;
            padding: 10% 5% 20% 8%;
          }

          .dialog-text-content p {
            margin-bottom: clamp(14px, 3.5vw, 20px);
          }

          .welcome-text {
            white-space: normal;
          }

          .founder-moving-bg {
            width: 100%;
            right: -80px;
            opacity: 0.45;
          }

          .right-founder-col {
            margin-top: 0;
          }
        }

        @media (max-width: 480px) {
          .founder-section {
            --fm-founder-photo: min(340px, 84vw);
            --fm-font-size: 13px;
            --fm-line-height: 21px;
          }

          .dialog-text-content {
            width: 88%;
            padding: 11% 4% 18% 7%;
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
