import type { ReactNode } from "react";

interface ContactCardProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  actionIcon: ReactNode;
  illustration: ReactNode;
  bg: string;
  titleColor: string;
}

export default function ContactCard({
  title,
  description,
  actionLabel,
  actionHref,
  actionIcon,
  illustration,
  bg,
  titleColor,
}: ContactCardProps) {
  return (
    <article
      className="relative flex h-[260px] w-[520px] flex-col justify-between overflow-hidden rounded-[20px] p-6"
      style={{ background: bg }}
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        {illustration}
      </div>

      <div className="flex h-full flex-col justify-around">
        <div className="relative z-10 max-w-[75%]">
          <h3
            className="text-[24px]! font-bold leading-tight student-portal-heading"
            style={{ fontFamily: "Montserrat, sans-serif", color: titleColor }}
          >
            {title}
          </h3>
          <p className="mt-3 text-[16px] font-semibold leading-relaxed text-[#00000099]">
            {description}
          </p>
        </div>

        <a
          href={actionHref}
          className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-[17px] font-bold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)]"
          style={{
            background: "linear-gradient(90deg, #00679C 0%, #002436 100%)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {actionIcon}
          {actionLabel}
        </a>
      </div>


    </article>
  );
}
