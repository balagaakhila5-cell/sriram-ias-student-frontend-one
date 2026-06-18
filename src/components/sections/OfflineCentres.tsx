'use client';

import React, { useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Building2, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import DiamondLayer from '../DiamondLayer';
import { heroDiamondConfig } from '../diamondConfigs';
import { useHomepage } from '@/features/homepage/hooks/useHomepage';
import { centerPageHref } from '@/features/homepage/utils/homepageLinks';
import { EmailLink, PhoneLink } from '@/components/common/ContactLinks';
import { FOOTER_BRANCHES } from '@/config/footerLinks';

gsap.registerPlugin(ScrollTrigger);

const [delhiBranch, hyderabadBranch, puneBranch] = FOOTER_BRANCHES;

const fallbackCentres = [
  {
    id: 'delhi',
    name: 'NEW DELHI',
    image: '/assets/Delhi-img.png',
    address: delhiBranch.address,
    phone: delhiBranch.phone,
    email: delhiBranch.email,
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    image: '/assets/hyd.png',
    address: hyderabadBranch.address,
    phone: hyderabadBranch.phone,
    email: hyderabadBranch.email,
  },
  {
    id: 'pune',
    name: 'Pune',
    image: '/assets/pune.png',
    address: puneBranch.address,
    phone: puneBranch.phone,
    email: puneBranch.email,
  },
];

const centreDirectory: Record<string, typeof fallbackCentres[number]> = {
  'new delhi': fallbackCentres[0],
  delhi: { ...fallbackCentres[0], name: 'NEW DELHI' },
  hyderabad: fallbackCentres[1],
  pune: fallbackCentres[2],
  bengaluru: { ...fallbackCentres[1], name: 'Bengaluru', image: '/assets/hyd.png' },
  bangalore: { ...fallbackCentres[1], name: 'Bangalore', image: '/assets/hyd.png' },
};

const normalizeKey = (value: string) =>
  value.toLowerCase().replace(/\s+/g, ' ').trim();

const buttonClassName =
  'inline-flex items-center justify-center px-10 py-2.5 rounded-full font-semibold text-base text-white hover:brightness-110 active:scale-[0.98] transition-all';

const buttonStyle = {
  background: 'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
  boxShadow: '0px 4px 32px 0px #0000001F',
};

const OfflineCentres: React.FC = () => {
  const { data: homepage } = useHomepage();
  const section5 = homepage?.section5;

  const centres = useMemo(() => {
    const apiCards = section5?.cards ?? [];
    if (apiCards.length === 0) return fallbackCentres;

    return apiCards.map((card, index) => {
      const base =
        centreDirectory[normalizeKey(card.name)]
        ?? fallbackCentres[index % fallbackCentres.length];

      return {
        ...base,
        id: card._id ?? base.id,
        name: card.name ?? base.name,
      };
    });
  }, [section5?.cards]);

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.offline-header', {
      y: 100,
      opacity: 0,
      immediateRender: false,
      scale: 0.95,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
      force3D: true,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    gsap.fromTo(
      '.offline-card',
      { y: 40, opacity: 0, immediateRender: false },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: '.offline-grid',
          start: 'top 75%',
          once: true,
        },
      },
    );
  }, { dependencies: [prefersReducedMotion, centres.length], scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative pt-6 pb-12 px-4 md:px-16 bg-white">
      <DiamondLayer config={heroDiamondConfig} />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        <div className="offline-header text-center">
          <h2 className="global-section-heading">
            {section5?.title ?? 'OFFLINE CENTRES'}
          </h2>
        </div>

        <div className="offline-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
          {centres.map((center) => {
            const centerHref = centerPageHref(center.name);

            return (
              <div
                key={center.id}
                className="offline-card group relative w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[380px] overflow-hidden shadow-2xl cursor-pointer aspect-square rounded-none bg-black"
              >
                <Image
                  src={center.image}
                  alt={center.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                {/* Default state — city name + Explore inside card */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-end p-6 text-center sm:p-8 transition-opacity duration-500 group-hover:opacity-0">
                  <div className="mb-5 flex items-center justify-center gap-3 text-white">
                    <div className="shrink-0 rounded-full bg-white p-2">
                      <Building2 size={24} className="text-black" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {center.name}
                    </span>
                  </div>
                  <Link
                    href={centerHref}
                    className={buttonClassName}
                    style={buttonStyle}
                  >
                    Explore
                  </Link>
                </div>

                {/* Hover state — info fills full card height */}
                <div
                  className="absolute inset-0 z-20 flex h-full translate-y-full flex-col items-center p-6 text-center transition-transform duration-500 ease-out group-hover:translate-y-0 sm:p-8 overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.95) 100%)',
                  }}
                >
                  <div
                    className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(181.87deg, #FFDFA8 -157.44%, rgba(255, 226, 176, 0.96) -157.4%, rgba(255, 234, 198, 0.67) 216.94%, rgba(250, 211, 144, 0.8) 216.94%)',
                      filter: 'blur(80px)',
                    }}
                  />
                  <div
                    className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(181.87deg, #FFDFA8 -157.44%, rgba(255, 226, 176, 0.96) -157.4%, rgba(255, 234, 198, 0.67) 216.94%, rgba(250, 211, 144, 0.8) 216.94%)',
                      filter: 'blur(80px)',
                    }}
                  />

                  <div className="relative z-10 flex w-full shrink-0 items-center justify-center gap-3 border-b border-white/15 pb-4 text-white">
                    <div className="shrink-0 rounded-full bg-white p-2">
                      <Building2 size={22} className="text-black" />
                    </div>
                    <span className="text-2xl font-bold sm:text-3xl">{center.name}</span>
                  </div>

                  <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-evenly py-4 text-white/90">
                    <div className="flex max-w-[92%] translate-y-8 items-start justify-center gap-3 opacity-0 transition-[transform,opacity] duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100">
                      <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
                      <p className="text-left text-sm leading-relaxed">{center.address}</p>
                    </div>

                    <div className="flex translate-y-8 items-center justify-center gap-3 opacity-0 transition-[transform,opacity] duration-500 delay-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="shrink-0 rounded-lg bg-white/10 p-2">
                        <Phone size={18} />
                      </div>
                      <PhoneLink
                        value={center.phone}
                        className="text-sm font-semibold hover:underline sm:text-base"
                      />
                    </div>

                    <div className="flex max-w-[92%] translate-y-8 items-center justify-center gap-3 opacity-0 transition-[transform,opacity] duration-500 delay-[400ms] group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="shrink-0 rounded-lg bg-white/10 p-2">
                        <Mail size={18} />
                      </div>
                      <EmailLink
                        value={center.email}
                        className="break-all text-left text-sm font-semibold hover:underline sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 shrink-0 translate-y-8 pt-2 opacity-0 transition-[transform,opacity] duration-500 delay-[500ms] group-hover:translate-y-0 group-hover:opacity-100">
                    <Link
                      href={centerHref}
                      className={buttonClassName}
                      style={buttonStyle}
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OfflineCentres;
