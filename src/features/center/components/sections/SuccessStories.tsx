'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const SuccessStories = ({ city }: { city: string }) => {
    const containerRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(() => {
        if (prefersReducedMotion) return;

        gsap.fromTo('.success-stories-heading', 
            { y: 40, opacity: 0 },
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

        gsap.fromTo('.success-stories-card', 
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: '.success-stories-card',
                    start: 'top 85%',
                    once: true,
                }
            }
        );
    }, { dependencies: [prefersReducedMotion], scope: containerRef });

    // Updated mock data with actual portrait images of people
    const stories = [
        { id: 1, name: "K.Priyanka", rank: "AIR 08", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=500&auto=format&fit=crop" },
        { id: 2, name: "K.Priyanka", rank: "AIR 08", image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=400&h=500&auto=format&fit=crop" },
        { id: 3, name: "K.Priyanka", rank: "AIR 08", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=500&auto=format&fit=crop" },
        { id: 4, name: "K.Priyanka", rank: "AIR 08", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=500&auto=format&fit=crop" },
        { id: 5, name: "K.Priyanka", rank: "AIR 08", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=500&auto=format&fit=crop" },
    ];

    // State to track which card is currently featured in the center
    const [activeIndex, setActiveIndex] = useState(2);

    return (
        <section ref={containerRef} className="relative w-full py-24 overflow-hidden bg-gradient-to-br from-[#EAE8F4] via-[#FFFFFF] to-[#E3F2F9] font-sans">
            {/* Top Right Half Circle with Glow Border */}
            <div className="absolute top-[-140px] right-[8%] w-[260px] h-[260px] rounded-b-full bg-white z-0 pointer-events-none"
                style={{
                    boxShadow: '0px 0px 120px 20px rgba(91, 178, 229, 0.7)'
                }}
            ></div>

            {/* Right Side Mid Half Circle */}
            <div className="absolute top-1/2 right-[-160px] -translate-y-1/2 w-[260px] h-[260px] bg-white rounded-l-full z-0 pointer-events-none"
                style={{
                    boxShadow: '0px 0px 120px 20px rgba(91, 178, 229, 0.7)'
                }}
            ></div>

            {/* Top Left Gradient Glow */}
            <div
                className="absolute top-[80px] left-[-200px] w-[450px] h-[190px] opacity-100 z-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(181.87deg, #ACAFFF -157.44%, rgba(181,189,254,0.96) -157.4%, rgba(171,169,213,0.67) 216.94%, rgba(150,143,199,0.8) 216.94%)',
                    filter: 'blur(70px)',
                    transform: 'rotate(30deg)'
                }}
            ></div>

            {/* Bottom Left Gradient Glow */}
            <div
                className="absolute bottom-[80px] left-[-200px] w-[450px] h-[190px] opacity-100 z-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(181.87deg, #ACAFFF -157.44%, rgba(181,189,254,0.96) -157.4%, rgba(171,169,213,0.67) 216.94%, rgba(150,143,199,0.8) 216.94%)',
                    filter: 'blur(70px)',
                    transform: 'rotate(150deg)'
                }}
            ></div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">

                {/* Header Section */}
                <div className="success-stories-heading w-full text-left md:text-left mb-20">
                    <h2 className="text-[28px] md:text-[40px] font-bold mb-4 tracking-tight">
                        <span className="text-[#C0778B]">50 + Success Stories </span>
                        <span className="text-[#968EB3]">From </span>
                        <span className="text-[#519DC8]">{city}</span>
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl font-medium">Watch what our students have to say</p>
                </div>

                {/* Carousel / Cards Section - Added native scrollbar hiding classes */}
                <div className="flex flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 w-full max-w-full overflow-x-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {stories.map((story, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={story.id}
                                className="success-stories-card flex flex-col items-center cursor-pointer transition-all duration-500 ease-in-out shrink-0"
                                onClick={() => setActiveIndex(index)}
                            >
                                {/* Image Card */}
                                <div
                                    className={`relative overflow-hidden rounded-2xl shadow-md transition-all duration-500 ease-out ${isActive
                                        ? 'w-[260px] h-[340px] md:w-[300px] md:h-[400px] z-20 scale-100 shadow-xl'
                                        : 'w-[180px] h-[240px] md:w-[220px] md:h-[290px] z-10 scale-95 opacity-85 hover:opacity-100'
                                        }`}
                                >
                                     <Image
                                         unoptimized
                                         src={story.image}
                                         fill
                                         sizes="(max-width: 768px) 100vw, 300px"
                                         className="object-cover"
                                         alt={`${story.name} - ${story.rank}`}
                                     />

                                    {/* Play Button Overlay (Only visible on active card) */}
                                    {isActive && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 transition-opacity duration-300">
                                            <div className="w-16 h-12 bg-black/50 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-all hover:scale-105">
                                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M4 4l12 6-12 6V4z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Name & Rank Below Card */}
                                <div className={`text-center mt-6 transition-all duration-500 ${isActive ? 'translate-y-2' : ''}`}>
                                    <h3 className="font-bold text-[18px] md:text-[20px]">
                                        <span className="text-[#3EA2D6]">K.Priy</span>
                                        <span className="text-gray-800">anka</span>
                                    </h3>
                                    <p className="text-gray-600 font-bold text-[15px] md:text-[16px] mt-1">{story.rank}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export default SuccessStories;