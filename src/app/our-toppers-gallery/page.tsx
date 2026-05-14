'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

type Topper = {
  name: string;
  rank: string;
  description: string;
  img: string;
  y: number;
  scale: number;
  course: 'GS Course' | 'Optional Course' | 'Test Series' | 'Other';
};

const fallbackToppers: Topper[] = [
  {
    name: 'AAKASH GARG',
    rank: 'AIR 5',
    description: 'GS Foundation Course',
    img: 'AAKASH GARG(AIR-5) .png',
    y: 35,
    scale: 1,
    course: 'GS Course',
  },
  {
    name: 'ABHI JAIN',
    rank: 'AIR 34',
    description: 'GS Foundation Course',
    img: 'ABHI-JAIN(AIR-34).png',
    y: 45,
    scale: 1.03,
    course: 'GS Course',
  },
  {
    name: 'ABHISHEK SHARMA',
    rank: 'AIR 38',
    description: 'GS Foundation Course',
    img: 'ABHISHEK-SHARMA-(AIR-38) .png',
    y: 35,
    scale: 1.01,
    course: 'GS Course',
  },
  {
    name: 'DIKSHA RAI',
    rank: 'AIR 40',
    description: 'GS Foundation Course',
    img: 'DIKSHA-RAI(AIR-40).png',
    y: 41,
    scale: 0.98,
    course: 'GS Course',
  },
  {
    name: 'NABIYA PARVEZ',
    rank: 'AIR 29',
    description: 'GS Foundation Course',
    img: 'NABIYA-PARVEZ(AIR-29).png',
    y: 45,
    scale: 0.92,
    course: 'GS Course',
  },
  {
    name: 'RAGHAV JHUNJHUNWALA',
    rank: 'AIR 4',
    description: 'GS Foundation Course',
    img: 'RAGHAV-JHUNJWALA(AIR-4).png',
    y: 10,
    scale: 1,
    course: 'GS Course',
  },
  {
    name: 'RAJ KRISHNA JHA',
    rank: 'AIR 8',
    description: 'GS Foundation Course',
    img: 'RAJ-KRISHNA JHA(AIR-8).png',
    y: 5,
    scale: 1,
    course: 'GS Course',
  },
  {
    name: 'ROHIN KUMAR',
    rank: 'AIR 39',
    description: 'GS Foundation Course',
    img: 'ROHIN-KUMAR(AIR-39).png',
    y: 12,
    scale: 1,
    course: 'GS Course',
  },
  {
    name: 'ADITYA VIKRAM AGARWAL',
    rank: 'AIR 9',
    description: 'GS Foundation Course',
    img: 'Aditya-Vikram-Agarwal (AIR - 9).png',
    y: 13,
    scale: 0.97,
    course: 'GS Course',
  },
  {
    name: 'ETTABOINA SAI SHIVANI',
    rank: 'AIR 11',
    description: 'GS Foundation Course',
    img: 'ETTABOINA-SAI-SHIVANI(AIR-11).png',
    y: 35,
    scale: 0.84,
    course: 'GS Course',
  },

  /*
    Add more students here.

    For Top 10 tab, add ranks AIR 1, AIR 2, AIR 3, AIR 6, AIR 7, AIR 10 also.

    Example:

    {
      name: 'STUDENT NAME',
      rank: 'AIR 1',
      description: 'GS Foundation Course',
      img: 'student-image.png',
      y: 20,
      scale: 1,
      course: 'GS Course',
    },
  */
];

const imagePath = (fileName: string) =>
  `/assets/our-toppers-gallery/${fileName.replaceAll(' ', '%20')}`;

const getRankNumber = (rank: string) => {
  const match = rank.match(/\d+/);
  return match ? Number(match[0]) : 9999;
};

