"use client";

import { useRouter } from "@/lib/appRouter";
import { ChevronLeft } from "lucide-react";

interface GoBackButtonProps {
  /** Override the default behaviour of router.back(). */
  href?: string;
}

export default function GoBackButton({ href }: GoBackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) router.push(href);
    else router.back();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-5 text-white shadow-sm transition-opacity hover:opacity-90"
      style={{
        background:
          "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)",
      }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#009FEE]">
        <ChevronLeft size={18} />
      </span>
      <span
        className="text-[16px] font-bold uppercase tracking-wide"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Go Back
      </span>
    </button>
  );
}
