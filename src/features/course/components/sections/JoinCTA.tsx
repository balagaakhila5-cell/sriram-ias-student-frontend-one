

'use client';

import React, { useState, useRef } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

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

  useGSAP(() => {
    if (prefersReducedMotion) return;

    // Animate ribbon shapes with left-to-right wipe fill effect
    const bgShapes = gsap.utils.toArray<Element>('.cta-bg-shape');
    bgShapes.forEach((shape, i) => {
      gsap.fromTo(shape,
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
          }
        }
      );
    });

    gsap.fromTo('.join-cta-heading',
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
        }
      }
    );

    gsap.fromTo('.join-cta-form',
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
        }
      }
    );

    gsap.fromTo('.join-cta-image',
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
        }
      }
    );
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  const city = propCity?.toLowerCase() || course?.city?.toLowerCase() || 'delhi';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData, 'Authorized:', authorized);
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
      className="w-full relative overflow-hidden font-['Montserrat',sans-serif]"
      style={{ background: sectionBg }}
    >
      {/* Animated background shapes - Matches the thick sweeps of Image 1 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="absolute inset-0 w-full h-full"
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
      <div className="relative z-10 max-w-[1300px] mx-auto flex flex-col lg:flex-row items-stretch justify-between px-6 md:px-12 lg:px-20 pt-12 md:pt-16 gap-8 lg:gap-12">

        {/* Left Side: Heading + Form */}
        <div className="w-full flex flex-col justify-center pb-12 md:pb-16 z-10">

          {/* Heading */}
          <h2 className={`join-cta-heading text-[28px] md:text-[34px] lg:text-[30px] font-bold ${headingColor} leading-tight mb-3 tracking-wide`}>
            {title || 'Want to Become an IAS/IPS?'}
          </h2>

          {/* Subtitle */}
          <p className={`join-cta-heading text-[15px] md:text-[18px] font-medium ${subtitleColor} mb-8`}>
            Get Your One to One Personalised Session with Our Expert Mentors
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="join-cta-form w-full max-w-[600px]">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Full Name */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-3xl bg-white border-none text-[16px] text-gray-800 placeholder-gray-400 font-medium outline-none focus:ring-2 focus:ring-blue-300 transition-all shadow-sm"
              />
              {/* Mobile Number */}
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-3xl bg-white border-none text-[16px] text-gray-800 placeholder-gray-400 font-medium outline-none focus:ring-2 focus:ring-blue-300 transition-all shadow-sm"
              />

              {/* Email Id */}
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-3xl bg-white border-none text-[16px] text-gray-800 placeholder-gray-400 font-medium outline-none focus:ring-2 focus:ring-blue-300 transition-all shadow-sm"
              />
              {/* Target Year Select */}
              <div className="relative w-full">
                <select
                  name="targetYear"
                  value={formData.targetYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-3xl bg-white border-none text-[16px] text-gray-500 font-medium outline-none focus:ring-2 focus:ring-blue-300 transition-all shadow-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>Target UPSC Attempt Year</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
                {/* Dropdown arrow */}
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Authorization Checkbox */}
            <label className="flex items-start gap-3 mb-8 cursor-pointer group mt-2">
              <input
                type="checkbox"
                checked={authorized}
                onChange={(e) => setAuthorized(e.target.checked)}
                className="mt-1 w-[18px] h-[18px] shrink-0 rounded-sm border-none bg-white/80 checked:bg-blue-500 cursor-pointer"
              />
              <span className={`text-[12px] ${checkboxColor} leading-[1.6] font-medium`}>
                I authorize SRI RAM&apos;s IAS and its associates to contact me with updates notifications via email, SMS, WhatsApp, and voice call. This consent will override any registration for DNC / NDNC.
              </span>
            </label>

            {/* Dynamic Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-3xl text-white text-[18px] font-semibold shadow-md hover:shadow-lg hover:opacity-95 transition-all"
                style={{ background: 'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)' }}
              >
                Book your session now
              </button>
            </div>

          </form>
        </div>

        {/* Right Side: Standing Figure — scaled up & anchored to the bottom */}
        <div className="join-cta-image w-full flex justify-center lg:justify-end self-end relative z-10">
          <div className="relative flex items-end justify-center origin-bottom transform scale-[1.15] md:scale-[1.25] lg:scale-[1.35] -mb-1">

            {/* First Image: Man (Left / Back) */}
            <img
              src="/assets/course/cta-img.png"
              alt="Professional man"
              className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[650px] object-contain object-bottom drop-shadow-xl relative z-10 -ml-[30%] lg:-ml-[-30%]"
            />

            {/* Second Image: Woman (Right / Front) */}
            <img
              src="/assets/course/cta-img-1.png"
              alt="Professional woman"
              className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[360px] object-contain object-bottom drop-shadow-2xl relative z-20 -ml-[30%] lg:-ml-[60%]"
            />

          </div>
        </div>

      </div>
    </section>
  );
};

export default JoinCTA;