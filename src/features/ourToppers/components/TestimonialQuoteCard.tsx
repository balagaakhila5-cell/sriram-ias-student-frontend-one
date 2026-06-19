import type { Testimonial } from '@/features/ourToppers/data/testimonials';

export default function TestimonialQuoteCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <a
      href={testimonial.url}
      target="_blank"
      rel="noopener noreferrer"
      className="testimonial-quote-card group flex h-[380px] w-full min-w-0 flex-col border border-black bg-[#f4efe6] p-4 shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#3d3d3d] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] sm:h-[400px] md:h-[420px]"
    >
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="relative flex w-full max-w-[90%] items-center justify-center border border-black px-4 py-6 transition-colors duration-300 group-hover:border-[#4a4a4a] sm:px-5 sm:py-7">
          <span
            className="pointer-events-none absolute -left-1.5 -top-2.5 select-none font-serif text-[40px] leading-none text-[#c41e3a] sm:-left-2 sm:-top-3 sm:text-[46px]"
            aria-hidden
          >
            &ldquo;
          </span>
          <span
            className="pointer-events-none absolute -bottom-5 -right-1.5 select-none font-serif text-[40px] leading-none text-[#c41e3a] sm:-bottom-6 sm:-right-2 sm:text-[46px]"
            aria-hidden
          >
            &rdquo;
          </span>

          <p className="testimonial-quote-text max-w-[240px] text-left text-[15px] font-medium leading-[1.65] text-[#1a1a1a] sm:max-w-[260px] sm:text-[16px] sm:leading-[1.7] md:max-w-[280px] md:text-[17px]">
            {testimonial.excerpt}
          </p>
        </div>
      </div>

      <div className="mt-3 shrink-0 text-center">
        <p className="line-clamp-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#4a6272] sm:text-[11px]">
          {testimonial.title}
        </p>
        <span className="mt-1.5 inline-flex items-center justify-center gap-1 text-[10px] font-bold text-[#178fd2] transition-colors group-hover:underline sm:text-[11px]">
          Read full testimonial
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </span>
      </div>
    </a>
  );
}
