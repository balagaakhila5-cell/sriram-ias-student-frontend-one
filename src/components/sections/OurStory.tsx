'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Users, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import useInViewport from '@/hooks/useInViewport';

gsap.registerPlugin(ScrollTrigger);

const NumberCounter = ({ value }: { value: string }) => {
  const numMatch = value.match(/(\d+)/);
  const endNum = numMatch ? parseInt(numMatch[1], 10) : 0;
  const suffix = value.replace(/\d+/g, '').trim();

  const nodeRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(wrapperRef, { threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInViewport || hasAnimated.current || prefersReducedMotion) return;
    hasAnimated.current = true;
    const el = nodeRef.current;
    if (!el) return;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: endNum,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = String(Math.round(counter.val));
      },
    });
  }, [isInViewport, endNum, prefersReducedMotion]);

  return (
    <span ref={wrapperRef}>
      <span ref={nodeRef}>{prefersReducedMotion ? endNum : 0}</span>
      {suffix && ` ${suffix}`}
    </span>
  );
};

const OurStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current) {
      return;
    }

    // Header Animation
    gsap.fromTo('.our-story-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: '.our-story-header',
          start: 'top 85%',
          once: true,
        }
      }
    );

    gsap.fromTo('.our-story-visual',
      { x: -100, opacity: 0, scale: 0.95 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.2,
        force3D: true,
        scrollTrigger: {
          trigger: '.our-story-visual',
          start: 'top 80%',
          once: true,
        }
      }
    );

    gsap.fromTo('.our-story-stat',
      { x: 100, opacity: 0, scale: 0.9 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.4,
        force3D: true,
        scrollTrigger: {
          trigger: '.our-story-stats-container',
          start: 'top 85%',
          once: true,
        }
      }
    );

    gsap.fromTo('.our-story-quote',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.7,
        force3D: true,
        scrollTrigger: {
          trigger: '.our-story-quote',
          start: 'top 80%',
          once: true,
        }
      }
    );

  }, { dependencies: [prefersReducedMotion], scope: sectionRef });

  return (
  <section ref={sectionRef} className="relative pt-12 pb-24 px-4 md:px-16">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="space-y-16 relative">
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none z-0"
            style={{
              background: 'linear-gradient(181.87deg, rgba(201, 149, 61, 0.4) -157.44%, rgba(192, 138, 44, 0.384) -157.4%, rgba(190, 132, 32, 0.268) 216.94%, rgba(246, 166, 28, 0.32) 216.94%)',
              filter: 'blur(200px)'
            }}
          />

          <div className="our-story-header text-center">
            <h3 className="global-section-heading">
              OUR STORY
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
            {/* Visual Left */}
            <div className="our-story-visual relative group">
              <div className="aspect-square overflow-hidden shadow-2xl rounded-none relative">
                <Image
                  src="/assets/our_story.png"
                  alt="Sriram's IAS Building"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Card - Since 1985 */}
                <div className="absolute bottom-8 left-8 right-8 p-6 text-white border border-white/10 backdrop-blur-md bg-black/40 rounded-xl shadow-2xl transition-all duration-500 group-hover:bg-black/50 group-hover:-translate-y-2">
                  <h4 className="text-2xl font-bold mb-3">Since 1985</h4>
                  <p className="text-sm text-gray-200/80 font-medium">Serving the nation in civil services like IAS, IPS</p>
                </div>
              </div>
            </div>

            {/* Stats & Info Right */}
            <div className="space-y-8 relative">
              {/* Background Blur Effect on Right (Duplicate for safety) */}
              <div
                className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0"
                style={{
                  background: 'linear-gradient(181.87deg, rgba(201, 149, 61, 0.4) -157.44%, rgba(192, 138, 44, 0.384) -157.4%, rgba(190, 132, 32, 0.268) 216.94%, rgba(246, 166, 28, 0.32) 216.94%)',
                  filter: 'blur(200px)'
                }}
              />

              {/* Stats Grid */}
              <div className="our-story-stats-container grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {[
                  { icon: <Calendar size={20} />, value: '300 +', label: 'Selections in UPSC CSE 2026', color: 'text-pink-500', bgColor: 'bg-pink-50' },
                  { icon: <Users size={20} />, value: '3500 +', label: 'Selections in UPSC', color: 'text-blue-600', bgColor: 'bg-blue-50' },
                  { icon: <Trophy size={20} />, value: '40 +', label: 'Years of Excellence', color: 'text-green-600', bgColor: 'bg-green-50' },
                  { icon: <MapPin size={20} />, value: '3', label: 'Centers Over all India', color: 'text-green-700', bgColor: 'bg-green-50' },
                ].map((stat, i) => (
                  <div key={i} className="our-story-stat">
                    <div className="bg-white p-5 shadow-lg border border-gray-50 flex flex-col gap-3 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
                      <div className="flex items-center gap-3">
                        <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                          {stat.icon}
                        </div>
                        <h5 className={`text-xl font-bold ${stat.color}`}>
                          <NumberCounter value={stat.value} />
                        </h5>
                      </div>
                      <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider leading-tight">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote Box */}
              <div className="our-story-quote p-10 shadow-xl bg-white rounded-2xl relative z-10 border border-gray-100">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                  Founded in 1985 in New Delhi, Sriram&apos;s IAS Academy was born from a singular belief: that India&apos;s civil services demand not just knowledge, but character., that India&apos;s civil services demand not just knowledge, but character.
                </p>
                <div className="mt-8 pt-6 border-l-4 border-[#20A0E0] pl-6 transition-all duration-300 hover:border-l-8">
                  <p className="text-gray-700 font-medium italic text-sm md:text-base leading-relaxed">
                    &quot;The examination tests your understanding of India. We teach you to understand India.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
