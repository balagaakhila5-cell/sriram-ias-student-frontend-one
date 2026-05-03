'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
    city: string;
}

const OurStaff: React.FC<Props> = ({ city }) => {
    const containerRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(() => {
        if (prefersReducedMotion) return;

        gsap.from('.our-staff-heading', {
            y: 70,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 60%',
                once: true,
            }
        });

        gsap.from('.our-staff-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.our-staff-card',
                start: 'top 85%',
                once: true,
            }
        });
    }, { dependencies: [prefersReducedMotion], scope: containerRef });

    const staffList = [
        { id: 1, name: "Kotla Darshan", bg: "bg-[#ECA01D]", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=500&auto=format&fit=crop" },
        { id: 2, name: "Kotla Darshan", bg: "bg-[#D3DAE8]", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&h=500&auto=format&fit=crop" },
        { id: 3, name: "Kotla Darshan", bg: "bg-[#8E74A2]", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=500&auto=format&fit=crop" },
        { id: 4, name: "Kotla Darshan", bg: "bg-[#B85C54]", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&h=500&auto=format&fit=crop" },
    ];

    return (
        <section ref={containerRef} className="relative w-full py-24 bg-white overflow-hidden">

            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-image-placeholder"
                style={{
                    backgroundImage: "url('/assets/our-centers/our-staff-bg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">

                {/* Header */}
                <div className="our-staff-heading w-full text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-[36px] md:text-[50px] font-[900] uppercase tracking-wider mb-6 relative z-10 font-['Montserrat']">
                        <span className="bg-gradient-to-r from-[rgba(225,97,101,0.8)] to-[#20A0E0] bg-clip-text text-transparent">
                            OUR STAFF
                        </span>
                    </h2>
                    <p className="text-gray-700 text-lg md:text-xl font-medium">
                        Backed by a team of committed professionals, we provide continuous support, expert guidance, and personalized attention to help you excel in every stage of the UPSC process.
                    </p>
                </div>

                {/* Staff Content Layout */}
                <div className="w-full flex flex-col xl:flex-row gap-8 items-stretch">

                    {/* Featured Left Card (Kotla Darshini) */}
                    <div className="our-staff-card flex flex-col sm:flex-row w-full xl:w-[650px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden shrink-0">
                        {/* Image Side */}
                        <div className="w-full sm:w-[250px] h-[300px] sm:h-auto bg-[#B85C54] relative shrink-0">
                            <Image
                                unoptimized
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=600&auto=format&fit=crop"
                                fill
                                sizes="(max-width: 640px) 100vw, 400px"
                                className="object-cover object-top mix-blend-luminosity opacity-90"
                                alt="Kotla Darshini"
                            />
                        </div>

                        {/* Content Side */}
                        <div className="w-full p-8 md:p-10 flex flex-col justify-center bg-white">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Kotla Darshini</h3>
                            <p className="text-sm text-gray-600 font-medium mb-8">20 + Years of Experience in Social</p>

                            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-800">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-[#519DC8] mt-[2px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Mentored AIR Students</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-[#519DC8] mt-[2px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                    <span>PhD In Delhi University in sociology</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-[#519DC8] mt-[2px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Built Strong conceptual foundation</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side Carousel */}
                    <div className="flex-1 overflow-hidden relative">
                        <div className="flex flex-row gap-6 overflow-x-auto pb-8 pt-2 pl-2 pr-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {staffList.map((staff) => (
                                <div key={staff.id} className="our-staff-card flex flex-col w-[220px] shrink-0 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
                                    <div className={`w-full h-[260px] relative ${staff.bg}`}>
                                        <Image
                                            unoptimized
                                            src={staff.image}
                                            fill
                                            sizes="220px"
                                            className="object-cover object-top mix-blend-luminosity opacity-90"
                                            alt={staff.name}
                                        />
                                    </div>
                                    <div className="py-5 text-center bg-white">
                                        <h4 className="font-bold text-gray-900 text-[17px]">{staff.name}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default OurStaff;