'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { MapPin, Star, Building2, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import DiamondLayer from '../DiamondLayer';
import { heroDiamondConfig } from '../diamondConfigs';

gsap.registerPlugin(ScrollTrigger);

const OfflineCentres: React.FC = () => {
  const centres = [
    {
      id: 1,
      name: 'New Delhi',
      rating: 4.8,
      image: '/assets/Delhi-img.png',
      address: "New Delhi: SRIRAM'S IAS TOWER, 10 B, Pusa Road, Bada Bazar Rd, Near Metro Pillar No. 112, Old Rajinder Nagar, New Delhi - 110060",
      phone: '9811489560',
      email: 'sriram@gmail.com'
    },
    {
      id: 2,
      name: 'Hyderabad',
      rating: 4.8,
      image: '/assets/hyd.png',
      address: "Hyderabad: Plot No. 123, Road No. 45, Jubilee Hills, Near Metro Station, Hyderabad - 500033",
      phone: '9811489561',
      email: 'sriram.hyd@gmail.com'
    },
    {
      id: 3,
      name: 'Pune',
      rating: 4.8,
      image: '/assets/pune.png',
      address: "Pune: 4th Floor, City Center, MG Road, Camp Area, Near Railway Station, Pune - 411001",
      phone: '9811489562',
      email: 'sriram.pune@gmail.com'
    },
  ];

  const buttonStyle = {
    background: 'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
    boxShadow: '0px 4px 32px 0px #0000001F'
  };

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header Animation
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
      }
    });

    // Cards Stagger
    gsap.fromTo('.offline-card',
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
        }
      }
    );

  }, { dependencies: [prefersReducedMotion], scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-12 px-4 md:px-16  bg-white">
      <DiamondLayer config={heroDiamondConfig} />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="offline-header text-center">
          <h2 className="global-section-heading">
            OFFLINE CENTRES
          </h2>
        </div>

        {/* Centers Grid */}
        <div className="offline-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {centres.map((center) => (
            <div
              key={center.id}
              className="offline-card group relative overflow-hidden shadow-2xl cursor-pointer aspect-square rounded-none bg-black"
            >
              {/* Background Image */}
              <Image
                src={center.image}
                alt={center.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end transition-all duration-500 group-hover:translate-y-[-20px] group-hover:opacity-0">
                <div className="flex justify-between items-center text-white mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full">
                      <Building2 size={24} className="text-black" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">{center.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <span className="text-[#D9F400]">{center.rating}</span>
                    <Star size={20} fill="currentColor" className="text-[#D9F400]" />
                  </div>
                </div>
                <button className="w-full text-white py-2 rounded-xl font-semibold text-lg" style={buttonStyle}>
                  Explore More
                </button>
              </div>

              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 flex flex-col p-8"
                style={{ background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.95) 100%)' }}
              >
                <div
                  className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none"
                  style={{
                    background: 'linear-gradient(181.87deg, #FFDFA8 -157.44%, rgba(255, 226, 176, 0.96) -157.4%, rgba(255, 234, 198, 0.67) 216.94%, rgba(250, 211, 144, 0.8) 216.94%)',
                    filter: 'blur(80px)'
                  }}
                />
                <div
                  className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none"
                  style={{
                    background: 'linear-gradient(181.87deg, #FFDFA8 -157.44%, rgba(255, 226, 176, 0.96) -157.4%, rgba(255, 234, 198, 0.67) 216.94%, rgba(250, 211, 144, 0.8) 216.94%)',
                    filter: 'blur(80px)'
                  }}
                />

                {/* Header in Hover State */}
                <div className="flex justify-between items-center text-white mb-4 pb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full">
                      <Building2 size={24} className="text-black" />
                    </div>
                    <span className="text-2xl font-bold">{center.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D9F400] font-bold text-xl">{center.rating}</span>
                    <Star size={20} fill="currentColor" className="text-[#D9F400]" />
                  </div>
                </div>

                <div className="flex-grow space-y-6 text-white/90 relative z-10">
                  <div className="flex items-start gap-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-500 delay-200">
                    <MapPin size={22} className="text-primary shrink-0 mt-1" />
                    <p className="text-sm leading-relaxed">{center.address}</p>
                  </div>

                  <div className="flex items-center gap-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-500 delay-300">
                    <div className="bg-white/10 p-2 rounded-lg">
                      <Phone size={18} />
                    </div>
                    <span className="text-base font-semibold">{center.phone}</span>
                  </div>

                  <div className="flex items-center gap-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-500 delay-[400ms]">
                    <div className="bg-white/10 p-2 rounded-lg">
                      <Mail size={18} />
                    </div>
                    <span className="text-base font-semibold">{center.email}</span>
                  </div>
                </div>

                {/* Hover Button */}
                <div className="mt-auto transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-500 delay-[500ms] relative z-10">
                  <button className="w-full text-white py-2 rounded-xl font-semibold text-lg hover:brightness-110 active:scale-[0.98] transition-all" style={buttonStyle}>
                    Explore More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfflineCentres;
