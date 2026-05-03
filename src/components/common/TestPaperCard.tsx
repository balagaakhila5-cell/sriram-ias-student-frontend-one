'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type TestPaperCardProps = {
  title: string;
  href: string;
  buttonText?: string;
  iconSrc?: string;
};

const TestPaperCard: React.FC<TestPaperCardProps> = ({
  title,
  href,
  buttonText = 'Attempt Test',
  iconSrc = '/assets/40_years_experience.png',
}) => {
  return (
    <Link
      href={href}
      className="group flex min-h-[126px] items-center gap-4 rounded-[18px] border border-[#E9E9E9] bg-[#F7F2E9] px-5 py-5 shadow-[0px_8px_22px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#F2E7D6]"
    >
      <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#EEF4FF]">
        <Image
          src={iconSrc}
          alt="40 Years Experience"
          width={62}
          height={62}
          className="h-auto w-auto object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="line-clamp-2 text-[18px] font-semibold leading-[1.4] text-[#111111] md:text-[19px]">
          {title}
        </h3>

        <div className="mt-4">
          <span className="inline-flex h-[40px] items-center rounded-[10px] border border-[#47B1F0] bg-white px-4 text-[16px] font-semibold text-[#3AA8EC] transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#50C0FF] group-hover:to-[#0A587E] group-hover:text-white">
            {buttonText}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TestPaperCard;