'use client';

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Diamond from "./Diamond";
import type { DiamondConfig } from "./Diamond";
import useInViewport from "@/hooks/useInViewport";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface DiamondLayerProps {
  config: DiamondConfig[];
}

const DiamondLayer: React.FC<DiamondLayerProps> = ({ config }) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(layerRef, {
    rootMargin: "250px 0px",
    threshold: 0,
  });

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || prefersReducedMotion) {
      return;
    }

    const travelDistance = Math.max(80, Math.min(layer.offsetHeight * 0.12, 180));
    
    // Direct GSAP animations instead of animating CSS variables 
    // to prevent heavy style recalculations on every scroll event
    const ctx = gsap.context(() => {
      const diamonds = gsap.utils.toArray<HTMLElement>('.diamond-parallax');
      diamonds.forEach((diamond) => {
        const parallax = parseFloat(diamond.getAttribute('data-parallax') || "0");
        
        gsap.fromTo(diamond,
          { y: -travelDistance * parallax },
          {
            y: travelDistance * parallax,
            ease: "none",
            force3D: true,
            willChange: "transform",
            scrollTrigger: {
              trigger: layer.parentElement ?? layer,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, layerRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const shouldAnimate = isInViewport && !prefersReducedMotion;

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {config.map((item, i) => (
        <Diamond
          key={`${item.top}-${item.left}-${item.size}-${i}`}
          config={item}
          isActive={shouldAnimate}
        />
      ))}
    </div>
  );
};

export default DiamondLayer;
