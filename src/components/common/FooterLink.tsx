import Link from "next/link";
import type { ReactNode } from "react";

type FooterLinkProps = {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
};

export default function FooterLink({
  href,
  external,
  className = "hover:text-white transition-colors",
  children,
}: FooterLinkProps) {
  const isExternal =
    external ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternal) {
    const isContactLink =
      href.startsWith("mailto:") || href.startsWith("tel:");

    return (
      <a
        href={href}
        className={`${className}${isContactLink ? " cursor-pointer" : ""}`}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
