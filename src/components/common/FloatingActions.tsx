'use client';

import React, { useEffect, useRef, useState } from 'react';
import EnquiryFormModal from './EnquiryFormModal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import useScrollThreshold from '@/hooks/useScrollThreshold';

const FloatingActions: React.FC = () => {
  const isScrolled = useScrollThreshold(100);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isWhatsAppExpanded, setIsWhatsAppExpanded] = useState(false);
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const whatsappCycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isScrolledSafe = isMounted ? isScrolled : false;
  const showWhatsAppText =
    isWhatsAppExpanded || isWhatsAppHovered || prefersReducedMotion;

  useEffect(() => {
    if (!isMounted || prefersReducedMotion || isWhatsAppHovered) {
      return;
    }

    const runExpandCycle = () => {
      if (window.innerWidth < 400) {
        return;
      }

      setIsWhatsAppExpanded(true);
      whatsappCycleRef.current = setTimeout(() => {
        setIsWhatsAppExpanded(false);
      }, 4500);
    };

    const startId = setTimeout(runExpandCycle, 2800);
    const intervalId = setInterval(runExpandCycle, 8500);

    return () => {
      clearTimeout(startId);
      clearInterval(intervalId);
      if (whatsappCycleRef.current) {
        clearTimeout(whatsappCycleRef.current);
      }
    };
  }, [isMounted, prefersReducedMotion, isWhatsAppHovered]);

  useGSAP(() => {
    if (prefersReducedMotion) {
      return;
    }

    // Elegant entrance for Enquire button
    gsap.fromTo('.floating-enquire', 
      { x: 150, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.8,
        ease: 'power4.out',
        force3D: true,
      }
    );

    // Simple fade-in for WhatsApp (icon stays fixed, no bounce)
    gsap.fromTo('.floating-whatsapp', 
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 1.2,
        ease: 'power2.out',
      }
    );
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-[100]">
      {/* Floating Elements (Enquire Now, WhatsApp) */}
      <div 
        className={`floating-enquire fixed right-0 top-[calc(50%-2.5rem)] z-60 flex -translate-y-1/2 transform-gpu cursor-pointer items-center justify-end overflow-visible drop-shadow-2xl transition-[transform] duration-500 ${
          isScrolledSafe ? 'translate-x-[calc(100%-40px)]' : 'translate-x-[0px]'
        } hover:translate-x-0 group`}
        onClick={() => setIsEnquiryModalOpen(true)}
      >
         <div 
           className={`rounded-l-2xl font-black uppercase [writing-mode:vertical-lr] shadow-2xl transition-[padding] duration-500 flex items-center justify-center min-w-[50px] font-['Montserrat'] ${
             isScrolledSafe ? 'py-3 px-2' : 'py-5 px-4'
           } group-hover:py-5 group-hover:px-4 group-hover:min-w-[50px] text-white backdrop-blur-md`}
           style={{
             background: 'linear-gradient(90deg, rgba(24, 151, 216, 0.9) 0%, rgba(2, 28, 41, 0.95) 100%)'
           }}
         >
           <span className={`transition-all duration-500 select-none text-[13px] leading-[16px] tracking-[0.12em] opacity-100`}>
             ENQUIRE NOW
           </span>
         </div>
      </div>
      
      <div className="floating-whatsapp fixed bottom-10 right-4 z-60 sm:bottom-12 sm:right-6">
        <a
          href="https://wa.me/919811489560"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          onMouseEnter={() => {
            setIsWhatsAppHovered(true);
            setIsWhatsAppExpanded(true);
          }}
          onMouseLeave={() => {
            setIsWhatsAppHovered(false);
            if (!prefersReducedMotion) {
              setIsWhatsAppExpanded(false);
            }
          }}
          onFocus={() => {
            setIsWhatsAppHovered(true);
            setIsWhatsAppExpanded(true);
          }}
          onBlur={() => {
            setIsWhatsAppHovered(false);
            if (!prefersReducedMotion) {
              setIsWhatsAppExpanded(false);
            }
          }}
          className={`flex h-14 max-[399px]:h-12 max-[399px]:w-12 transform-gpu flex-row-reverse items-center overflow-hidden rounded-full transition-[max-width,opacity,box-shadow,border-color,background-color] duration-500 ease-in-out ${
            showWhatsAppText
              ? 'max-w-[300px] gap-2 border border-[#C8EBD2] bg-[#EAF7EE] py-0 pl-3 pr-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.12)] max-[399px]:max-w-12 max-[399px]:gap-0 max-[399px]:border-0 max-[399px]:bg-transparent max-[399px]:p-0 max-[399px]:shadow-none sm:gap-2.5 sm:pl-4 sm:pr-2'
              : 'max-w-14 border border-transparent bg-transparent py-0 pr-0 pl-0 shadow-none max-[399px]:max-w-12'
          }`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_14px_rgba(37,211,102,0.35)] sm:h-12 sm:w-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>

          <span
            className={`hidden min-w-0 overflow-hidden transition-[max-width,opacity] duration-500 ease-in-out min-[400px]:inline-block ${
              showWhatsAppText
                ? 'max-w-[220px] opacity-100'
                : 'max-w-0 opacity-0'
            }`}
            aria-hidden={!showWhatsAppText}
          >
            <span className="block whitespace-nowrap pr-1 font-['Montserrat'] text-[13px] font-bold leading-tight text-[#1F2937] sm:text-[14px]">
              Got any Queries?
            </span>
            <span className="mt-0.5 block whitespace-nowrap pr-1 font-['Montserrat'] text-[10px] font-medium leading-snug text-[#6B7280] sm:text-[11px]">
              Quickly chat with our Experts on WhatsApp!
            </span>
          </span>
        </a>
      </div>

      <EnquiryFormModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
      />
    </div>
  );
};

export default FloatingActions;
