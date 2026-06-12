"use client";

import Image from "next/image";
import Link from "next/link";
import LoggedInUserBadge from "@/features/auth/components/LoggedInUserBadge";

type StudentTopBarProps = {
  homeHref?: string;
};

export default function StudentTopBar({ homeHref = "/" }: StudentTopBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-[0_8px_20px_#0000001A]">
      <div className="mx-auto flex h-[90px] max-w-[1500px] items-center justify-between gap-4 px-4 lg:px-10">
        <Link
          href={homeHref}
          className="inline-flex min-w-0 cursor-pointer items-center gap-2"
          aria-label="Go to home"
        >
          <Image
            src="/assets/40_years_experience.png"
            alt="40 Years of Excellence"
            width={66}
            height={66}
            className="h-[60px] w-auto object-contain"
            priority
          />

          <span className="h-[45px] w-[2px] rounded-full bg-[#E5E7EB]" />

          <Image
            src="/assets/student/sri-ram-student-logo.png"
            alt="SRIRAM's IAS"
            width={70}
            height={70}
            className="h-[60px] w-auto object-contain"
            priority
          />
        </Link>

        <LoggedInUserBadge />
      </div>
    </header>
  );
}
