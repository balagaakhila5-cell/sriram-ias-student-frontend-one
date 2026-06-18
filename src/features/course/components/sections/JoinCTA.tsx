'use client';

import React, { useState, useRef } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { useSubmitEnquiry } from '@/features/enquiry/hooks/useEnquiry';
import { useEnquiryCourses } from '@/features/enquiry/hooks/useEnquiryLookups';
import {
  getEnquiryCenterName,
} from '@/features/center/data/centerCourseCategories';
import DemoFormSelect from '@/components/common/DemoFormSelect';

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
  const {
    mutate: submitEnquiry,
    isPending,
    isSuccess,
    isError,
    error,
  } = useSubmitEnquiry();

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
  const enquiryCenterName = getEnquiryCenterName(city);
  // The backend requires a resolvable course on every enquiry; this generic CTA
  // has no course picker, so default to the branch's first real course.
  const { data: cityCourses = [] } = useEnquiryCourses(enquiryCenterName);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.mobile.trim()) return;

    submitEnquiry(
      {
        name: formData.fullName.trim(),
        phone: formData.mobile.trim(),
        email: formData.email.trim(),
        targetYear: formData.targetYear || undefined,
        centerName: enquiryCenterName,
        course: cityCourses[0]?._id,
        courseTitle: cityCourses[0]?.title,
        source: course ? 'course' : 'main',
      },
      {
        onSuccess: () => {
          setFormData({ fullName: '', mobile: '', email: '', targetYear: '' });
          setAuthorized(false);
        },
      },
    );
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
                className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
              />

              {/* Mobile Number */}
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
              />

              {/* Email Id */}
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-3xl border-none bg-white px-4 py-3.5 text-center text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all placeholder:text-center placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
              />

              {/* Target Year Select */}
              <DemoFormSelect
                value={formData.targetYear}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, targetYear: value }))
                }
                options={[
                  { value: '2025', label: '2025' },
                  { value: '2026', label: '2026' },
                  { value: '2027', label: '2027' },
                  { value: '2028', label: '2028' },
                  { value: '2029', label: '2029' },
                ]}
                placeholder="Target UPSC Attempt Year"
                variant="pill"
              />
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

            {/* Dynamic Submit Button */}
            <div className="mt-4 flex flex-col items-center gap-3">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-3xl px-8 py-3.5 text-[18px] font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)',
                }}
              >
                {isPending ? 'Submitting…' : 'Book your session now'}
              </button>

              {isSuccess && (
                <p className="text-[14px] font-semibold text-green-700">
                  Thank you! Our team will contact you shortly.
                </p>
              )}
              {isError && (
                <p className="text-[14px] font-semibold text-red-600">
                  {(error as Error)?.message ??
                    'Something went wrong. Please try again.'}
                </p>
              )}
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