const OurToppersGalleryPage = () => {
  const [activeTab, setActiveTab] = useState<
    'All Students' | 'Top 10' | 'GS Course'
  >('All Students');

  const toppers = useMemo(() => {
    if (activeTab === 'Top 10') {
      return fallbackToppers
        .filter((item) => getRankNumber(item.rank) <= 10)
        .sort((a, b) => getRankNumber(a.rank) - getRankNumber(b.rank));
    }

    if (activeTab === 'GS Course') {
      return fallbackToppers.filter((item) => item.course === 'GS Course');
    }

    return fallbackToppers;
  }, [activeTab]);

  return (
    <main className="min-h-screen overflow-hidden bg-white font-['Montserrat',sans-serif]">
      <Header />

      {/* HERO BANNER */}
      <section className="relative h-[260px] w-full overflow-hidden sm:h-[320px] md:h-[390px]">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="Our Toppers Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-black/90 via-black/60 to-transparent md:w-[48%]" />
        <div className="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-black/25 to-transparent" />

        <div className="relative z-10 flex h-full items-center px-5 pt-[70px] sm:px-8 md:px-[72px] lg:px-[82px]">
          <h1 className="font-['Montserrat'] text-[34px] font-black uppercase tracking-[1px] text-white sm:text-[42px] md:text-[58px]">
            OUR{' '}
            <span className="bg-gradient-to-r from-[#b2aaff] via-[#9ca9ff] to-[#63b9ff] bg-clip-text text-transparent">
              TOPPERS
            </span>
          </h1>
        </div>
      </section>

      {/* TOPPERS GALLERY */}
      <section className="relative overflow-hidden bg-[#B8E5FB] py-10 md:py-12">
        <Image
          src="/assets/our-toppers-gallery/our-toppers-bg.png"
          alt="Toppers gallery background"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />

        <div className="relative z-10 w-full">
          <div className="mb-8 flex w-full flex-col justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-start md:px-[48px] lg:px-[42px]">
            <div className="text-center md:text-left">
              <h2 className="bg-gradient-to-r from-[#159fe3] via-[#8e91b5] to-[#d96f7d] bg-clip-text text-[34px] font-black uppercase leading-[1.05] tracking-[1px] text-transparent sm:text-[44px] md:text-[66px] lg:text-[74px]">
                TOPPER’S GALLERY
              </h2>

              <p className="mx-auto mt-4 max-w-[650px] text-[14px] font-medium text-[#1f3442] sm:text-[16px] md:mx-0 md:text-[20px]">
                Celebrating the remarkable achievements of our students
              </p>
            </div>

            <div className="mx-auto mt-1 flex w-full max-w-[360px] flex-wrap items-center justify-center gap-2 rounded-full bg-white/85 p-1.5 shadow-[0_8px_24px_rgba(38,143,208,0.16)] backdrop-blur md:mx-0 md:w-fit md:max-w-none">
              {(['All Students', 'Top 10', 'GS Course'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-[11px] font-bold transition-all sm:px-5 sm:py-2.5 sm:text-[12px] md:text-[14px] ${
                    activeTab === tab
                      ? 'bg-[#178fd2] text-white shadow-md'
                      : 'text-[#213b4c] hover:bg-[#e4f5ff]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Topper cards */}
          <div className="w-full px-4 sm:px-6 lg:px-0">
            <div
              className={`grid w-full gap-x-4 gap-y-8 ${
                activeTab === 'Top 10'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-[55px]'
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'
              }`}
            >
              {toppers.map((topper, index) => {
                const isTop10 = activeTab === 'Top 10';
                const isSecondRow = !isTop10 && index >= 5;

                const imageY =
                  isTop10 && topper.name === 'AAKASH GARG' ? -0.9 : topper.y;

                return (
                  <article
                    key={`${topper.name}-${topper.rank}-${index}`}
                    className="group relative flex w-full flex-col items-center bg-transparent text-center"
                  >
                    {/* Image area */}
                    <div
                      className={`relative w-full overflow-visible bg-transparent ${
                        isTop10
                          ? 'h-[300px] sm:h-[330px] lg:h-[360px]'
                          : isSecondRow
                          ? 'h-[300px] sm:h-[330px] lg:h-[360px]'
                          : 'h-[330px] sm:h-[360px] lg:h-[430px]'
                      }`}
                    >
                      <div
                        className={`absolute left-1/2 h-[330px] w-[280px] -translate-x-1/2 bg-transparent sm:h-[380px] sm:w-[325px] lg:h-[455px] lg:w-[390px] lg:-translate-x-[55%] ${
                          isTop10
                            ? 'top-[-28px] lg:top-[-60px]'
                            : isSecondRow
                            ? 'top-[-6px] lg:top-[-8px]'
                            : 'top-[-10px] lg:top-[-22px]'
                        }`}
                      >
                        <img
                          src={imagePath(topper.img)}
                          alt={`${topper.name} ${topper.rank}`}
                          className="mx-auto h-full w-full bg-transparent object-contain object-top drop-shadow-[0_20px_26px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-105 lg:drop-shadow-[0_24px_30px_rgba(0,0,0,0.28)]"
                          style={{
                            transform: `translateY(${imageY}px) scale(${
                              topper.scale * 1.08
                            })`,
                            transformOrigin: 'center top',
                          }}
                        />
                      </div>
                    </div>

                    {/* Text area */}
                    <div
                      className={`relative z-10 flex min-h-[105px] flex-col items-center bg-transparent ${
                        isTop10
                          ? '-mt-[58px] lg:-mt-[80px]'
                          : isSecondRow
                          ? '-mt-[32px] lg:-mt-[38px]'
                          : '-mt-[46px] lg:-mt-[58px]'
                      }`}
                    >
                      <h3 className="max-w-[250px] text-center text-[14px] font-extrabold uppercase leading-[1.25] tracking-[0.2px] text-white drop-shadow-sm md:text-[16px]">
                        {topper.name}
                      </h3>

                      <div className="mt-[8px] rounded-full bg-[#f39d23] px-4 py-[5px] text-[12px] font-extrabold leading-none text-white shadow-sm">
                        {topper.rank}
                      </div>

                      <p className="mt-[8px] text-[13px] font-semibold leading-[1.2] text-white/95">
                        {topper.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {toppers.length === 0 && (
              <div className="py-16 text-center text-[18px] font-semibold text-[#1f3442]">
                No students found in this category.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SUPPORT SYSTEM */}
      <section className="relative overflow-hidden bg-[#C8ECFF] px-4 py-12 sm:px-6 md:px-10 lg:py-16">
        <Image
          src="/assets/our-toppers-gallery/our-support-system-bg.png"
          alt="Our support system background"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />

        <div className="absolute -left-[95px] top-[145px] h-[210px] w-[210px] rounded-full bg-white/70" />
        <div className="absolute -right-[95px] bottom-[60px] h-[210px] w-[210px] rounded-full bg-white/75" />

        <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[0.88fr_1.42fr]">
          <div className="relative z-20 lg:-ml-8 xl:-ml-12">
            <h2 className="mb-8 bg-gradient-to-r from-[#159FE3] via-[#4FA0D6] to-[#6D8EB8] bg-clip-text text-center text-[30px] font-black uppercase leading-[1.05] tracking-[1px] text-transparent sm:text-[36px] md:text-[42px] lg:text-left lg:text-[46px]">
              OUR SUPPORT SYSTEM
            </h2>

            <div className="mx-auto grid max-w-[560px] grid-cols-1 gap-5 sm:grid-cols-2 lg:mx-0">
              <div className="min-h-[185px] rounded-[10px] bg-white p-5 shadow-[0_16px_34px_rgba(29,119,176,0.14)]">
                <div className="mb-4 flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#FFF0DA] shadow-sm">
                  <Image
                    src="/assets/our-toppers-gallery/timer-icon.svg"
                    alt="24/7 Academic Support icon"
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] object-contain"
                  />
                </div>

                <h3 className="mb-3 text-[15px] font-extrabold text-[#111827]">
                  24/7 Academic Support
                </h3>

                <p className="text-[13px] font-medium leading-[1.55] text-[#575757]">
                  Spreads the syllabus over two years, allowing thorough
                  understanding without burnout.
                </p>
              </div>

              <div className="min-h-[185px] rounded-[10px] bg-white p-5 shadow-[0_16px_34px_rgba(29,119,176,0.14)] sm:mt-[58px]">
                <div className="mb-4 flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#FFE5E8] shadow-sm">
                  <Image
                    src="/assets/our-toppers-gallery/personalized-attention-icon.svg"
                    alt="Personalised Attention icon"
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] object-contain"
                  />
                </div>

                <h3 className="mb-3 text-[15px] font-extrabold text-[#111827]">
                  Personalised Attention
                </h3>

                <p className="text-[13px] font-medium leading-[1.55] text-[#575757]">
                  Eliminates the need for multiple programs with our all-in-one
                  strategy.
                </p>
              </div>

              <div className="min-h-[185px] rounded-[10px] bg-white p-5 shadow-[0_16px_34px_rgba(29,119,176,0.14)] sm:col-span-2 lg:col-span-1">
                <div className="mb-4 flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#FFE5E8] shadow-sm">
                  <Image
                    src="/assets/our-toppers-gallery/expert-mentorship-icon.svg"
                    alt="Expert Mentorship icon"
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] object-contain"
                  />
                </div>

                <h3 className="mb-3 text-[15px] font-extrabold text-[#111827]">
                  Expert Mentorship
                </h3>

                <p className="text-[13px] font-medium leading-[1.55] text-[#575757]">
                  Recorded classes and digital content ensure seamless learning
                  regardless of time or place.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto h-[360px] w-full max-w-[520px] sm:h-[420px] md:h-[455px] md:max-w-[720px] lg:h-[515px] lg:max-w-[780px]">
            <div className="absolute right-[-20px] top-0 h-[270px] w-[330px] overflow-hidden rounded-tl-[180px] shadow-[0_18px_34px_rgba(0,0,0,0.16)] sm:h-[340px] sm:w-[440px] md:right-[-70px] md:h-[460px] md:w-[590px] lg:right-[-105px] lg:h-[515px] lg:w-[670px]">
              <Image
                src="/assets/our-toppers-gallery/women-image.png"
                alt="Support mentor"
                fill
                sizes="(max-width: 640px) 330px, (max-width: 768px) 590px, 670px"
                className="object-cover object-center"
              />
            </div>

            <div className="absolute bottom-[10px] left-[0px] z-20 h-[190px] w-[190px] overflow-hidden rounded-full border-[6px] border-[#BFE6FF] shadow-[0_18px_36px_rgba(0,0,0,0.22)] sm:h-[250px] sm:w-[250px] md:bottom-[-8px] md:left-[-5px] md:h-[330px] md:w-[330px] md:border-[8px] lg:left-[-15px] lg:h-[355px] lg:w-[355px]">
              <Image
                src="/assets/our-toppers-gallery/person-image.png"
                alt="Support team"
                fill
                sizes="(max-width: 640px) 190px, (max-width: 768px) 330px, 355px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WANT TO BECOME IAS / IPS CTA */}
      <section className="relative w-full overflow-hidden bg-[#EFEFD0] font-['Montserrat',sans-serif]">
        <div className="want-cta-bg pointer-events-none absolute inset-0 z-0" />

        <div className="relative z-10 mx-auto flex max-w-[1300px] flex-col items-center justify-between gap-8 px-4 pt-10 sm:px-6 md:px-12 md:pt-16 lg:flex-row lg:items-stretch lg:gap-12 lg:px-20">
          <div className="z-10 flex w-full flex-col justify-center pb-8 text-center md:pb-12 lg:text-left">
            <h2 className="mb-3 text-[25px] font-bold leading-tight tracking-wide text-[#3A340099] sm:text-[28px] md:text-[34px] lg:text-[30px]">
              Want to Become an IAS/IPS?
            </h2>

            <p className="mx-auto mb-8 max-w-[620px] text-[14px] font-medium text-[#3A340099] sm:text-[15px] md:text-[18px] lg:mx-0">
              Get Your One to One Personalised Session with Our Expert Mentors
            </p>

            <form className="mx-auto w-full max-w-[640px] lg:mx-0">
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
                />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Id"
                  className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
                />

                <div className="relative w-full">
                  <select
                    name="targetYear"
                    defaultValue=""
                    className="text-center-last w-full cursor-pointer appearance-none rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-500 shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="" disabled>
                      Target UPSC Attempt Year
                    </option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>

                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#999"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                <div className="relative w-full">
                  <select
                    name="city"
                    defaultValue="Delhi"
                    className="text-center-last w-full cursor-pointer appearance-none rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-500 shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                  </select>

                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#999"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              <label className="group mb-8 mt-2 flex cursor-pointer items-start gap-3 text-left">
                <input
                  type="checkbox"
                  className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer rounded-sm border-none bg-white/80 checked:bg-blue-500"
                />

                <span className="text-[12px] font-medium leading-[1.6] text-[#00000099]">
                  I authorize SRIRAM&apos;s IAS and its associates to contact me
                  with updates notifications via email, SMS, WhatsApp, and voice
                  call. This consent will override any registration for DNC /
                  NDNC.
                </span>
              </label>

              <div className="mt-4 flex justify-center lg:justify-center">
                <button
                  type="button"
                  className="rounded-3xl px-7 py-3.5 text-[16px] font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg sm:px-8 sm:text-[18px]"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)',
                  }}
                >
                  Book your session now
                </button>
              </div>
            </form>
          </div>

          <div className="relative z-10 flex w-full justify-center lg:self-end lg:justify-end">
            <div className="relative -mb-1 flex origin-bottom scale-[0.9] items-end justify-center sm:scale-100 md:scale-[1.1] lg:scale-[1.35]">
              <img
                src="/assets/course/cta-img.png"
                alt="Professional man"
                className="relative z-10 w-[220px] object-contain object-bottom drop-shadow-xl sm:w-[280px] md:w-[380px] lg:-ml-[-30%] lg:w-[650px]"
              />

              <img
                src="/assets/course/cta-img-1.png"
                alt="Professional woman"
                className="relative z-20 -ml-[34%] w-[170px] object-contain object-bottom drop-shadow-2xl sm:w-[220px] md:w-[300px] lg:-ml-[60%] lg:w-[360px]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes wantCtaBgMove {
          0% {
            transform: translate3d(0, 0, 0) scale(1.08);
          }

          50% {
            transform: translate3d(-28px, 14px, 0) scale(1.12);
          }

          100% {
            transform: translate3d(24px, -12px, 0) scale(1.1);
          }
        }

        .want-cta-bg {
          background-image: url('/assets/our-toppers-gallery/want-to-become-bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          animation: wantCtaBgMove 4s ease-in-out infinite alternate;
          will-change: transform;
        }

        .text-center-last {
          text-align-last: center;
        }
      `}</style>
    </main>
  );
};

export default OurToppersGalleryPage;