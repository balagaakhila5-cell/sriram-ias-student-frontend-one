// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

// import { useState } from "react";
// import Header from "@/components/common/Header";
// import Footer from "@/components/common/Footer";
// import FloatingActions from "@/components/common/FloatingActions";
// import TrendingArticles from "@/components/common/TrendingArticles";
// import QuickLinks from "@/components/common/QuickLinks";
// import CustomDropdown from "@/components/common/CustomDropdown";

// gsap.registerPlugin(ScrollTrigger);

// const recapCards = [
//   { id: 1, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
//   { id: 2, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
//   { id: 3, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
//   { id: 4, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
//   { id: 5, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
//   { id: 6, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
//   { id: 7, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
//   { id: 8, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
//   { id: 9, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
//   { id: 10, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
// ];



// export default function MonthlyRecapPage() {
//   const containerRef = useRef<HTMLElement>(null);
//   const prefersReducedMotion = usePrefersReducedMotion();
//   const [selectedYear, setSelectedYear] = useState<string>("2026");
//   const [selectedMonth, setSelectedMonth] = useState<string>("April");

//   useGSAP(
//     () => {
//       if (prefersReducedMotion) return;

//       gsap.fromTo(
//         ".animate-heading",
//         { y: 40, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.8,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".animate-heading",
//             start: "top 85%",
//           },
//         }
//       );

//       gsap.fromTo(
//         ".animate-filter",
//         { y: 25, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.7,
//           delay: 0.1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".animate-filter",
//             start: "top 85%",
//           },
//         }
//       );

//       gsap.fromTo(
//         ".animate-card",
//         { y: 35, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           stagger: 0.08,
//           duration: 0.75,
//           ease: "power3.out",
//           clearProps: "transform",
//           scrollTrigger: {
//             trigger: ".cards-grid",
//             start: "top 85%",
//           },
//         }
//       );

//       gsap.fromTo(
//         ".animate-sidebar",
//         { x: 45, opacity: 0 },
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.8,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".animate-sidebar",
//             start: "top 85%",
//           },
//         }
//       );
//     },
//     { scope: containerRef, dependencies: [prefersReducedMotion] }
//   );

//   return (
//     <>
//       <Header />

//       <main
//         ref={containerRef}
//         className="w-full overflow-hidden bg-[#F7F8FB] font-['Montserrat',sans-serif]"
//       >
//         {/* Banner */}
//         <section className="relative h-[230px] w-full overflow-hidden md:h-[280px] lg:h-[320px]">
//           <Image
//             src="/assets/current-affairs/monthly-recap/monthly-recap-banner.png"
//             alt="Monthly Recap Banner"
//             fill
//             priority
//             className="object-cover object-center brightness-110"
//           />
//           <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.08)_40%,rgba(0,0,0,0)_100%)]" />
//         </section>

//         {/* Content */}
//         <section className="relative bg-[url('/assets/free-resources/free-resource-bg-1.png')] bg-cover bg-center bg-no-repeat px-4 py-14 md:px-8 lg:px-10 xl:px-14">
//           <div className="mx-auto max-w-[1400px]">
//             <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
//               {/* Left */}
//               <div>
//                 <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold uppercase leading-none md:text-[48px] lg:text-[56px]">
//                   <span className="bg-gradient-to-r from-[#D97D8D] via-[#8B7AC9] to-[#2C9FE8] bg-clip-text text-transparent">
//                     Monthly Recap
//                   </span>
//                 </h1>

//                 <div className="animate-filter mb-10 flex flex-col items-center justify-center gap-5 md:flex-row">
//                   <CustomDropdown
//                     options={["2026", "2025", "2024", "2023"]}
//                     value={selectedYear}
//                     onChange={setSelectedYear}
//                     placeholder="Year"
//                   />
//                   <CustomDropdown
//                     options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
//                     value={selectedMonth}
//                     onChange={setSelectedMonth}
//                     placeholder="Month"
//                   />
//                 </div>

//                 {/* 10 cards */}
//                 <div className="cards-grid grid grid-cols-1 gap-5 md:grid-cols-2">
//                   {recapCards.map((card) => (
//                     <div
//                       key={card.id}
//                       className="animate-card group flex min-h-[122px] items-center gap-5 rounded-[14px] bg-[#F5F2EE] px-6 py-4 shadow-[0px_6px_18px_rgba(0,0,0,0.08)] origin-bottom-left transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#FEF2E5] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
//                     >
//                       <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[16px] bg-[#FF1E00]">
//                         <Image
//                           src="/assets/current-affairs/monthly-recap/adobe.png"
//                           alt="PDF Icon"
//                           fill
//                           className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
//                         />
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <h3 className="mb-4 max-w-[260px] text-[16px] font-semibold leading-[1.45] text-[#111]">
//                           {card.title}
//                         </h3>

