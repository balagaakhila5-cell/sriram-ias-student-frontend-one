'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type PlaneAnimationConfig = {
  x?: number;
  y?: number;
  opacity?: number;
};

type CrispGeometricPlaneProps = {
  className?: string;
  fromVals: PlaneAnimationConfig;
  toVals: PlaneAnimationConfig;
  duration: number;
  delay: number;
  isStatic?: boolean;
};

// Crisp sliding panel to create intersecting geometric lines
const CrispGeometricPlane = ({
  className,
  fromVals,
  toVals,
  duration,
  delay,
  isStatic = false,
}: CrispGeometricPlaneProps) => {
  const planeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!planeRef.current || isStatic) {
      return;
    }

    gsap.fromTo(planeRef.current, 
      fromVals,
      {
        ...toVals,
        duration: duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: delay,
        force3D: true,
      }
    );
  }, { dependencies: [delay, duration, fromVals, isStatic, toVals], scope: planeRef });

  return (
    <div
      ref={planeRef}
      className={cn(
        "absolute origin-center border-y transform-gpu will-change-transform will-change-opacity", 
        className
      )}
    />
  );
};

const AnimatedGeometricBackground: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#f8fafc]">
      
      {/* Static brand-color gradient layer instead of animated mix-blend */}
      <div className="absolute inset-0 opacity-[0.05] bg-gradient-to-br from-[#E16165] to-[#20A0E0]" />

      {/* Crisp intersecting geometric planes forming visible lines */}
      <CrispGeometricPlane 
        className="-top-[20%] -left-[20%] w-[200%] h-[600px] bg-gradient-to-b from-white/90 to-white/10 border-y-white/80 rotate-[35deg] shadow-[0_0_30px_rgba(32,160,224,0.08)]"
        fromVals={{ y: -40, opacity: 0.8 }}
        toVals={{ y: 40, opacity: 1 }}
        duration={14} delay={0}
        isStatic={prefersReducedMotion}
      />
      
      <CrispGeometricPlane 
        className="top-[30%] -right-[30%] w-[150%] h-[500px] bg-gradient-to-b from-[#20A0E0]/15 to-[#20A0E0]/5 border-y-[#20A0E0]/40 -rotate-[45deg] shadow-[0_0_24px_rgba(225,97,101,0.04)]"
        fromVals={{ x: -60, opacity: 0.6 }}
        toVals={{ x: 60, opacity: 1 }}
        duration={20} delay={2}
        isStatic={prefersReducedMotion}
      />

      <CrispGeometricPlane 
        className="-bottom-[10%] -left-[20%] w-[180%] h-[400px] bg-gradient-to-b from-white/70 to-white/10 border-y-white/60 border-opacity-100 rotate-[15deg] shadow-[0_0_34px_rgba(32,160,224,0.06)]"
        fromVals={{ y: 30, x: -30 }}
        toVals={{ y: -30, x: 30 }}
        duration={24} delay={1}
        isStatic={prefersReducedMotion}
      />
      
      <CrispGeometricPlane 
        className="top-[10%] left-[10%] w-[150%] h-[250px] bg-gradient-to-b from-[#E16165]/10 to-[#E16165]/5 border-y-[#E16165]/30 -rotate-[20deg]"
        fromVals={{ y: -50, opacity: 0.4 }}
        toVals={{ y: 50, opacity: 0.9 }}
        duration={16} delay={4}
        isStatic={prefersReducedMotion}
      />

      <CrispGeometricPlane 
        className="bottom-[20%] right-[10%] w-[120%] h-[300px] bg-gradient-to-b from-white/50 to-white/10 border-y-white/80 -rotate-[10deg]"
        fromVals={{ x: 40, opacity: 0.5 }}
        toVals={{ x: -40, opacity: 0.9 }}
        duration={18} delay={5}
        isStatic={prefersReducedMotion}
      />

      {/* Edge Fades */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent transform translate-y-1" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent transform -translate-y-1" />
    </div>
  );
};

export default AnimatedGeometricBackground;
