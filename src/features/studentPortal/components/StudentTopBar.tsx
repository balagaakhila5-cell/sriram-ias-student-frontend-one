import Image from "next/image";
import Link from "next/link";

export default function StudentTopBar() {
  return (
    <header className="sticky top-0 z-40 w-full  bg-white shadow-[0_8px_20px_#0000001A]">
      <div className="mx-auto flex h-[90px] items-center justify-center gap-3 ">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/assets/40_years_experience.png"
            alt="40 Years of Excellence"
            width={66}
            height={66}
            className="h-[60px] w-auto object-contain"
            priority
          />
          
          <span className="h-[45px] w-[2px] rounded-full bg-[#E5E7EB]"></span>

          <Image
            src="/assets/student/sri-ram-student-logo.png"
            alt="SRIRAM's IAS"
            width={70}
            height={70}
            className="h-[60px] w-auto object-contain"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
