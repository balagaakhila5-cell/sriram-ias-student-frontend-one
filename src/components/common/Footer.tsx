'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useInViewport from '@/hooks/useInViewport';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import BookFreeDemoModal from './BookFreeDemoModal';
import FooterLink from './FooterLink';
import {
  FOOTER_BRANCHES,
  FOOTER_COURSE_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_WEBSITE_LINKS_PRIMARY,
  FOOTER_WEBSITE_LINKS_SECONDARY,
} from '@/config/footerLinks';

interface FooterProps {
  /** Skip GSAP animations and parallax — use on portal layouts for faster loads. */
  lightweight?: boolean;
}

const Footer: React.FC<FooterProps> = ({ lightweight = false }) => {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(footerRef, {
    once: true,
    threshold: 0.15,
  });

  useGSAP(
    () => {
      if (lightweight || prefersReducedMotion || !isInViewport) return;

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
    { dependencies: [isInViewport, prefersReducedMotion, lightweight], scope: footerRef }
  );

  useEffect(() => {
    if (lightweight) return;
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
  }, [lightweight]);

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
              type="button"
              onClick={() => setIsBookDemoOpen(true)}
              className="cursor-pointer text-white px-7 py-2.5 rounded-lg font-bold text-[15px] transition-all uppercase tracking-wide"
              style={{
                background:
                  'linear-gradient(88.42deg, #249EDC 15.64%, #135576 93.77%)',
              }}
            >
              BOOK A DEMO
            </button>

            <Link
              href="/course/mentorship-program"
              className="text-white px-7 py-2.5 rounded-lg font-bold text-[15px] transition-all tracking-wide"
              style={{
                background:
                  'linear-gradient(88.42deg, #249EDC 15.64%, #135576 93.77%)',
              }}
            >
              Book Free 1:1 Mentorship Session
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={FOOTER_SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group w-14 h-14 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:scale-110 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]"
            >
              <Image src="/assets/insta1.png.svg" alt="Instagram" width={32} height={32} />
            </a>

            <a
              href={FOOTER_SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="group w-14 h-14 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:bg-[#1877F2] hover:scale-110"
            >
              <Image src="/assets/facebook.png.svg" alt="Facebook" width={32} height={32} />
            </a>

            <a
              href={FOOTER_SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="group w-14 h-14 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:bg-red hover:scale-110"
            >
              <Image src="/assets/twitter.png.svg" alt="Twitter" width={32} height={32} />
            </a>

            <a
              href={FOOTER_SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
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
                  {FOOTER_WEBSITE_LINKS_PRIMARY.map((item) => (
                    <li key={`${item.label}-${item.href}`}>
                      <FooterLink href={item.href} external={item.external}>
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-link-group space-y-3">
                <h4 className="text-[18px] font-semibold tracking-[0.3px] text-white">
                  Website Links
                </h4>

                <ul className="space-y-1.5 text-[14px] text-[#B3B3B3] font-normal leading-[1.35] tracking-[0.2px]">
                  {FOOTER_WEBSITE_LINKS_SECONDARY.map((item) => (
                    <li key={`${item.label}-${item.href}`}>
                      <FooterLink href={item.href} external={item.external}>
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-link-group space-y-3">
                <h4 className="text-[18px] font-semibold tracking-[0.3px] text-white">
                  Courses Details
                </h4>

                <ul className="space-y-1.5 text-[14px] text-[#B3B3B3] font-normal leading-[1.35] tracking-[0.2px]">
                  {FOOTER_COURSE_LINKS.map((item, index) => (
                    <li key={`${item.label}-${index}`}>
                      <FooterLink href={item.href} external={item.external}>
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cities moved down and text spacing added */}
           <div className="footer-contacts grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mt-10 lg:mt-14">
              {FOOTER_BRANCHES.map((branch) => (
                <div key={branch.city} className="footer-contact space-y-4">
                  <Link href={branch.href} className="flex items-center gap-3 hover:opacity-90">
                    <Image
                      src={branch.image}
                      alt={branch.alt}
                      width={26}
                      height={26}
                      className="w-6 h-6 object-contain"
                    />
                    <h4 className="text-[18px] font-bold tracking-[1.2px] uppercase text-white">
                      {branch.city}
                    </h4>
                  </Link>

                  <div className="space-y-3 text-[14px] text-[#B3B3B3] leading-[1.38] tracking-[0.2px] font-normal">
                    <p className="max-w-[315px]">{branch.address}</p>

                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="text-white shrink-0" />
                      <p>
                        <span className="text-white font-semibold">Contact Us :</span>{' '}
                        <FooterLink
                          href={`tel:${branch.phone}`}
                          external
                          className="hover:text-white transition-colors"
                        >
                          {branch.phone}
                        </FooterLink>
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail size={15} className="text-white shrink-0" />
                      <p>
                        <span className="text-white font-semibold">Email Id :</span>{' '}
                        <FooterLink
                          href={`mailto:${branch.email}`}
                          external
                          className="hover:text-white transition-colors"
                        >
                          {branch.email}
                        </FooterLink>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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

      <BookFreeDemoModal
        isOpen={isBookDemoOpen}
        onClose={() => setIsBookDemoOpen(false)}
      />
    </footer>
  );
};

export default Footer;