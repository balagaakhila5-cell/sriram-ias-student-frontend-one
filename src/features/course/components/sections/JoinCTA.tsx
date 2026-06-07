'use client';

import React, { useState, useRef } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { useSessionBooking } from '../../hooks/useSessionBooking';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  course?: CourseData;
  title?: React.ReactNode;
  city?: string;
}

const JoinCTA: React.FC<Props> = ({ course, title, city: propCity }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    targetYear: '',
  });
  const [authorized, setAuthorized] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const courseTitle = course?.title?.replace(/\n/g, ' ');
  const { bookSession, error, success, isPending } = useSessionBooking({ courseTitle });

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      // Animate ribbon shapes with left-to-right wipe fill effect
      const bgShapes = gsap.utils.toArray<Element>('.cta-bg-shape');
      bgShapes.forEach((shape, i) => {
        gsap.fromTo(
          shape,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 1.6,
            delay: i * 0.18,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        '.join-cta-heading',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.join-cta-form',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.join-cta-image',
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            once: true,
          },
        }
      );
    },
    { dependencies: [prefersReducedMotion], scope: containerRef }
  );

  const city = propCity?.toLowerCase() || course?.city?.toLowerCase() || 'delhi';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const booked = await bookSession(formData, city, authorized);
    if (!booked) return;

    setFormData({
      fullName: '',
      mobile: '',
      email: '',
      targetYear: '',
    });
    setAuthorized(false);
  };

  // ── BACKGROUNDS & BUTTON THEMES ──────────────────────────────────────────

  let sectionBg = '#EFEFD0';
  let headingColor = 'text-[#3A340099]';
  let subtitleColor = 'text-[#3A340099]';
  let checkboxColor = 'text-[#00000099]';

  if (city === 'hyderabad') {
    sectionBg = 'linear-gradient(180deg, #B2C5FF 9.13%, #FBFBFB 100%)';
    headingColor = 'text-gray-900';
    subtitleColor = 'text-gray-700';
    checkboxColor = 'text-gray-600';
  } else if (city === 'pune') {
    sectionBg = 'linear-gradient(180deg, #E6F0FF 0%, #D4E5FF 100%)';
    headingColor = 'text-gray-900';
    subtitleColor = 'text-gray-700';
    checkboxColor = 'text-gray-600';
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden font-['Montserrat',sans-serif]"
      style={{ background: sectionBg }}
    >
      {/* Animated background shapes - Matches the thick sweeps of Image 1 */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main thick sweeping ribbon */}
          <path
            className="cta-bg-shape"
            d="M-100,350 C200,250 450,50 900,100 C1250,140 1450,-50 1550,-100 L1550,150 C1350,300 1050,350 750,250 C400,100 150,350 -100,450 Z"
            fill="#B8B850"
            fillOpacity="0.3"
          />

          {/* Bottom right curved blob */}
          <path
            className="cta-bg-shape"
            d="M700,650 C800,450 1100,400 1550,550 L1550,650 Z"
            fill="#B8B850"
            fillOpacity="0.4"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex max-w-[1300px] flex-col items-stretch justify-between gap-8 px-6 pt-12 md:px-12 md:pt-16 lg:flex-row lg:gap-12 lg:px-20">
        {/* Left Side: Heading + Form */}
        <div className="z-10 flex w-full flex-col justify-center pb-12 md:pb-16">
          {/* Heading */}
          <h2
            className={`join-cta-heading mb-3 text-[28px] font-bold leading-tight tracking-wide md:text-[34px] lg:text-[30px] ${headingColor}`}
          >
            {title || 'Want to Become an IAS/IPS?'}
          </h2>

          {/* Subtitle */}
          <p
            className={`join-cta-heading mb-8 text-[15px] font-medium md:text-[18px] ${subtitleColor}`}
          >
            Get Your One to One Personalised Session with Our Expert Mentors
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="join-cta-form w-full max-w-[600px]">
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Full Name */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
              />

              {/* Mobile Number */}
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
              />

              {/* Email Id */}
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
              />

              {/* Target Year Select */}
              <div className="relative w-full">
                <select
                  name="targetYear"
                  value={formData.targetYear}
                  onChange={handleChange}
                  required
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

                {/* Dropdown arrow */}
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

            {/* Authorization Checkbox */}
            <label className="group mb-8 mt-2 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={authorized}
                onChange={(e) => setAuthorized(e.target.checked)}
                className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer rounded-sm border-none bg-white/80 checked:bg-blue-500"
              />

              <span className={`text-[12px] font-medium leading-[1.6] ${checkboxColor}`}>
                I authorize SRIRAM&apos;s IAS and its associates to contact me
                with updates notifications via email, SMS, WhatsApp, and voice
                call. This consent will override any registration for DNC / NDNC.
              </span>
            </label>

            {error && (
              <p className="mb-4 text-center text-[14px] font-semibold text-red-600">
                {error}
              </p>
            )}

            {success && (
              <p className="mb-4 text-center text-[14px] font-semibold text-green-700">
                Your session has been booked. Our team will reach out shortly.
              </p>
            )}

            {/* Dynamic Submit Button */}
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-3xl px-8 py-3.5 text-[18px] font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
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

        {/* Right Side: Standing Figure — scaled up & anchored to the bottom */}
        <div className="join-cta-image relative z-10 flex w-full justify-center self-end lg:justify-end">
          <div className="relative -mb-1 flex origin-bottom scale-[1.15] transform items-end justify-center md:scale-[1.25] lg:scale-[1.35]">
            {/* First Image: Man (Left / Back) */}
            <img
              src="/assets/course/cta-img.png"
              alt="Professional man"
              className="relative z-10 -ml-[30%] w-[280px] object-contain object-bottom drop-shadow-xl sm:w-[320px] md:w-[380px] lg:-ml-[-30%] lg:w-[650px]"
            />

            {/* Second Image: Woman (Right / Front) */}
            <img
              src="/assets/course/cta-img-1.png"
              alt="Professional woman"
              className="relative z-20 -ml-[30%] w-[220px] object-contain object-bottom drop-shadow-2xl sm:w-[260px] md:w-[300px] lg:-ml-[60%] lg:w-[360px]"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-center-last {
          text-align-last: center;
        }
      `}</style>
    </section>
  );
};

export default JoinCTA;