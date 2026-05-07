'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const messageParagraphs = [
  `Dear Aspiring Civil Servants, Welcome to SRIRAM's IAS, a place where dreams of public service take shape and where your commitments meet our decades of experience.`,

  `By choosing this path, you've already shown courage, clarity, and a deep sense of purpose to serve the Nation. The journey to becoming a Civil Servant is one of the most challenging and rewarding which you can undertake in your career. At SRIRAM's IAS, we stand by you at every step of your journey towards success.`,

  `At SRIRAM's IAS, we believe preparation for the UPSC Civil Services Examinations (CSE) isn't just about clearing an exam, it's about shaping the administrators that India needs. That's why our ecosystem is built not just on knowledge, but on mentorship, innovation and transformation. At SRIRAM's IAS, we're not just preparing you for an exam, but also for a life of leadership and service.`,
];

const textStyle: React.CSSProperties = {
  fontSize: '10px',
  lineHeight: '1.75',
  fontWeight: 400,
  letterSpacing: '0px',
  marginBottom: '22px',
  color: '#4f5b63',
};

const FoundersMessagePage = () => {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />

      {/* HERO BANNER */}
      <section className="relative w-full h-[430px] md:h-[520px] lg:h-[560px] overflow-hidden">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="Founder's Message Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-[88px] pt-[80px]">
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
            sizes="70vw"
            className="object-cover object-right"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[54px] xl:px-[64px] py-[46px] lg:py-[50px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.32fr_0.68fr] gap-4 lg:gap-6 xl:gap-8 items-start">
            
            {/* LEFT DIALOG BOX */}
            <div className="relative lg:-ml-[20px] xl:-ml-[30px]">
              <div className="dialog-box-wrap">
                <Image
                  src="/assets/about/founder's-message/dialog-box.png"
                  alt="Founder message dialog box"
                  fill
                  priority
                  sizes="950px"
                  className="object-fill"
                />

                <div
                  className="dialog-text-content"
                  style={{
                    fontSize: '10px',
                    lineHeight: '1.75',
                    fontWeight: 400,
                  }}
                >
                  {messageParagraphs.map((text, index) => (
                    <p key={index} style={textStyle}>
                      {text}
                    </p>
                  ))}

                  <p
                    style={{
                      ...textStyle,
                      marginBottom: 0,
                      textAlign: 'center',
                    }}
                  >
                    Welcome to SRIRAM&apos;s IAS, Let&apos;s begin!
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FOUNDER IMAGE */}
            <div className="relative flex flex-col items-center right-founder-col">
              <div className="founder-photo-wrap">
                <div className="founder-circle-bg" />

                <Image
                  src="/assets/about/founder's-message/Sriram Sir_Founder page1.png"
                  alt="Sriram Srirangam Founder"
                  width={430}
                  height={560}
                  priority
                  className="founder-img"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '20px',
                    width: '360px',
                    height: 'auto',
                    transform: 'translateX(-50%)',
                    objectFit: 'contain',
                    objectPosition: 'center top',
                    zIndex: 2,
                  }}
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
          font-size: clamp(42px, 5.2vw, 82px);
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
              rgba(255, 255, 255, 0.78) 36%,
              transparent 60%
            ),
            linear-gradient(
              100deg,
              #fffaf2 0%,
              #ffffff 38%,
              #e8f6ff 100%
            );
        }

        .founder-moving-bg {
          position: absolute;
          right: -95px;
          top: 0;
          bottom: 0;
          width: 62%;
          opacity: 0.84;
          pointer-events: none;
          animation: founderBgMove 5s ease-in-out infinite alternate;
          transform-origin: right center;
        }

        @keyframes founderBgMove {
          0% {
            transform: translateX(0px) translateY(0px) scale(1);
          }

          100% {
            transform: translateX(-24px) translateY(18px) scale(1.055);
          }
        }

        .dialog-box-wrap {
          position: relative;
          width: 100%;
          max-width: 945px;
          height: 665px;
        }

        .dialog-text-content {
          position: relative;
          z-index: 2;
          padding: 62px 82px 72px 82px;
          color: #4f5b63;
          font-size: 10px !important;
          line-height: 1.75 !important;
          font-weight: 400 !important;
          letter-spacing: 0 !important;
        }

        .dialog-text-content p {
          font-size: 10px !important;
          line-height: 1.75 !important;
          font-weight: 400 !important;
          letter-spacing: 0 !important;
          margin-bottom: 22px !important;
        }

        .right-founder-col {
          padding-top: 58px;
          margin-left: -14px;
        }

        .founder-photo-wrap {
          position: relative;
          width: 440px;
          height: 475px;
          overflow: visible;
        }

        .founder-circle-bg {
          position: absolute;
          left: 50%;
          top: 98px;
          width: 430px;
          height: 430px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #149fda 0%,
            #249bd5 42%,
            #d87082 100%
          );
          z-index: 1;
        }

        .founder-img {
          position: absolute !important;
          left: 50% !important;
          top: 20px !important;
          width: 360px !important;
          height: auto !important;
          transform: translateX(-50%) !important;
          object-fit: contain !important;
          object-position: center top !important;
          z-index: 2 !important;
        }

        .founder-details {
          margin-top: -2px;
        }

        .best-wishes-text {
          font-size: 32px;
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
          margin-top: 12px;
          font-size: 33px;
          line-height: 1.15;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #4d5660;
        }

        .founder-role {
          margin-top: 14px;
          font-size: 25px;
          line-height: 1.2;
          font-weight: 800;
          color: #56616b;
        }

        .founder-brand {
          margin-top: 14px;
          font-size: 25px;
          line-height: 1.2;
          font-weight: 900;
          color: #4f5964;
        }

        @media (min-width: 1280px) {
          .dialog-box-wrap {
            max-width: 955px;
            height: 670px;
          }

          .dialog-text-content {
            padding: 62px 84px 72px 84px;
            font-size: 10px !important;
            line-height: 1.75 !important;
            font-weight: 400 !important;
          }

          .dialog-text-content p {
            font-size: 10px !important;
            line-height: 1.75 !important;
            font-weight: 400 !important;
            margin-bottom: 22px !important;
          }

          .right-founder-col {
            padding-top: 60px;
            margin-left: -18px;
          }

          .founder-photo-wrap {
            width: 455px;
            height: 485px;
          }

          .founder-circle-bg {
            top: 100px;
            width: 445px;
            height: 445px;
          }

          .founder-img {
            top: 20px !important;
            width: 375px !important;
          }
        }

        @media (max-width: 1279px) {
          .dialog-box-wrap {
            max-width: 850px;
            height: 620px;
          }

          .dialog-text-content {
            padding: 56px 68px 64px 68px;
            font-size: 9.5px !important;
            line-height: 1.7 !important;
            font-weight: 400 !important;
          }

          .dialog-text-content p {
            font-size: 9.5px !important;
            line-height: 1.7 !important;
            font-weight: 400 !important;
            margin-bottom: 20px !important;
          }

          .right-founder-col {
            padding-top: 60px;
            margin-left: -10px;
          }

          .founder-photo-wrap {
            width: 400px;
            height: 450px;
          }

          .founder-circle-bg {
            top: 92px;
            width: 390px;
            height: 390px;
          }

          .founder-img {
            top: 18px !important;
            width: 335px !important;
          }

          .best-wishes-text {
            font-size: 30px;
          }

          .founder-name {
            font-size: 31px;
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
            font-size: 11px !important;
            line-height: 1.6 !important;
            font-weight: 400 !important;
          }

          .dialog-text-content p {
            font-size: 11px !important;
            line-height: 1.6 !important;
            font-weight: 400 !important;
            margin-bottom: 18px !important;
          }

          .right-founder-col {
            padding-top: 30px;
            margin-left: 0;
          }
        }

        @media (max-width: 640px) {
          .dialog-box-wrap {
            border-radius: 38px;
          }

          .dialog-text-content {
            padding: 32px 22px;
            font-size: 10px !important;
            line-height: 1.55 !important;
            font-weight: 400 !important;
          }

          .dialog-text-content p {
            font-size: 10px !important;
            line-height: 1.55 !important;
            font-weight: 400 !important;
          }

          .founder-photo-wrap {
            width: 300px;
            height: 350px;
          }

          .founder-circle-bg {
            top: 72px;
            width: 300px;
            height: 300px;
          }

          .founder-img {
            top: 18px !important;
            width: 250px !important;
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