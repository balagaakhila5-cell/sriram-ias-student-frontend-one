'use client';

export default function CentersDropdownBackground() {
  return (
    <>
      <div className="centers-bg-motion pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-white/10" aria-hidden />

      <style jsx global>{`
        .centers-bg-motion {
          background-image: url('/assets/about/background-animation-about.png');
          background-size: 125% 125%;
          background-repeat: no-repeat;
          background-position: left bottom;
          opacity: 0.9;
          animation: centersWaveMove 3s ease-in-out infinite alternate;
          will-change: transform, background-position;
        }

        @keyframes centersWaveMove {
          0% {
            background-position: left bottom;
            transform: translateX(-18px) translateY(10px) scale(1.08);
          }

          50% {
            background-position: center bottom;
            transform: translateX(18px) translateY(-8px) scale(1.14);
          }

          100% {
            background-position: right bottom;
            transform: translateX(-10px) translateY(8px) scale(1.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .centers-bg-motion {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
