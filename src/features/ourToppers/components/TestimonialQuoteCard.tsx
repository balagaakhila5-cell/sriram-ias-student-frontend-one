import type { Testimonial } from '@/features/ourToppers/data/testimonials';

export default function TestimonialQuoteCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article className="testimonial-quote-card group flex h-[320px] w-[260px] shrink-0 flex-col border border-black bg-[#f4efe6] p-3.5 shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#3d3d3d] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] sm:h-[340px] sm:w-[280px] sm:p-4 md:h-[355px] md:w-[300px]">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="relative flex w-full max-w-[90%] items-center justify-center border border-black px-3.5 py-5 transition-colors duration-300 group-hover:border-[#4a4a4a] sm:px-4 sm:py-6">
          <span
            className="pointer-events-none absolute -left-1.5 -top-2.5 select-none font-serif text-[34px] leading-none text-[#c41e3a] sm:-left-2 sm:-top-3 sm:text-[40px]"
            aria-hidden
          >
            &ldquo;
          </span>
          <span
            className="pointer-events-none absolute -bottom-5 -right-1.5 select-none font-serif text-[34px] leading-none text-[#c41e3a] sm:-bottom-6 sm:-right-2 sm:text-[40px]"
            aria-hidden
          >
            &rdquo;
          </span>

          <p
            className="max-w-[210px] text-left text-[14px] font-medium leading-[1.6] text-[#1a1a1a] sm:max-w-[230px] sm:text-[15px] sm:leading-[1.65] md:max-w-[240px] md:text-[16px]"
            style={{ fontFamily: "'Caveat', 'Segoe Script', 'Bradley Hand', cursive" }}
          >
            {testimonial.excerpt}
          </p>
        </div>
      </div>

      <div className="mt-2 shrink-0 text-center">
        <p className="line-clamp-2 text-[9px] font-bold uppercase tracking-[0.5px] text-[#4a6272] sm:text-[10px]">
          {testimonial.title}
        </p>
      </div>
    </article>
  );
}
