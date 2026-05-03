'use client';

import React, { useState, useRef } from 'react';
import EnquiryFormModal from './EnquiryFormModal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import useScrollThreshold from '@/hooks/useScrollThreshold';

const FloatingActions: React.FC = () => {
  const isScrolled = useScrollThreshold(100);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

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

    // Playful elastic entrance for WhatsApp button
    gsap.fromTo('.floating-whatsapp', 
      { scale: 0, opacity: 0, rotation: -45 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        delay: 1.2,
        ease: 'elastic.out(1, 0.4)',
        force3D: true,
      }
    );
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-[100]">
      {/* Floating Elements (Enquire Now, WhatsApp) */}
      <div 
        className={`floating-enquire fixed right-0 top-1/2 -translate-y-1/2 z-60 transform-gpu transition-[transform] duration-500 ${
          isScrolled ? 'translate-x-[calc(100%-40px)]' : 'translate-x-[0px]'
        } hover:translate-x-0 group cursor-pointer flex items-center justify-end overflow-visible drop-shadow-2xl`}
        onClick={() => setIsEnquiryModalOpen(true)}
      >
         <div 
           className={`rounded-l-2xl font-black uppercase [writing-mode:vertical-lr] shadow-2xl transition-[padding] duration-500 flex items-center justify-center min-w-[50px] font-['Montserrat'] ${
             isScrolled ? 'py-3 px-2' : 'py-5 px-4'
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
      
      <div className="floating-whatsapp fixed right-6 bottom-6 z-60 cursor-pointer hover:-translate-y-2 transition-transform duration-300 group transform-gpu">
        <a 
          href="https://wa.me/919811489560" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative block"
        >
          {!prefersReducedMotion && (
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
          )}
          <div className="bg-[#25D366] p-4 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.4)] relative z-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
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
