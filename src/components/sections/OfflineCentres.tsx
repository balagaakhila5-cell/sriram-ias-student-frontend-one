'use client';

import React, { useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Building2, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import DiamondLayer from '../DiamondLayer';
import { heroDiamondConfig } from '../diamondConfigs';
import { useHomepage } from '@/features/homepage/hooks/useHomepage';
import { centerPageHref } from '@/features/homepage/utils/homepageLinks';

gsap.registerPlugin(ScrollTrigger);

const fallbackCentres = [
  {
    id: 'delhi',
    name: 'New Delhi',
    rating: 4.8,
    image: '/assets/Delhi-img.png',
    address:
      "New Delhi: SRIRAM'S IAS TOWER, 10 B, Pusa Road, Bada Bazar Rd, Near Metro Pillar No. 112, Old Rajinder Nagar, New Delhi - 110060",
    phone: '9811489560',
    email: 'sriram@gmail.com',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    rating: 4.8,
    image: '/assets/hyd.png',
    address:
      'Hyderabad: Plot No. 123, Road No. 45, Jubilee Hills, Near Metro Station, Hyderabad - 500033',
    phone: '9811489561',
    email: 'sriram.hyd@gmail.com',
  },
  {
    id: 'pune',
    name: 'Pune',
    rating: 4.8,
    image: '/assets/pune.png',
    address:
      'Pune: 4th Floor, City Center, MG Road, Camp Area, Near Railway Station, Pune - 411001',
    phone: '9811489562',
    email: 'sriram.pune@gmail.com',
  },
];

const centreDirectory: Record<string, (typeof fallbackCentres)[number]> = {
  'new delhi': fallbackCentres[0],
  delhi: { ...fallbackCentres[0], name: 'Delhi' },
  hyderabad: fallbackCentres[1],
  pune: fallbackCentres[2],
  bengaluru: { ...fallbackCentres[1], name: 'Bengaluru', image: '/assets/hyd.png' },
  bangalore: { ...fallbackCentres[1], name: 'Bangalore', image: '/assets/hyd.png' },
};

const normalizeKey = (value: string) =>
  value.toLowerCase().replace(/\s+/g, ' ').trim();

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

  const buttonStyle = {
    background: 'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
    boxShadow: '0px 4px 32px 0px #0000001F',
  };

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    gsap.from('.offline-header', {
      y: 100,
      opacity: 0,
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
      { y: 40, opacity: 0 },
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
    <section
      ref={sectionRef}
      className="offline-centres-section relative py-16 md:py-20 px-4 md:px-16"
    >
      <DiamondLayer config={heroDiamondConfig} />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 md:space-y-16">
        <div className="offline-header text-center">
          <h2 className="global-section-heading">
            {section5?.title ?? 'OFFLINE CENTRES'}
          </h2>
        </div>

        <div className="offline-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {centres.map((center) => {
            const centerHref = centerPageHref(center.name);

            return (
              <article
                key={center.id}
                className="offline-card group cursor-pointer"
              >
                <div className="offline-card__media">
                  <Image
                    src={center.image}
                    alt={center.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="offline-card__media-image"
                  />
                </div>

                <div className="offline-card__body">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="rounded-full bg-[#EBF0FF] p-2 shrink-0">
                        <Building2 size={24} className="text-[#106A96]" />
                      </div>
                      <span className="truncate text-xl font-bold tracking-tight text-gray-900">
                        {center.name}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 text-lg font-bold">
                      <span className="text-[#D9F400] drop-shadow-sm">
                        {center.rating}
                      </span>
                      <Star
                        size={20}
                        fill="currentColor"
                        className="text-[#D9F400]"
                      />
                    </div>
                  </div>

                  <div className="offline-card__details space-y-4 text-gray-700">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="mt-0.5 shrink-0 text-[#106A96]" />
                      <p className="text-sm leading-relaxed">{center.address}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#F3F7FB] p-2">
                        <Phone size={18} className="text-[#106A96]" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {center.phone}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#F3F7FB] p-2">
                        <Mail size={18} className="text-[#106A96]" />
                      </div>
                      <span className="truncate text-sm font-semibold text-gray-900">
                        {center.email}
                      </span>
                    </div>
                  </div>

                  <div className="offline-card__cta">
                    <Link
                      href={centerHref}
                      className="block w-full rounded-xl py-2.5 text-center text-lg font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
                      style={buttonStyle}
                    >
                      Explore More
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OfflineCentres;
