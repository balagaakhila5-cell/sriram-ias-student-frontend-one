'use client';

import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const NUM_NODES = 60;
const NODE_RADIUS = 4;
const DEFAULT_SPEED = 0.4;
const MAX_DIST = 220;

const VARIANTS = {
  light: {
    dot: 'rgba(0, 100, 180, 0.12)',
    lineRgb: '0, 100, 180',
    lineAlpha: 0.08,
  },
  dark: {
    dot: 'rgba(255, 255, 255, 0.16)',
    lineRgb: '255, 255, 255',
    lineAlpha: 0.1,
  },
} as const;

type Variant = keyof typeof VARIANTS;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Props {
  variant?: Variant;
  className?: string;
  speed?: number;
}

const NetworkDotsBackground: React.FC<Props> = ({
  variant = 'light',
  className = '',
  speed = DEFAULT_SPEED,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = VARIANTS[variant];
    let rafId: number;
    let nodes: Node[] = [];

    const init = (w: number, h: number) => {
      nodes = Array.from({ length: NUM_NODES }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
      }));
    };

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      init(w, h);
    };

    resize();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = colors.dot;
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * colors.lineAlpha;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${colors.lineRgb}, ${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [prefersReducedMotion, variant, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
    />
  );
};

export default NetworkDotsBackground;
