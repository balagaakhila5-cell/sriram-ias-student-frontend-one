'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface DiamondConfig {
  size: number;
  top: string;
  left: string;
  opacity: number;
  parallax: number;
  color1: string;
  color2: string;
}

interface DiamondProps {
  config: DiamondConfig;
  isActive: boolean;
}

type AmbientMotion = {
  duration: number;
  floatX: number;
  floatY: number;
  rotation: number;
};

const createAmbientMotion = (config: DiamondConfig): AmbientMotion => {
  const topValue = Number.parseFloat(config.top) || 0;
  const leftValue = Number.parseFloat(config.left) || 0;
  const seed = config.size * 17 + topValue * 13 + leftValue * 7 + config.opacity * 100;
  const sample = (offset: number) => {
    const value = Math.sin(seed + offset) * 10000;
    return value - Math.floor(value);
  };

  return {
    duration: 6 + sample(1) * 6,
    floatX: 10 + sample(2) * 15,
    floatY: 15 + sample(3) * 20,
    rotation: 45 + (sample(4) * 15 - 7.5),
  };
};

const Diamond: React.FC<DiamondProps> = ({ config, isActive }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const ambientMotionRef = useRef<AmbientMotion>(createAmbientMotion(config));

  useEffect(() => {
    if (outerRef.current) {
      gsap.set(outerRef.current, { xPercent: -50, yPercent: -50 });
    }
  }, []);

  useEffect(() => {
    const el = motionRef.current;
    const ambientMotion = ambientMotionRef.current;
    if (!el || !ambientMotion) {
      return;
    }

    tweenRef.current = gsap.to(el, {
      x: ambientMotion.floatX,
      y: ambientMotion.floatY,
      rotation: ambientMotion.rotation,
      duration: ambientMotion.duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true,
    });
    
    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []);

  useEffect(() => {
    const tween = tweenRef.current;
    if (!tween) {
      return;
    }

    if (isActive) {
      tween.resume();
      return;
    }

    tween.pause();
  }, [isActive]);

  return (
    <div
      ref={outerRef}
      className="diamond-parallax"
      data-parallax={config.parallax}
      style={{
        position: "absolute",
        top: config.top,
        left: config.left,
        width: config.size,
        height: config.size,
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
      }}
    >
      <div
        ref={motionRef}
        style={{
          width: "100%",
          height: "100%",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: "translateZ(0) rotate(45deg)",
            background: `linear-gradient(135deg, ${config.color1}, ${config.color2})`,
            opacity: config.opacity,
            borderRadius: "10%",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(Diamond);
