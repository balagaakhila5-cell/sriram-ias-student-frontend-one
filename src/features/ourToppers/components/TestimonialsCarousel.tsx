'use client';

import { TESTIMONIALS } from '@/features/ourToppers/data/testimonials';
import TestimonialQuoteCard from '@/features/ourToppers/components/TestimonialQuoteCard';

export default function TestimonialsCarousel() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="w-full overflow-hidden py-2">
      <div className="testimonials-track flex w-max gap-4 sm:gap-5">
        {items.map((testimonial, index) => (
          <TestimonialQuoteCard
            key={`${testimonial.url}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>

      <style jsx>{`
        .testimonials-track {
          animation: testimonialsScroll 45s linear infinite;
          will-change: transform;
        }

        .testimonials-track:hover {
          animation-play-state: paused;
        }

        @keyframes testimonialsScroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
