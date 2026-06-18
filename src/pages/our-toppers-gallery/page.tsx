'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useSessionBooking } from '@/features/course/hooks/useSessionBooking';
import SessionBookingDialog from '@/features/course/components/SessionBookingDialog';
import FormFieldLabel from '@/components/common/FormFieldLabel';

type Topper = {
  name: string;
  rank: string;
  description: string;
  img: string;
  y: number;
  scale: number;
  course: 'GS Course' | 'Optional Course' | 'Test Series' | 'Other';
};

const YEAR_WISE_PDF = '/assets/samples/sriram-sample.pdf';

const TESTIMONIALS = [
  {
    title: 'Shivansh Singh IAS — Rank 164, UPSC CSE 2023',
    excerpt:
      'Read how Shivansh Singh prepared for UPSC CSE 2023 and secured AIR 164 with SRIRAM\'s IAS.',
    url: 'https://forumias.com/blog/shivansh-singh-ias-rank-164-upsc-cse-2023-testimonial/',
  },
] as const;

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

const OurToppersGalleryPage = () => {
  const [activeTab, setActiveTab] = useState<'Toppers' | 'Testimonials'>('Toppers');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    targetYear: '',
    city: 'Delhi',
  });
  const [authorized, setAuthorized] = useState(false);
  const [dialog, setDialog] = useState<{
    variant: 'success' | 'error';
    message: string;
  } | null>(null);
  const { bookSession, isPending } = useSessionBooking();

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await bookSession(formData, formData.city, authorized);

    if (result.ok) {
      setDialog({
        variant: 'success',
        message: 'Your session has been booked. Our team will reach out shortly.',
      });
      setFormData({
        fullName: '',
        mobile: '',
        email: '',
        targetYear: '',
        city: 'Delhi',
      });
      setAuthorized(false);
      return;
    }

    setDialog({
      variant: 'error',
      message: result.message,
    });
  };

  const handleYearWiseClick = () => {
    window.open(YEAR_WISE_PDF, '_blank', 'noopener,noreferrer');
  };

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

            <div className="mx-auto mt-1 flex w-full max-w-[420px] flex-wrap items-center justify-center gap-2 md:mx-0 md:w-fit md:max-w-none">
              <div className="flex items-center gap-1 rounded-full bg-white/85 p-1.5 shadow-[0_8px_24px_rgba(38,143,208,0.16)] backdrop-blur">
                {(['Toppers', 'Testimonials'] as const).map((tab) => (
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

              <button
                type="button"
                onClick={handleYearWiseClick}
                className="rounded-full border border-[#178fd2]/30 bg-white px-4 py-2 text-[11px] font-bold text-[#178fd2] shadow-[0_8px_24px_rgba(38,143,208,0.12)] transition-all hover:bg-[#e4f5ff] sm:px-5 sm:py-2.5 sm:text-[12px] md:text-[14px]"
              >
                Year wise
              </button>
            </div>
          </div>

          {/* Topper cards / Testimonials */}
          <div className="w-full px-4 sm:px-6 lg:px-0">
            {activeTab === 'Testimonials' ? (
              <div className="mx-auto grid max-w-[900px] gap-6 px-2 sm:px-4">
                {TESTIMONIALS.map((testimonial) => (
                  <a
                    key={testimonial.url}
                    href={testimonial.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-[16px] bg-white/90 p-6 shadow-[0_12px_32px_rgba(29,119,176,0.14)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_rgba(29,119,176,0.2)] sm:p-8"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[1px] text-[#178fd2]">
                      Student Testimonial
                    </p>
                    <h3 className="mt-2 text-[18px] font-extrabold leading-snug text-[#1f3442] sm:text-[22px]">
                      {testimonial.title}
                    </h3>
                    <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#4a6272] sm:text-[16px]">
                      {testimonial.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-[#178fd2] group-hover:underline">
                      Read full testimonial
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            ) : (
            <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {fallbackToppers.map((topper, index) => {
                const isSecondRow = index >= 5;

                return (
                  <article
                    key={`${topper.name}-${topper.rank}-${index}`}
                    className="group relative flex w-full flex-col items-center bg-transparent text-center"
                  >
                    {/* Image area */}
                    <div
                      className={`relative w-full overflow-visible bg-transparent ${
                        isSecondRow
                          ? 'h-[250px] sm:h-[280px] lg:h-[310px]'
                          : 'h-[280px] sm:h-[310px] lg:h-[360px]'
                      }`}
                    >
                      <div
                        className={`absolute left-1/2 h-[330px] w-[280px] -translate-x-1/2 bg-transparent sm:h-[380px] sm:w-[325px] lg:h-[455px] lg:w-[390px] lg:-translate-x-[55%] ${
                          isSecondRow
                            ? 'top-[-6px] lg:top-[-8px]'
                            : 'top-[-10px] lg:top-[-22px]'
                        }`}
                      >
                        <img
                          src={imagePath(topper.img)}
                          alt={`${topper.name} ${topper.rank}`}
                          className="mx-auto h-full w-full bg-transparent object-contain object-top drop-shadow-[0_20px_26px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-105 lg:drop-shadow-[0_24px_30px_rgba(0,0,0,0.28)]"
                          style={{
                            transform: `translateY(${topper.y}px) scale(${
                              topper.scale * 1.08
                            })`,
                            transformOrigin: 'center top',
                          }}
                        />
                      </div>
                    </div>

                    {/* Text area */}
                    <div
                      className={`relative z-10 flex min-h-[90px] flex-col items-center bg-transparent ${
                        isSecondRow
                          ? '-mt-[44px] lg:-mt-[58px]'
                          : '-mt-[56px] lg:-mt-[72px]'
                      }`}
                    >
                      <h3 className="max-w-[250px] pt-2 text-center text-[14px] font-extrabold uppercase leading-[1.25] tracking-[0.2px] text-white drop-shadow-sm md:text-[16px]">
                        {topper.name}
                      </h3>

                      <span className="topper-air-badge mt-[6px] shadow-sm">
                        {topper.rank}
                      </span>

                      <p className="mt-[6px] text-[13px] font-semibold leading-[1.2] text-white/95">
                        {topper.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
            )}
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

            <form className="mx-auto w-full max-w-[640px] lg:mx-0" onSubmit={handleSessionSubmit}>
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FormFieldLabel
                    required
                    className="mb-1 block text-center text-[12px] font-medium text-[#3A340099] sm:text-left"
                  >
                    Full Name
                  </FormFieldLabel>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300 sm:text-left sm:placeholder:text-left"
                  />
                </div>

                <div>
                  <FormFieldLabel
                    required
                    className="mb-1 block text-center text-[12px] font-medium text-[#3A340099] sm:text-left"
                  >
                    Mobile Number
                  </FormFieldLabel>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleFormChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300 sm:text-left sm:placeholder:text-left"
                  />
                </div>

                <div>
                  <FormFieldLabel
                    required
                    className="mb-1 block text-center text-[12px] font-medium text-[#3A340099] sm:text-left"
                  >
                    Email Id
                  </FormFieldLabel>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Id"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300 sm:text-left sm:placeholder:text-left"
                  />
                </div>

                <div className="relative w-full">
                  <FormFieldLabel
                    required
                    className="mb-1 block text-center text-[12px] font-medium text-[#3A340099] sm:text-left"
                  >
                    Target UPSC Attempt Year
                  </FormFieldLabel>
                  <select
                    name="targetYear"
                    value={formData.targetYear}
                    onChange={handleFormChange}
                    required
                    className="text-center-last w-full cursor-pointer appearance-none rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-500 shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-300 sm:text-left"
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
                  <FormFieldLabel className="mb-1 block text-center text-[12px] font-medium text-[#3A340099] sm:text-left">
                    City
                  </FormFieldLabel>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
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
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
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
                  type="submit"
                  disabled={isPending}
                  className="rounded-3xl px-7 py-3.5 text-[16px] font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:px-8 sm:text-[18px]"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)',
                  }}
                >
                  {isPending ? 'Booking...' : 'Book your session now'}
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

      <SessionBookingDialog
        open={dialog !== null}
        variant={dialog?.variant ?? 'success'}
        message={dialog?.message ?? ''}
        onClose={() => setDialog(null)}
      />
    </main>
  );
};

export default OurToppersGalleryPage;