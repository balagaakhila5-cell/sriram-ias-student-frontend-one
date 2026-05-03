

import Image from "next/image";
import Link from "next/link";

interface HoverCardProps {
  title: string;
  image: string;
  href: string;
  className?: string;
}

export default function HoverCard({
  title,
  image,
  href,
  className = "",
}: HoverCardProps) {
  const renderTitle = () => {
    if (title === "Previous Year Question Papers") {
      return (
        <>
          Previous Year <br /> Question Papers
        </>
      );
    }
    if (title === "Free Mock Tests") {
      return <span className="whitespace-nowrap">Free Mock Tests</span>;
    }
    return title;
  };

  return (
    <Link
      href={href}
      className={`animate-card group relative block overflow-hidden rounded-[16px] transition-shadow duration-500 ease-out hover:shadow-[0px_14px_32px_rgba(0,0,0,0.18)] ${className}`}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1280px) 50vw, (min-width: 640px) 50vw, 100vw"
        quality={75}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55%,rgba(0,0,0,0.85)_100%)] transition-all duration-500 group-hover:bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_40%,rgba(0,0,0,0.9)_100%)]" />

      {/* Text */}
      <h3
        className="
    absolute bottom-10 left-10 max-w-[80%]
    text-left text-[32px] font-bold leading-[1.1] tracking-[0.1px] text-white
    transition-all duration-500 ease-out

    break-words

    origin-bottom-left

    /* Hover → move to center smoothly */
    group-hover:left-1/2
    group-hover:bottom-1/2
    group-hover:-translate-x-1/2
    group-hover:translate-y-1/2
    group-hover:text-center
    group-hover:max-w-[90%]
    group-hover:scale-[1.3]
  "
      >
        {renderTitle()}
      </h3>
    </Link>
  );
}