//                         <div className="flex flex-wrap gap-3">
//                           <Link
//                             href={card.readLink}
//                             className="rounded-[8px] border border-[#57B0F2] px-4 py-2 text-[14px] font-semibold text-[#46A7ED] transition-colors hover:bg-[#F2FAFF]"
//                           >
//                             Read
//                           </Link>

//                           <Link
//                             href={card.downloadLink}
//                             className="rounded-[8px] border border-[#57B0F2] px-4 py-2 text-[14px] font-semibold text-[#46A7ED] transition-colors hover:bg-[#F2FAFF]"
//                           >
//                             Download PDF
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Sidebar */}
//               <aside className="animate-sidebar w-full xl:mt-[95px]">
//                 <div className="space-y-8">
//                   <TrendingArticles />
//                   <QuickLinks />
//                 </div>
//               </aside>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//       <FloatingActions />
//     </>
//   );
// }





"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingActions from "@/components/common/FloatingActions";
import TrendingArticles from "@/components/common/TrendingArticles";
import QuickLinks from "@/components/common/QuickLinks";
import CustomDropdown from "@/components/common/CustomDropdown";

gsap.registerPlugin(ScrollTrigger);

const recapCards = [
  { id: 1, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
  { id: 2, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
  { id: 3, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
  { id: 4, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
  { id: 5, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
  { id: 6, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
  { id: 7, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
  { id: 8, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
  { id: 9, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
  { id: 10, title: "April Month - Recap", readLink: "#", downloadLink: "#" },
];



export default function MonthlyRecapPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("April");

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".animate-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".animate-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".animate-filter",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".animate-filter",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".animate-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".cards-grid",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".animate-sidebar",
        { x: 45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".animate-sidebar",
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="w-full overflow-hidden bg-[#F7F8FB] font-['Montserrat',sans-serif]"
      >
        {/* Banner */}
        <section className="relative h-[230px] w-full overflow-hidden md:h-[280px] lg:h-[320px]">
          <Image
            src="/assets/current-affairs/monthly-recap/monthly-recap-banner.png"
            alt="Monthly Recap Banner"
            fill
            priority
            className="object-cover object-center brightness-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.08)_40%,rgba(0,0,0,0)_100%)]" />
        </section>

        {/* Content */}
        <section className="relative bg-[url('/assets/free-resources/free-resource-bg-1.png')] bg-cover bg-center bg-no-repeat px-4 py-14 md:px-8 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
              {/* Left */}
              <div>
                <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold uppercase leading-none md:text-[48px] lg:text-[56px]">
                  <span className="bg-gradient-to-r from-[#D97D8D] via-[#8B7AC9] to-[#2C9FE8] bg-clip-text text-transparent">
                    Monthly Recap
                  </span>
                </h1>

                <div className="animate-filter mb-10 flex flex-col items-center justify-center gap-5 md:flex-row">
                  <CustomDropdown
                    options={["2026", "2025", "2024", "2023"]}
                    value={selectedYear}
                    onChange={setSelectedYear}
                    placeholder="Year"
                  />
                  <CustomDropdown
                    options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    placeholder="Month"
                  />
                </div>

                {/* 10 cards */}
                <div className="cards-grid grid grid-cols-1 gap-5 md:grid-cols-2">
                  {recapCards.map((card) => (
                    <div
                      key={card.id}
                      className="animate-card group flex min-h-[122px] items-center gap-5 rounded-[14px] bg-[#F5F2EE] px-6 py-4 shadow-[0px_6px_18px_rgba(0,0,0,0.08)] origin-bottom-left transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#FEF2E5] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                    >
                      {/* Removed bg-[#FF1E00] to match the white background of the new icon */}
                      <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[16px]">
                        <Image
                          src="/assets/image_89.svg" // Replaced adobe.png with image_89.svg
                          alt="PDF Icon"
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="mb-4 max-w-[260px] text-[16px] font-semibold leading-[1.45] text-[#111]">
                          {card.title}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                          <Link
                            href={card.readLink}
                            className="rounded-[8px] border border-[#57B0F2] px-4 py-2 text-[14px] font-semibold text-[#46A7ED] transition-colors hover:bg-[#F2FAFF]"
                          >
                            Read
                          </Link>

                          <Link
                            href={card.downloadLink}
                            className="rounded-[8px] border border-[#57B0F2] px-4 py-2 text-[14px] font-semibold text-[#46A7ED] transition-colors hover:bg-[#F2FAFF]"
                          >
                            Download PDF
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <aside className="animate-sidebar w-full xl:mt-[95px]">
                <div className="space-y-8">
                  <TrendingArticles />
                  <QuickLinks />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}