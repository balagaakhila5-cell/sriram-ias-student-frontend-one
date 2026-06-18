'use client';

import React from 'react';
import Image from 'next/image';

type FoundersMessageSectionProps = {
  id?: string;
};

const FoundersMessageSection = ({ id }: FoundersMessageSectionProps) => {
  return (
    <section id={id} className="founder-section relative bg-[#f8fbff]">
      <div className="founder-page-bg absolute inset-0" />

      <div className="founder-moving-bg-clip" aria-hidden>
        <div className="founder-moving-bg">
          <Image
            src="/assets/about/founder's-message/background-animation-founder.png"
            alt=""
            fill
            sizes="80vw"
            className="founder-moving-bg-img object-cover object-right"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] box-border px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="founder-main-grid">
          <div className="dialog-left-col relative z-20 w-full max-w-full">
            <div className="dialog-box-wrap">
              <div className="dialog-text-content">
                <p>
                  Dear Aspiring Civil Servants,
                </p>

                <p>
                  When I founded SRIRAM&apos;s IAS in 1985, my aim was to
                  mentor sincere aspirants with discipline, clarity, and a deep
                  sense of responsibility towards the nation.
                </p>

                <p>
                  Over the years, I have seen that success in the Civil Services
                  comes to those who stay consistent, think clearly, and prepare
                  with integrity. My message to you is simple: trust your
                  purpose, work with focus, and never lose sight of the service
                  you wish to render to society.
                </p>

                <p className="welcome-text">
                  I wish you strength and success on this journey.
                </p>
              </div>
            </div>
          </div>

          <div className="right-founder-col relative z-30 w-full max-w-full">
            <div className="founder-photo-wrap">
              <Image
                src="/assets/about/founder's-message/sriram-founder.png"
                alt="Sriram Srirangam Founder"
                fill
                priority
                sizes="(max-width: 768px) 88vw, 560px"
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

      <style jsx>{`
        .founder-section {
          --fm-dialog-w: min(803px, 100%);
          --fm-founder-group-w: min(680px, 100%);
          --fm-founder-photo: min(300px, 78vw);
          --fm-font-size: 16px;
          --fm-line-height: 26px;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .founder-section {
            --fm-founder-photo: min(380px, 68vw);
          }
        }

        @media (min-width: 1024px) {
          .founder-section {
            --fm-founder-photo: min(480px, 96%);
          }
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

        .founder-moving-bg-clip {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
        }

        .founder-moving-bg {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 42%;
          right: 0;
          opacity: 0.95;
          animation: founderBgMove 5s ease-in-out infinite alternate;
          transform-origin: center center;
          will-change: transform;
        }

        @keyframes founderBgMove {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(-14px, 8px, 0) scale(1.02);
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
          overflow: visible;
        }

        @media (min-width: 1024px) {
          .founder-main-grid {
            grid-template-columns: minmax(min-content, 1fr) minmax(min-content, 1fr);
            column-gap: clamp(20px, 3vw, 40px);
            row-gap: 0;
            align-items: start;
          }
        }

        .dialog-left-col {
          width: 100%;
          max-width: var(--fm-dialog-w);
          justify-self: end;
          align-self: start;
          isolation: isolate;
          z-index: 2;
          overflow: visible;
          height: auto;
          max-height: none;
        }

        @media (min-width: 1024px) {
          .dialog-left-col {
            margin-top: 40px;
          }
        }

        .dialog-box-wrap {
          position: relative;
          box-sizing: border-box;
          display: flow-root;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          overflow: visible;
          height: auto;
          min-height: 0;
          max-height: none;
          background: transparent;
          background-image: url("/assets/about/founder's-message/dialog-box.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center;
        }

        @media (min-width: 1024px) {
          .dialog-box-wrap {
            min-height: 340px;
          }
        }

        .dialog-text-content {
          position: relative;
          z-index: 1;
          box-sizing: border-box;
          width: 100%;
          height: auto;
          max-height: none;
          margin: 0;
          padding: 28px 24px 92px 22px;
          color: #4d5961;
          font-family: 'Montserrat', sans-serif;
          font-size: 10.5px;
          line-height: 16px;
          font-weight: 600;
          overflow: visible;
          overflow-wrap: break-word;
          word-break: break-word;
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
          margin-top: 12px !important;
          text-align: center;
        }

        @media (max-width: 360px) {
          .dialog-text-content {
            padding: 26px 20px 76px 20px;
            font-size: 10px;
            line-height: 15px;
          }

          .dialog-text-content p {
            margin-bottom: 8px;
          }
        }

        @media (min-width: 425px) {
          .dialog-text-content {
            padding: 32px 28px 96px 26px;
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
            padding: 38px 32px 104px 30px;
            font-size: 12px;
            line-height: 19px;
          }

          .dialog-text-content p {
            margin-bottom: 11px;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .dialog-text-content {
            padding: 42px 36px 112px 34px;
            font-size: 13px;
            line-height: 21px;
          }

          .founder-moving-bg {
            left: 50%;
            opacity: 0.55;
            animation: none;
          }
        }

        @media (max-width: 767px) {
          .founder-moving-bg-clip {
            display: none;
          }
        }

        @media (min-width: 1024px) {
          .dialog-text-content {
            width: 84%;
            max-width: none;
            margin: 0 auto;
            padding: 44px 36px 148px 52px;
            font-size: var(--fm-font-size);
            line-height: var(--fm-line-height);
            min-height: 280px;
          }

          .dialog-text-content p {
            margin: 0 0 14px;
          }

          .welcome-text {
            margin-top: 10px !important;
          }

          .founder-moving-bg {
            left: 40%;
            opacity: 0.95;
            animation: founderBgMove 5s ease-in-out infinite alternate;
          }
        }

        .right-founder-col {
          position: relative;
          display: flex;
          width: 100%;
          max-width: var(--fm-founder-group-w);
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          justify-self: center;
          align-self: start;
          margin-top: clamp(20px, 4vw, 32px);
          overflow: visible;
          height: auto;
          max-height: none;
        }

        @media (min-width: 1024px) {
          .right-founder-col {
            margin-top: 40px;
            justify-self: center;
            align-self: start;
          }
        }

        .founder-photo-wrap {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          width: min(var(--fm-founder-photo), 100%);
          max-width: 100%;
          aspect-ratio: 1 / 1;
          height: auto;
          margin-inline: auto;
          border-radius: 50%;
          overflow: hidden;
        }

        .founder-main-img {
          object-fit: cover;
          object-position: center center;
        }

        .founder-details {
          position: relative;
          z-index: 12;
          display: flex;
          width: 100%;
          max-width: 100%;
          flex-direction: column;
          align-items: center;
          margin-top: clamp(12px, 2vw, 18px);
          text-align: center;
          gap: clamp(10px, 1.4vw, 16px);
        }

        .best-wishes-text {
          margin: 0;
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
          margin: 0;
          font-size: clamp(22px, 2.4vw, 34px);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #4d5660;
        }

        .founder-role {
          margin: 0;
          font-size: clamp(18px, 1.8vw, 26px);
          line-height: 1.15;
          font-weight: 600;
          color: #56616b;
        }

        .founder-brand {
          margin: 0;
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
            padding: 40px 30px 148px 44px;
            min-height: 270px;
          }

          .dialog-text-content p {
            margin-bottom: 12px;
          }

          .founder-moving-bg {
            left: 38%;
            opacity: 0.8;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .founder-moving-bg {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default FoundersMessageSection;
