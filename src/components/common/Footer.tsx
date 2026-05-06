'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useInViewport from '@/hooks/useInViewport';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(footerRef, {
    once: true,
    threshold: 0.15,
  });

  useGSAP(
    () => {
      if (prefersReducedMotion || !isInViewport) return;

      const zone = footerRef.current;
      if (!zone) return;

      const q = gsap.utils.selector(zone);
      const timeline = gsap.timeline();

      timeline.from(q('.footer-top-bar'), {
        x: -150,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
      });

      timeline.from(
        q('.footer-link-group'),
        {
          x: -150,
          opacity: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      timeline.from(
        q('.footer-contact'),
        {
          x: -150,
          opacity: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.7'
      );

      timeline.from(
        q('.footer-vertical-text-container'),
        {
          x: 150,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=1.0'
      );

      return () => {
        timeline.kill();
      };
    },
    { dependencies: [isInViewport, prefersReducedMotion], scope: footerRef }
  );

  useEffect(() => {
    const zone = footerRef.current;
    if (!zone) return;

    const columns = Array.from(zone.querySelectorAll<HTMLElement>('.moving-col'));
    const xSetters = columns.map((col) =>
      gsap.quickTo(col, 'x', { duration: 0.6, ease: 'power3.out' })
    );

    const movementMultipliers = [50, 80, 60, 70];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const normalizedX = x / rect.width - 0.5;

      xSetters.forEach((setX, index) => {
        setX(normalizedX * movementMultipliers[index]);
      });
    };

    const handleMouseLeave = () => {
      xSetters.forEach((setX) => setX(0));
    };

    zone.addEventListener('mousemove', handleMouseMove);
    zone.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      zone.removeEventListener('mousemove', handleMouseMove);
      zone.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#1a1a18] text-white pt-12 pb-10 px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto space-y-9">
        {/* Top CTA & Social Bar */}
        <div className="footer-top-bar flex flex-col lg:flex-row items-center justify-between gap-6 -mt-2">
          <div className="flex flex-wrap items-center gap-4 -mt-3">
            <button
              className="text-white px-7 py-2.5 rounded-lg font-bold text-[15px] transition-all uppercase tracking-wide"
              style={{
                background:
                  'linear-gradient(88.42deg, #249EDC 15.64%, #135576 93.77%)',
              }}
            >
              BOOK A DEMO
            </button>

            <button
              className="text-white px-7 py-2.5 rounded-lg font-bold text-[15px] transition-all tracking-wide"
              style={{
                background:
                  'linear-gradient(88.42deg, #249EDC 15.64%, #135576 93.77%)',
              }}
            >
              Book Free 1:1 Mentorship Session
            </button>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="group w-14 h-14 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:scale-110 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]"
            >
              <Image src="/assets/insta1.png.svg" alt="Instagram" width={32} height={32} />
            </a>

            <a
              href="#"
              className="group w-14 h-14 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:bg-[#1877F2] hover:scale-110"
            >
              <Image src="/assets/facebook.png.svg" alt="Facebook" width={32} height={32} />
            </a>

            <a
              href="#"
              className="group w-14 h-14 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:bg-red hover:scale-110"
            >
              <Image src="/assets/twitter.png.svg" alt="Twitter" width={32} height={32} />
            </a>

            <a
              href="#"
              className="group w-14 h-14 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:bg-red-600 hover:scale-110"
            >
              <Image src="/assets/youtube.png.svg" alt="YouTube" width={32} height={32} />
            </a>
          </div>
        </div>

        {/* Links & Vertical Text Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 relative items-start">
          {/* Left Side */}
          <div className="flex-1">
            {/* Website Links */}
            <div className="footer-links grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 -mt-1">
              <div className="footer-link-group space-y-3">
                <h4 className="text-[18px] font-semibold tracking-[0.3px] text-white">
                  Website Links
                </h4>

                <ul className="space-y-1.5 text-[14px] text-[#B3B3B3] font-normal leading-[1.35] tracking-[0.2px]">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/director-message" className="hover:text-white transition-colors">Director&apos;s Messages</a></li>
                  <li><a href="/why-choose-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="/branches" className="hover:text-white transition-colors">Our Branches</a></li>
                  <li><a href="/referral" className="hover:text-white transition-colors">Referral Policy</a></li>
                  <li><a href="/upsc-articles" className="hover:text-white transition-colors">UPSC Articles</a></li>
                </ul>
              </div>

              <div className="footer-link-group space-y-3">
                <h4 className="text-[18px] font-semibold tracking-[0.3px] text-white">
                  Website Links
                </h4>

                <ul className="space-y-1.5 text-[14px] text-[#B3B3B3] font-normal leading-[1.35] tracking-[0.2px]">
                  <li><a href="/articles" className="hover:text-white transition-colors">UPSC Articles</a></li>
                  <li><a href="/blogs" className="hover:text-white transition-colors">UPSC Blogs</a></li>
                  <li><a href="/exploration" className="hover:text-white transition-colors">Exploration</a></li>
                  <li><a href="/quizzes" className="hover:text-white transition-colors">Daily Quizzes</a></li>
                  <li><a href="/faqs" className="hover:text-white transition-colors">FAQ&apos;S</a></li>
                  <li><a href="/career" className="hover:text-white transition-colors">Career</a></li>
                  <li><a href="/login" className="hover:text-white transition-colors">Student Login</a></li>
                  <li><a href="/enroll" className="hover:text-white transition-colors">Enroll Now</a></li>
                </ul>
              </div>

              <div className="footer-link-group space-y-3">
                <h4 className="text-[18px] font-semibold tracking-[0.3px] text-white">
                  Courses Details
                </h4>

                <ul className="space-y-1.5 text-[14px] text-[#B3B3B3] font-normal leading-[1.35] tracking-[0.2px]">
                  <li><a href="/all-courses" className="hover:text-white transition-colors">All Courses</a></li>
                  <li><a href="/psir" className="hover:text-white transition-colors">PSIR Test Series and Mentorship</a></li>
                  <li><a href="/psir-optional" className="hover:text-white transition-colors">PSIR Optional Courses</a></li>
                  <li><a href="/geography" className="hover:text-white transition-colors">Geography Optional Foundation Courses</a></li>
                  <li><a href="/mains-enrichment" className="hover:text-white transition-colors">Mains Enrichment Program 2025</a></li>
                  <li><a href="/mains-test-series" className="hover:text-white transition-colors">Mains Test Series CSE 2025</a></li>
                  <li><a href="/essay-test-series" className="hover:text-white transition-colors">Essay Test Series 2025</a></li>
                  <li><a href="/mains-test-series-alt" className="hover:text-white transition-colors">Mains Test Series CSE 2025</a></li>
                </ul>
              </div>
            </div>

            {/* Cities moved down and text spacing added */}
           <div className="footer-contacts grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mt-10 lg:mt-14">
              <div className="footer-contact space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/del-footer.png"
                    alt="Delhi"
                    width={26}
                    height={26}
                    className="w-6 h-6 object-contain"
                  />
                  <h4 className="text-[18px] font-bold tracking-[1.2px] uppercase text-white">
                    NEW DELHI
                  </h4>
                </div>

                <div className="space-y-3 text-[14px] text-[#B3B3B3] leading-[1.38] tracking-[0.2px] font-normal">
                  <p className="max-w-[315px]">
                    SRIRAM&apos;S IAS TOWER,10 B, Pusa Road, Bada Bazar Rd, Near Metro Pillar No. 112, Old Rajinder Nagar, New Delhi - 110060
                  </p>

                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-white shrink-0" />
                    <p>
                      <span className="text-white font-semibold">Contact Us :</span> 9811489560
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail size={15} className="text-white shrink-0" />
                    <p>
                      <span className="text-white font-semibold">Email Id :</span> sriramsias@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="footer-contact space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/hyd-footer.png"
                    alt="Hyderabad"
                    width={26}
                    height={26}
                    className="w-6 h-6 object-contain"
                  />
                  <h4 className="text-[18px] font-bold tracking-[1.2px] uppercase text-white">
                    HYDERABAD
                  </h4>
                </div>

                <div className="space-y-3 text-[14px] text-[#B3B3B3] leading-[1.38] tracking-[0.2px] font-normal">
                  <p className="max-w-[315px]">
                    SRIRAM&apos;S IAS, Opposite Sudharshan Theatre, Pillar No 40, Ashoka Nagar, Hyderabad, 500020
                  </p>

                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-white shrink-0" />
                    <p>
                      <span className="text-white font-semibold">Contact Us :</span> 8121191985
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail size={15} className="text-white shrink-0" />
                    <p>
                      <span className="text-white font-semibold">Email Id :</span> sriramsias@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="footer-contact space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/pune-footer.png"
                    alt="Pune"
                    width={26}
                    height={26}
                    className="w-6 h-6 object-contain"
                  />
                  <h4 className="text-[18px] font-bold tracking-[1.2px] uppercase text-white">
                    PUNE
                  </h4>
                </div>

                <div className="space-y-3 text-[14px] text-[#B3B3B3] leading-[1.38] tracking-[0.2px] font-normal">
                  <p className="max-w-[315px]">
                    SRIRAM&apos;S IAS, 385, Near Modi Ganpati Mandir, Patrya Maruti Chowk Narayan Peth, Pune 41211
                  </p>

                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-white shrink-0" />
                    <p>
                      <span className="text-white font-semibold">Contact Us :</span> 9689000979
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail size={15} className="text-white shrink-0" />
                    <p>
                      <span className="text-white font-semibold">Email Id :</span> sriramsias@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Masked Sliced Effect Zone */}
          <div className="footer-vertical-text-container hidden lg:flex items-start select-none pr-4 shrink-0 justify-end h-[520px] pointer-events-none gap-2 lg:gap-3 mt-5">
            {/* IFS */}
            <div className="relative w-[42px] h-full overflow-hidden z-10">
              <div className="moving-col absolute inset-0 flex flex-col gap-5 text-[38px] font-black leading-[0.7] text-white tracking-widest uppercase items-center justify-center">
                <span className="[writing-mode:vertical-rl]">IFS</span>
                <span className="[writing-mode:vertical-rl]">IFS</span>
                <span className="[writing-mode:vertical-rl]">IFS</span>
                <span className="[writing-mode:vertical-rl]">IFS</span>
              </div>
            </div>

            {/* IAS */}
            <div className="relative w-[64px] h-full overflow-hidden">
              <div className="moving-col absolute inset-0 flex flex-col gap-5 text-[58px] font-black leading-[0.7] text-white tracking-widest uppercase items-center justify-center">
                <span className="[writing-mode:vertical-rl]">IAS</span>
                <span className="[writing-mode:vertical-rl]">IAS</span>
                <span className="[writing-mode:vertical-rl]">IAS</span>
              </div>
            </div>

            {/* IPS */}
            <div className="relative w-[64px] h-full overflow-hidden">
              <div className="moving-col absolute inset-0 flex flex-col gap-5 text-[58px] font-black leading-[0.7] text-white tracking-widest uppercase items-center justify-center">
                <span className="[writing-mode:vertical-rl]">IPS</span>
                <span className="[writing-mode:vertical-rl]">IPS</span>
                <span className="[writing-mode:vertical-rl]">IPS</span>
              </div>
            </div>

            {/* IRS */}
            <div className="relative w-[42px] h-full overflow-hidden">
              <div className="moving-col absolute inset-0 flex flex-col gap-5 text-[38px] font-black leading-[0.7] text-white tracking-widest uppercase items-center justify-center">
                <span className="[writing-mode:vertical-rl]">IRS</span>
                <span className="[writing-mode:vertical-rl]">IRS</span>
                <span className="[writing-mode:vertical-rl]">IRS</span>
                <span className="[writing-mode:vertical-rl]">IRS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;