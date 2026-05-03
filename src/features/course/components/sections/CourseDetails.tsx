'use client';

import React, { useRef } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  course: CourseData;
}

const CourseDetailsSection: React.FC<Props> = ({ course }) => {
  const displayHighlights = course.highlights;
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    // Top Heading animation
    gsap.fromTo('.course-details-top-heading',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.course-details-top-heading',
          start: 'top 85%',
          once: true,
        }
      }
    );

    // Heading animation
    gsap.fromTo('.course-details-heading',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.course-details-heading',
          start: 'top 85%',
          once: true,
        }
      }
    );

    // Highlights list animation
    gsap.fromTo('.highlight-item',
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.highlight-item',
          start: 'top 85%',
          once: true,
        }
      }
    );

    // Image/Visuals animation
    gsap.fromTo('.course-details-image',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.course-details-image',
          start: 'top 85%',
          once: true,
        }
      }
    );
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  // Theme selection based on city
  const city = course.city || 'delhi';

  let sectionBg = '';
  let textColor = '';
  let headingColor = '';
  let redSpanColor = '';
  let bulletColor = '';

  if (city === 'hyderabad') {
    // Exact matching light blue to soft yellow/sand gradient
    sectionBg = 'linear-gradient(90deg, #E6F3FB 0%, #FAF6EA 50%, #F5E8C9 100%)';
    textColor = 'text-[#4b5563]';
    headingColor = 'text-[#555e65]';
    redSpanColor = '#C76B74'; // Dusty rose color for "Course"
    bulletColor = 'bg-[#4b5563]';
  } else if (city === 'pune') {
    // Exact gradient provided for Pune
    sectionBg = 'linear-gradient(90deg, #8780D7 0%, #CECDE2 100%)';
    textColor = 'text-white';
    headingColor = 'text-[#00000099]'; // Dark grey text for "Key Highlights of"
    redSpanColor = 'white';
    bulletColor = 'bg-white';
  } else {
    // Delhi
    sectionBg = 'linear-gradient(137.58deg, rgba(24, 151, 216, 0.8) 0.26%, #021C29 70.14%)';
    textColor = 'text-white';
    headingColor = 'text-white';
    redSpanColor = '#E16165';
    bulletColor = 'bg-white shadow-[0_0_4px_white]';
  }



  if (city === 'hyderabad') {
    return (
      <div ref={containerRef} className="w-full flex flex-col font-['Montserrat',sans-serif] bg-white">
        <section
          className={`relative w-full overflow-hidden ${textColor} md:pt-15`}
        >
          {/* New Background Image for the whole section */}
          <img
            src="/assets/course/hyd-coourse-details-bg.png" /* Replace with your actual background image path */
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-x-130 scale-y-140"
          />

          <div className="max-w-[1400px] mx-auto relative z-10 px-6 md:px-12 lg:px-20">
            {/* Heading stays top-left */}
            <div className="course-details-heading mb-10 xl:mb-16">
              <h3 className={`text-3xl md:text-[42px] font-extrabold leading-tight ${headingColor}`}>
                Key Highlights of <span style={{ color: redSpanColor }}>Course</span>
              </h3>
            </div>

            {/* Layout: items-end aligns the person perfectly to the bottom border */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 lg:gap-12">

              {/* LEFT Side: Person Image */}
              {/* LEFT Side: Person Image */}
              <div className="course-details-image w-full md:w-[40%] lg:w-[40%] flex justify-center md:justify-start shrink-0 relative -ml-4 md:-ml-8 lg:-ml-38">
                <img
                  src="/assets/course/hyd-pune-course-details-person.png"
                  alt="Student pointing"
                  /* Increased max-width to make it larger */
                  className="w-full max-w-[380px] lg:max-w-[500px] h-auto object-contain object-bottom -mb-1 block"
                />
              </div>

              {/* RIGHT Side: Highlights only */}
              <div className="w-full md:w-[65%] lg:w-[70%] pb-12 md:pb-24 z-10">
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-36 list-none p-0 m-0">
                  {displayHighlights.map((highlight, index) => (
                    // Changed to items-center to align the bullet properly with single-line text
                    <li key={index} className="highlight-item flex items-center gap-4">
                      <span className={`w-[6px] h-[6px] rounded-full ${bulletColor} shrink-0`}></span>
                      {/* md:whitespace-nowrap forces the text to stay on one line */}
                      <span className="text-[15px] md:text-[19px] font-semibold tracking-wide md:whitespace-nowrap text-[#000000B2">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  else if (city === 'pune') {
    return (
      <div ref={containerRef} className="w-full flex flex-col font-['Montserrat',sans-serif] bg-white">
        <section
          className={`relative w-full overflow-hidden ${textColor} md:pt-15`}
          style={{ background: 'linear-gradient(90deg, #8780D7 0%, #CECDE2 100%)' }}
        >
          <div className="max-w-[1400px] mx-auto relative z-10 px-6 md:px-12 lg:px-20">
            {/* Heading */}
            <div className="course-details-heading mb-10 xl:mb-16">
              <h3 className={`text-3xl md:text-[42px] font-extrabold leading-tight ${headingColor}`}>
                Key Highlights of <span style={{ color: redSpanColor }}>Course</span>
              </h3>
            </div>

            {/* Layout: items-end aligns the person perfectly to the bottom border */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 lg:gap-12">

              {/* LEFT Side: Person Image & Shapes */}
              <div className="course-details-image w-full md:w-[40%] lg:w-[40%] flex justify-center md:justify-start shrink-0 relative -ml-4 md:-ml-8 lg:-ml-38">

                {/* SHAPE 1: Left White Arrow */}
                <svg
                  className="absolute -top-12 left-4 md:-top-12 md:left-18 lg:left-20 w-12 md:w-16 h-auto text-white z-0 pointer-events-none animate-float drop-shadow-md"
                  style={{ animationDelay: '1.5s' }}
                  viewBox="0 0 62 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.9061 59.007C14.0399 56.5574 15.8161 54.0248 18.0799 52.0519C20.5823 49.871 23.3433 47.7932 26.3353 46.418C29.8446 44.8052 33.2959 46.2527 35.1085 49.2559C37.0537 52.4786 36.4436 56.0161 33.3341 58.7212C29.3168 62.216 24.4634 63.7529 19.286 64.4306C18.0217 64.5962 16.7447 64.6638 15.5494 64.7697C11.2899 71.7057 12.2397 74.3952 23.8318 88.3259C21.9151 90.6212 19.9264 89.6858 18.011 88.428C11.5895 84.2112 7.381 74.0322 8.9194 66.5463C9.075 65.7887 9.2672 65.0385 9.4774 64.1346C8.5276 63.5829 7.68681 63.1466 6.89951 62.629C1.22211 58.8965 -1.37299 52.8372 0.719513 46.3735C1.92801 42.6402 3.93461 39.031 6.20651 35.8059C10.1248 30.2436 15.4029 25.941 21.1064 22.3069C27.9984 17.9155 35.1027 13.8574 42.1096 9.64581C43.1586 9.01531 44.1773 8.33442 45.5222 7.47812C42.8938 6.37782 40.6539 5.62922 38.6289 4.49652C37.8557 4.06402 36.9346 2.33782 37.2011 1.92572C37.7735 1.04062 39.0572 0.595235 40.089 0.0433345C40.3194 -0.0798655 40.7127 0.093918 41.0294 0.141418C46.0793 0.900418 51.1191 1.73633 56.1815 2.39883C60.6526 2.98393 61.463 3.84902 60.8888 8.27582C60.2297 13.3565 57.9174 17.726 54.8043 21.6912C53.798 22.9729 52.5564 24.1143 50.5335 22.5651C50.221 18.0027 54.1896 14.7185 55.0628 9.76282C53.4469 10.4832 52.3049 10.8753 51.2787 11.468C42.3972 16.5983 33.3616 21.4924 24.7395 27.0293C20.0679 30.0294 15.8439 33.8799 11.9321 37.853C9.52771 40.2953 7.6347 43.506 6.3284 46.705C4.1392 52.0657 6.16631 56.2195 11.9061 59.007ZM18.9614 58.096L19.6457 59.1661C22.8097 58.9717 25.7536 58.0054 28.4548 56.2896C30.9511 54.7039 31.8011 53.0737 30.7087 51.8348C29.1529 50.0704 27.4087 51.0416 26.0518 52.071C23.5847 53.9427 21.3141 56.0734 18.9614 58.096Z" fill="white" />
                </svg>

                {/* SHAPE 2: Right Looping Arrow (Using your provided SVG, colored beige) */}
                <svg
                  className="absolute -top-8 right-0 md:-top-9 md:-right-12 lg:-right-[-70px] w-16 md:w-20 h-auto  z-0 pointer-events-none animate-float drop-shadow-md"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M62.6359 1.38151C52.3069 -1.04187 41.3251 -0.29261 31.5486 3.75252C30.8732 4.03208 30.1989 4.32902 29.5286 4.64216C25.5378 2.30032 20.6168 1.284 15.9842 2.05828C6.55682 3.63372 -0.917921 12.1608 0.0914977 21.3721C0.328519 23.5353 0.987293 25.3616 2.35176 27.1135C3.33258 28.3731 6.60052 27.0503 6.05414 25.477C4.84045 21.981 4.60858 18.2413 5.7221 14.6997C6.75131 11.4263 8.85616 8.50548 11.7468 6.84481C11.8026 6.81285 11.8487 6.78621 11.8885 6.76305C11.9039 6.75818 11.9423 6.74173 12.0232 6.70305C12.2531 6.59257 12.4843 6.48533 12.7198 6.38597C13.1949 6.18539 13.1252 6.21367 13.4698 6.11107C14.4694 5.81321 15.0495 5.7062 16.154 5.63348C17.8647 5.52091 19.7369 5.80069 21.4288 6.3459C22.4145 6.66345 23.3733 7.07296 24.2867 7.56097C21.9167 9.13733 19.7679 10.9932 18.0626 13.1727C15.1399 16.9084 13.9782 22.1874 16.6578 26.3525C19.7889 31.2194 26.2812 31.3931 31.1296 28.7805C36.3744 25.9541 38.65 20.3676 37.4136 14.8579C36.7688 11.9843 35.2518 9.47269 33.189 7.43773C33.4534 7.33003 33.7188 7.22488 33.9853 7.12274C34.1381 7.06414 34.2917 7.00763 34.4452 6.95112C34.5312 6.9217 34.8327 6.81493 34.9197 6.78598C35.4192 6.62084 35.922 6.4645 36.4278 6.31789C37.5528 5.99177 38.6928 5.71153 39.8427 5.4769C40.0255 5.43961 40.2087 5.40418 40.3922 5.36921C40.4758 5.35531 40.6738 5.32078 40.7072 5.31569C41.2883 5.22721 41.8681 5.13781 42.4519 5.06578C43.5615 4.92867 44.6765 4.83277 45.7939 4.77672C49.641 4.58378 54.1683 4.98774 58.1112 5.97256C66.6129 8.09599 74.3919 12.7151 79.6281 19.4798C85.1199 26.5748 88.0235 35.3289 87.515 44.1318C87.2768 48.2578 86.1968 52.2633 84.3868 56.021C83.5746 57.7074 82.4995 59.4493 81.2548 61.1336C79.8651 63.0136 79.0299 63.9538 77.2997 65.5772C76.5498 66.2808 75.7663 66.9471 74.9644 67.5968C74.948 67.61 74.9204 67.6316 74.8887 67.6554C74.7137 67.7851 74.5397 67.9158 74.3633 68.0436C73.8528 68.4137 73.3324 68.7713 72.8026 69.1162C72.3696 69.3983 71.9303 69.6721 71.485 69.9364C71.2874 70.0538 71.0851 70.1649 70.8881 70.2835C70.8361 70.3148 70.7923 70.3412 70.754 70.3646C69.7819 70.8637 68.8004 71.339 67.7878 71.7608C67.3067 71.9611 66.8187 72.1416 66.3324 72.3299C66.3265 72.3322 66.3222 72.3338 66.3168 72.3361C66.2799 72.3472 66.2403 72.359 66.1939 72.3732C65.9718 72.4408 65.7519 72.5156 65.5297 72.5837C64.4145 72.9253 63.2832 73.1979 62.1396 73.4386C62.1134 73.4441 62.068 73.4522 62.0179 73.4608C61.8102 73.4939 61.603 73.5278 61.395 73.5581C60.8174 73.6422 60.2371 73.7117 59.6555 73.7668C59.1903 73.8108 58.724 73.8455 58.2573 73.871C57.9656 73.887 57.6736 73.899 57.3816 73.9078C57.2064 73.9139 57.0312 73.918 56.8557 73.9203C57.1208 73.9231 57.1313 73.9236 56.887 73.9213C48.3803 73.8733 40.1452 70.7306 33.8289 65.0755C32.8471 64.1965 31.9279 63.2631 31.081 62.2723C34.1583 62.7989 37.2496 63.2121 40.3619 63.3421C41.3367 63.3828 42.382 63.0111 43.0063 62.2806C43.4899 61.715 43.6414 60.952 42.8015 60.6016C39.7689 59.3363 36.6509 58.6415 33.4367 57.9207C30.1473 57.183 26.8549 56.4567 23.5686 55.7058C22.307 55.4174 21.1087 55.6155 19.9752 56.2429C19.2121 56.6654 17.7772 57.6819 17.9688 58.7068C18.6126 62.1544 19.3826 65.5753 20.1354 69.0027C20.8763 72.3757 21.2533 76.0848 22.8658 79.1928C23.444 80.3073 25.2255 80.0495 26.1898 79.703C27.3189 79.2975 28.7709 78.3995 28.8004 77.1055C28.8581 74.5784 28.2465 72.0445 27.6099 69.55C33.1516 74.5566 40.3502 77.7204 48.0527 78.8192C58.6988 80.3379 69.7644 77.3853 78.2688 71.1854C86.6762 65.0563 92.6787 56.33 94.4669 46.365C96.2391 36.4883 93.5061 25.936 87.5591 17.7035C81.6541 9.52874 72.7814 3.76203 62.6359 1.38151ZM30.2942 24.5475C29.8184 25.1826 29.2913 25.5921 28.7572 25.8693C28.5402 25.9819 28.2638 26.0898 28.0231 26.1456C27.6942 26.2218 27.3541 26.3221 26.787 26.3059C25.2937 26.2633 23.6851 25.2428 22.7991 23.9574C20.5237 20.6564 21.2822 16.5531 23.7599 13.5841C24.9741 12.1291 26.2948 11.1373 27.8706 10.1455C28.7163 10.9601 29.4597 11.8678 30.065 12.8596C32.1608 16.2942 32.8408 21.1476 30.2942 24.5475ZM62.0005 73.4634C61.5976 73.5273 61.8178 73.4942 62.0005 73.4634V73.4634ZM74.885 67.6577C74.4989 67.944 74.7345 67.7719 74.885 67.6577V67.6577Z" fill="currentColor" />
                </svg>

                <img
                  src="/assets/course/hyd-pune-course-details-person.png"
                  alt="Student pointing"
                  className="w-full max-w-[380px] lg:max-w-[500px] h-auto object-contain object-bottom -mb-1 block relative z-10"
                />
              </div>

              {/* RIGHT Side: Highlights only */}
              <div className="w-full md:w-[65%] lg:w-[70%] pb-12 md:pb-24 z-10">
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-36 list-none p-0 m-0">
                  {displayHighlights.map((highlight, index) => (
                    <li key={index} className="highlight-item flex items-center gap-4">
                      <span className={`w-[6px] h-[6px] rounded-full ${bulletColor} shrink-0`}></span>
                      {/* Changed text color to white to contrast against the purple gradient */}
                      <span className="text-[15px] md:text-[19px] font-semibold tracking-wide md:whitespace-nowrap text-white">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Delhi: Original layout (Highlights LEFT, Person RIGHT)
  return (
    <div ref={containerRef} className="w-full flex flex-col font-['Montserrat',sans-serif] bg-white">
      {/* {topHeadingNode} */}
      {/* Dynamic Styles for Animations */}
      <style>
        {`
          @keyframes drawPath {
            0% { stroke-dashoffset: 300; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          .animate-draw {
            stroke-dasharray: 300;
            animation: drawPath 2.5s ease-in-out infinite alternate;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* Blue Gradient Content Section */}
      <section
        className={`relative w-full overflow-hidden ${textColor} py-16 px-6 md:px-12 lg:px-24`}
        style={{ background: sectionBg }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">

          {/* Left Side: Text Content */}
          <div className="w-full lg:w-2/3 relative z-10">
            {/* Key Highlights Heading */}
            <div className="course-details-heading mb-10 lg:mb-16">
              <h3 className={`text-3xl md:text-[40px] font-extrabold leading-tight ${headingColor}`}>
                Key Highlights of <span style={{ color: redSpanColor }}>Course</span>
              </h3>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8 list-none p-0 m-0">
              {displayHighlights.map((highlight, index) => (
                <li key={index} className="highlight-item flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${bulletColor} shrink-0`}></span>
                  <span className="text-[15px] md:text-[19px] font-semibold tracking-wide">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Visuals & Shapes */}
          <div className="course-details-image w-full lg:w-1/3 flex justify-center lg:justify-end relative mt-16 lg:mt-0 min-h-[400px]">

            <>
              {/* 1. The Single Floating Cluster: Person inside Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[380px] md:h-[380px] z-10 animate-float flex items-center justify-center pointer-events-none drop-shadow-2xl">
                <svg viewBox="-20 -20 240 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <clipPath id="blobClip">
                      <path d="M 100 0 C 120 0 125 25 143.3 35 C 161.6 45 186.6 40 195 58.3 C 203.4 76.6 185 91.6 185 110 C 185 128.4 203.4 143.4 195 161.7 C 186.6 180 161.6 175 143.3 185 C 125 195 120 220 100 220 C 80 220 75 195 56.7 185 C 38.4 175 13.4 180 5 161.7 C -3.4 143.4 15 128.4 15 110 C 15 91.6 -3.4 76.6 5 58.3 C 13.4 40 38.4 45 56.7 35 C 75 25 80 0 100 0 Z" />
                    </clipPath>
                  </defs>

                  <path fill="#D4C3EC" d="M 100 0 C 120 0 125 25 143.3 35 C 161.6 45 186.6 40 195 58.3 C 203.4 76.6 185 91.6 185 110 C 185 128.4 203.4 143.4 195 161.7 C 186.6 180 161.6 175 143.3 185 C 125 195 120 220 100 220 C 80 220 75 195 56.7 185 C 38.4 175 13.4 180 5 161.7 C -3.4 143.4 15 128.4 15 110 C 15 91.6 -3.4 76.6 5 58.3 C 13.4 40 38.4 45 56.7 35 C 75 25 80 0 100 0 Z" />

                  <image
                    xlinkHref="/assets/course/course-details-person.png"
                    clipPath="url(#blobClip)"
                    x="0"
                    y="20"
                    width="200"
                    height="220"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </svg>
              </div>

              {/* UNGROUPED TOP-RIGHT DECORATIONS */}
              <div className="absolute -top-12 -right-8 w-32 h-32 md:-top-40 md:-right-40 md:w-44 md:h-44 bg-[#C4B5D6] rounded-full z-0 pointer-events-none" />
              <div className="absolute top-4 right-8 w-40 h-40 md:-top-30 md:-right-30 md:w-44 md:h-44 border-[2px] border-[#D4C3EC] rounded-full z-0 pointer-events-none" />
              <svg className="absolute bottom-[250px] right-[10px] md:right-[400px] w-12 md:w-16 h-12 md:h-20 text-white z-10 animate-float" style={{ animationDelay: '1.5s' }} width="62" height="90" viewBox="0 0 62 90" fill="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M11.9061 59.007C14.0399 56.5574 15.8161 54.0248 18.0799 52.0519C20.5823 49.871 23.3433 47.7932 26.3353 46.418C29.8446 44.8052 33.2959 46.2527 35.1085 49.2559C37.0537 52.4786 36.4436 56.0161 33.3341 58.7212C29.3168 62.216 24.4634 63.7529 19.286 64.4306C18.0217 64.5962 16.7447 64.6638 15.5494 64.7697C11.2899 71.7057 12.2397 74.3952 23.8318 88.3259C21.9151 90.6212 19.9264 89.6858 18.011 88.428C11.5895 84.2112 7.381 74.0322 8.9194 66.5463C9.075 65.7887 9.2672 65.0385 9.4774 64.1346C8.5276 63.5829 7.68681 63.1466 6.89951 62.629C1.22211 58.8965 -1.37299 52.8372 0.719513 46.3735C1.92801 42.6402 3.93461 39.031 6.20651 35.8059C10.1248 30.2436 15.4029 25.941 21.1064 22.3069C27.9984 17.9155 35.1027 13.8574 42.1096 9.64581C43.1586 9.01531 44.1773 8.33442 45.5222 7.47812C42.8938 6.37782 40.6539 5.62922 38.6289 4.49652C37.8557 4.06402 36.9346 2.33782 37.2011 1.92572C37.7735 1.04062 39.0572 0.595235 40.089 0.0433345C40.3194 -0.0798655 40.7127 0.093918 41.0294 0.141418C46.0793 0.900418 51.1191 1.73633 56.1815 2.39883C60.6526 2.98393 61.463 3.84902 60.8888 8.27582C60.2297 13.3565 57.9174 17.726 54.8043 21.6912C53.798 22.9729 52.5564 24.1143 50.5335 22.5651C50.221 18.0027 54.1896 14.7185 55.0628 9.76282C53.4469 10.4832 52.3049 10.8753 51.2787 11.468C42.3972 16.5983 33.3616 21.4924 24.7395 27.0293C20.0679 30.0294 15.8439 33.8799 11.9321 37.853C9.52771 40.2953 7.6347 43.506 6.3284 46.705C4.1392 52.0657 6.16631 56.2195 11.9061 59.007ZM18.9614 58.096L19.6457 59.1661C22.8097 58.9717 25.7536 58.0054 28.4548 56.2896C30.9511 54.7039 31.8011 53.0737 30.7087 51.8348C29.1529 50.0704 27.4087 51.0416 26.0518 52.071C23.5847 53.9427 21.3141 56.0734 18.9614 58.096Z" fill="white" />
              </svg>

              <svg className="absolute top-[10px] right-[10px] md:right-[50px] w-12 md:w-16 h-12 md:h-20 text-white z-10" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">

                <path d="M62.6359 1.38151C52.3069 -1.04187 41.3251 -0.29261 31.5486 3.75252C30.8732 4.03208 30.1989 4.32902 29.5286 4.64216C25.5378 2.30032 20.6168 1.284 15.9842 2.05828C6.55682 3.63372 -0.917921 12.1608 0.0914977 21.3721C0.328519 23.5353 0.987293 25.3616 2.35176 27.1135C3.33258 28.3731 6.60052 27.0503 6.05414 25.477C4.84045 21.981 4.60858 18.2413 5.7221 14.6997C6.75131 11.4263 8.85616 8.50548 11.7468 6.84481C11.8026 6.81285 11.8487 6.78621 11.8885 6.76305C11.9039 6.75818 11.9423 6.74173 12.0232 6.70305C12.2531 6.59257 12.4843 6.48533 12.7198 6.38597C13.1949 6.18539 13.1252 6.21367 13.4698 6.11107C14.4694 5.81321 15.0495 5.7062 16.154 5.63348C17.8647 5.52091 19.7369 5.80069 21.4288 6.3459C22.4145 6.66345 23.3733 7.07296 24.2867 7.56097C21.9167 9.13733 19.7679 10.9932 18.0626 13.1727C15.1399 16.9084 13.9782 22.1874 16.6578 26.3525C19.7889 31.2194 26.2812 31.3931 31.1296 28.7805C36.3744 25.9541 38.65 20.3676 37.4136 14.8579C36.7688 11.9843 35.2518 9.47269 33.189 7.43773C33.4534 7.33003 33.7188 7.22488 33.9853 7.12274C34.1381 7.06414 34.2917 7.00763 34.4452 6.95112C34.5312 6.9217 34.8327 6.81493 34.9197 6.78598C35.4192 6.62084 35.922 6.4645 36.4278 6.31789C37.5528 5.99177 38.6928 5.71153 39.8427 5.4769C40.0255 5.43961 40.2087 5.40418 40.3922 5.36921C40.4758 5.35531 40.6738 5.32078 40.7072 5.31569C41.2883 5.22721 41.8681 5.13781 42.4519 5.06578C43.5615 4.92867 44.6765 4.83277 45.7939 4.77672C49.641 4.58378 54.1683 4.98774 58.1112 5.97256C66.6129 8.09599 74.3919 12.7151 79.6281 19.4798C85.1199 26.5748 88.0235 35.3289 87.515 44.1318C87.2768 48.2578 86.1968 52.2633 84.3868 56.021C83.5746 57.7074 82.4995 59.4493 81.2548 61.1336C79.8651 63.0136 79.0299 63.9538 77.2997 65.5772C76.5498 66.2808 75.7663 66.9471 74.9644 67.5968C74.948 67.61 74.9204 67.6316 74.8887 67.6554C74.7137 67.7851 74.5397 67.9158 74.3633 68.0436C73.8528 68.4137 73.3324 68.7713 72.8026 69.1162C72.3696 69.3983 71.9303 69.6721 71.485 69.9364C71.2874 70.0538 71.0851 70.1649 70.8881 70.2835C70.8361 70.3148 70.7923 70.3412 70.754 70.3646C69.7819 70.8637 68.8004 71.339 67.7878 71.7608C67.3067 71.9611 66.8187 72.1416 66.3324 72.3299C66.3265 72.3322 66.3222 72.3338 66.3168 72.3361C66.2799 72.3472 66.2403 72.359 66.1939 72.3732C65.9718 72.4408 65.7519 72.5156 65.5297 72.5837C64.4145 72.9253 63.2832 73.1979 62.1396 73.4386C62.1134 73.4441 62.068 73.4522 62.0179 73.4608C61.8102 73.4939 61.603 73.5278 61.395 73.5581C60.8174 73.6422 60.2371 73.7117 59.6555 73.7668C59.1903 73.8108 58.724 73.8455 58.2573 73.871C57.9656 73.887 57.6736 73.899 57.3816 73.9078C57.2064 73.9139 57.0312 73.918 56.8557 73.9203C57.1208 73.9231 57.1313 73.9236 56.887 73.9213C48.3803 73.8733 40.1452 70.7306 33.8289 65.0755C32.8471 64.1965 31.9279 63.2631 31.081 62.2723C34.1583 62.7989 37.2496 63.2121 40.3619 63.3421C41.3367 63.3828 42.382 63.0111 43.0063 62.2806C43.4899 61.715 43.6414 60.952 42.8015 60.6016C39.7689 59.3363 36.6509 58.6415 33.4367 57.9207C30.1473 57.183 26.8549 56.4567 23.5686 55.7058C22.307 55.4174 21.1087 55.6155 19.9752 56.2429C19.2121 56.6654 17.7772 57.6819 17.9688 58.7068C18.6126 62.1544 19.3826 65.5753 20.1354 69.0027C20.8763 72.3757 21.2533 76.0848 22.8658 79.1928C23.444 80.3073 25.2255 80.0495 26.1898 79.703C27.3189 79.2975 28.7709 78.3995 28.8004 77.1055C28.8581 74.5784 28.2465 72.0445 27.6099 69.55C33.1516 74.5566 40.3502 77.7204 48.0527 78.8192C58.6988 80.3379 69.7644 77.3853 78.2688 71.1854C86.6762 65.0563 92.6787 56.33 94.4669 46.365C96.2391 36.4883 93.5061 25.936 87.5591 17.7035C81.6541 9.52874 72.7814 3.76203 62.6359 1.38151ZM30.2942 24.5475C29.8184 25.1826 29.2913 25.5921 28.7572 25.8693C28.5402 25.9819 28.2638 26.0898 28.0231 26.1456C27.6942 26.2218 27.3541 26.3221 26.787 26.3059C25.2937 26.2633 23.6851 25.2428 22.7991 23.9574C20.5237 20.6564 21.2822 16.5531 23.7599 13.5841C24.9741 12.1291 26.2948 11.1373 27.8706 10.1455C28.7163 10.9601 29.4597 11.8678 30.065 12.8596C32.1608 16.2942 32.8408 21.1476 30.2942 24.5475ZM62.0005 73.4634C61.5976 73.5273 61.8178 73.4942 62.0005 73.4634V73.4634ZM74.885 67.6577C74.4989 67.944 74.7345 67.7719 74.885 67.6577V67.6577Z" fill="white" />
              </svg>
            </>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsSection;

