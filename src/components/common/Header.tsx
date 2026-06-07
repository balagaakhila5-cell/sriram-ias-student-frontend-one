'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  FileText,
  ClipboardCheck,
  LibraryBig,
  Newspaper,
  BookMarked,
  ClipboardList,
  BarChart2,
  CalendarDays,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import BookFreeDemoModal from './BookFreeDemoModal';
import SearchPopup from './SearchPopup';
import HeaderUserMenu from './HeaderUserMenu';
import {
  getHeaderCourseLinks,
  getHeaderTabsForCity,
} from '@/features/center/data/centerCourseCategories';

const Header: React.FC = () => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isCentersOpen, setIsCentersOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [isFreeResourcesOpen, setIsFreeResourcesOpen] = useState(false);
  const [isCurrentAffairsOpen, setIsCurrentAffairsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBlogLangOpen, setIsBlogLangOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const coursesButtonRef = useRef<HTMLDivElement>(null);
  const centersMenuRef = useRef<HTMLDivElement>(null);
  const centersButtonRef = useRef<HTMLDivElement>(null);
  const freeResourcesMenuRef = useRef<HTMLDivElement>(null);
  const freeResourcesDropdownRef = useRef<HTMLDivElement>(null);
  const currentAffairsMenuRef = useRef<HTMLDivElement>(null);
  const currentAffairsDropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const blogLangRef = useRef<HTMLDivElement>(null);
  const aboutMenuRef = useRef<HTMLDivElement>(null);

  const [activeCity, setActiveCity] = useState('New Delhi');
  const [activeTab, setActiveTab] = useState('GS Foundation');

  const closeAllDesktopMenus = () => {
    setIsCoursesOpen(false);
    setIsCentersOpen(false);
    setIsFreeResourcesOpen(false);
    setIsCurrentAffairsOpen(false);
    setIsBlogLangOpen(false);
    setIsAboutOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(target) &&
        coursesButtonRef.current &&
        !coursesButtonRef.current.contains(target)
      ) {
        setIsCoursesOpen(false);
      }

      if (
        centersMenuRef.current &&
        !centersMenuRef.current.contains(target) &&
        centersButtonRef.current &&
        !centersButtonRef.current.contains(target)
      ) {
        setIsCentersOpen(false);
      }

      if (langRef.current && !langRef.current.contains(target)) {
        setIsLangOpen(false);
      }

      if (blogLangRef.current && !blogLangRef.current.contains(target)) {
        setIsBlogLangOpen(false);
      }

      if (aboutMenuRef.current && !aboutMenuRef.current.contains(target)) {
        setIsAboutOpen(false);
      }

      const clickedInsideFreeResourcesButton =
        freeResourcesMenuRef.current && freeResourcesMenuRef.current.contains(target);
      const clickedInsideFreeResourcesDropdown =
        freeResourcesDropdownRef.current && freeResourcesDropdownRef.current.contains(target);

      if (!clickedInsideFreeResourcesButton && !clickedInsideFreeResourcesDropdown) {
        setIsFreeResourcesOpen(false);
      }

      const clickedInsideCurrentAffairsButton =
        currentAffairsMenuRef.current && currentAffairsMenuRef.current.contains(target);
      const clickedInsideCurrentAffairsDropdown =
        currentAffairsDropdownRef.current && currentAffairsDropdownRef.current.contains(target);

      if (!clickedInsideCurrentAffairsButton && !clickedInsideCurrentAffairsDropdown) {
        setIsCurrentAffairsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useGSAP(() => {}, { scope: headerRef });

  const cities = [
    {
      name: 'New Delhi',
      icon: (
        <Image
          src="/assets/new-delhi-only-icon.svg"
          alt="New Delhi"
          width={35}
          height={35}
          className="w-[35px] h-[35px] object-contain"
        />
      ),
    },
    {
      name: 'Hyderabad',
      icon: (
        <Image
          src="/assets/hyderabad-only-icon.svg"
          alt="Hyderabad"
          width={32}
          height={32}
          className="w-[32px] h-[32px] object-contain"
        />
      ),
    },
    {
      name: 'Pune',
      icon: (
        <Image
          src="/assets/pune-only-icon.svg"
          alt="Pune"
          width={36}
          height={36}
          className="w-[36px] h-[36px] object-contain"
        />
      ),
    },
  ];

  const tabs = getHeaderTabsForCity(activeCity);
  const courseList = getHeaderCourseLinks(activeCity, activeTab);

  useEffect(() => {
    if (!tabs.includes(activeTab)) {
      setActiveTab(tabs[0] ?? 'GS Foundation');
    }
  }, [activeCity, activeTab, tabs]);

  const BulletArrow = () => (
    <img
      src="/assets/arrow.png"
      alt="arrow"
      className="w-[22px] h-[22px] object-contain shrink-0"
    />
  );

  const topNavItemClass =
    'px-2 xl:px-2.5 py-1.5 rounded-[6px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase text-white/80 font-bold cursor-pointer hover:text-white active:bg-transparent focus:bg-transparent';

  const secondNavItemClass =
    'px-2 xl:px-2.5 py-1.5 rounded-[6px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase text-white/80 font-bold cursor-pointer hover:text-white active:bg-transparent focus:bg-transparent';

  return (
    <>
      <header
        ref={headerRef}
        className="absolute top-0 left-0 right-0 z-50 mx-auto w-full bg-transparent py-5 lg:py-4 px-4 md:px-6 lg:px-8 xl:px-12 font-['Montserrat']"
      >
        <div className="w-full max-w-[1440px] mx-auto flex justify-between items-start relative">
        <div className="flex items-center">
            <Link href="/" className="inline-flex cursor-pointer items-center">
              <Image
                src="/assets/40_years_experience.png"
                alt="40 Years of Excellence"
                width={66}
                height={66}
                className="h-11 md:h-14 lg:h-[66px] w-auto object-contain hidden md:block transition-transform hover:scale-105 mr-[1px]"
              />
            </Link>

            <Link href="/" className="inline-flex cursor-pointer items-center">
              <Image
                src="/assets/Logo.png"
                alt="SRIRAM's IAS"
                width={70}
                height={76}
                className="h-11 md:h-14 lg:h-[76px] w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>
          </div>

          <div className="flex flex-col items-end lg:items-start gap-0.5 relative">
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-[16px] font-medium leading-[100%] tracking-normal uppercase text-white/80">
              <div ref={blogLangRef} className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setIsBlogLangOpen((prev) => {
                      if (!prev) {
                        setIsCoursesOpen(false);
                        setIsCentersOpen(false);
                        setIsFreeResourcesOpen(false);
                        setIsCurrentAffairsOpen(false);
                        setIsAboutOpen(false);
                      }
                      return !prev;
                    });
                  }}
                  className={`${topNavItemClass} flex items-center gap-1`}
                >
                  BLOG
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      isBlogLangOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isBlogLangOpen && (
                  <div className="absolute top-full left-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {[
                      { label: 'English', href: '/blogs?lang=english' },
                      { label: 'Marathi', href: '/blogs?lang=marathi' },
                      { label: 'Telugu', href: '/blogs?lang=telugu' },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsBlogLangOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1897D8] cursor-pointer transition-colors font-medium normal-case"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={centersButtonRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setIsCoursesOpen(false);
                    setIsFreeResourcesOpen(false);
                    setIsCurrentAffairsOpen(false);
                    setIsBlogLangOpen(false);
                    setIsAboutOpen(false);

                    setIsCentersOpen((prev) => !prev);
                  }}
                  className={`${topNavItemClass} ${isCentersOpen ? 'text-white' : ''}`}
                >
                  OUR CENTERS
                </button>
              </div>

             <Link href="/our-toppers-gallery" className={topNavItemClass}>
                OUR TOPPERS
              </Link>

              <div className="relative" ref={langRef}>
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-white px-1.5 xl:px-2 py-1.5 rounded-[4px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase text-white/80 font-bold"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                >
                  <Image
                    src="/assets/lan-img.png"
                    alt="globe"
                    width={15}
                    height={15}
                    style={{ width: '15px', height: 'auto' }}
                  />
                  <span>{selectedLang === 'English' ? 'ENG' : selectedLang.substring(0, 3).toUpperCase()}</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}
                  />
                </div>

                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {['English', 'Telugu', 'Marathi'].map((lang) => (
                      <div
                        key={lang}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1897D8] cursor-pointer transition-colors font-medium"
                        onClick={() => {
                          setSelectedLang(lang);
                          setIsLangOpen(false);
                        }}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className="flex items-center gap-2 border rounded-[10px] px-2.5 py-2"
                style={{ borderColor: '#1897D8' }}
              >
                <span className="text-white font-semibold text-[16px] leading-[100%] tracking-normal font-[Montserrat] xl:text-[14px] uppercase">
                  +91 8686818384
                </span>
              </div>

              <button
                onClick={() => setIsBookDemoOpen(true)}
                className="text-white font-bold px-2.5 py-2 rounded-[10px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase bg-transparent hover:bg-transparent shadow-none"
              >
                BOOK FREE DEMO
              </button>

              <div
                onClick={() => setIsSearchOpen(true)}
                className="w-[32px] h-[32px] bg-[#FFFFFF40] rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
              >
                <Image src="/assets/Search-Icon.svg" alt="search" width={20} height={20} />
              </div>

              <HeaderUserMenu />
            </div>

            <div className="flex lg:hidden items-center gap-3 md:gap-4 text-white">
              <div className="hidden md:flex border border-white/20 rounded-[4px] px-3 py-1.5 items-center gap-2">
                <span className="text-white font-bold text-sm">+ 91 8686818384</span>
              </div>

              <button
                onClick={() => setIsBookDemoOpen(true)}
                className="hidden sm:block px-4 md:px-6 py-2 md:py-2.5 rounded-[4px] tracking-wide text-sm md:text-base whitespace-nowrap shadow-[0px_4px_32px_0px_#0000001A]"
                style={{ background: 'linear-gradient(90deg, #00679C 0%, #002436 100%)' }}
              >
                BOOK A DEMO
              </button>

              <div
                onClick={() => setIsSearchOpen(true)}
                className="p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all flex items-center justify-center"
              >
                <Search size={18} className="md:w-5 md:h-5" />
              </div>

              <div className="cursor-pointer hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} className="md:w-7 md:h-7" />
              </div>

              <HeaderUserMenu />
            </div>

            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-[16px] uppercase text-white/80 font-medium">
              <div className="relative group" ref={coursesButtonRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setIsCentersOpen(false);
                    setIsFreeResourcesOpen(false);
                    setIsCurrentAffairsOpen(false);
                    setIsBlogLangOpen(false);
                    setIsAboutOpen(false);

                    setIsCoursesOpen((prev) => !prev);
                  }}
                  className={`flex items-center gap-1 ${secondNavItemClass} ${isCoursesOpen ? 'text-white' : ''}`}
                >
                  Courses
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isCoursesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              <div ref={freeResourcesMenuRef} className="flex items-center cursor-pointer">
                <div className="flex items-center rounded-[6px] transition-all duration-300 cursor-pointer">
                  <Link
                    href="/free_resources/ncert-books"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className={`pl-1.5 xl:pl-2 pr-0.5 py-1.5 uppercase text-[14px] xl:text-[14px] font-bold active:bg-transparent focus:bg-transparent ${
                      isFreeResourcesOpen ? 'text-white' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Free Resources
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setIsCoursesOpen(false);
                      setIsCentersOpen(false);
                      setIsCurrentAffairsOpen(false);
                      setIsBlogLangOpen(false);
                      setIsAboutOpen(false);

                      setIsFreeResourcesOpen((prev) => !prev);
                    }}
                    className={`pr-1.5 pl-0.5 py-1.5 flex items-center justify-center cursor-pointer active:bg-transparent focus:bg-transparent ${
                      isFreeResourcesOpen ? 'text-white' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isFreeResourcesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </div>

              <div ref={currentAffairsMenuRef} className="flex items-center cursor-pointer">
                <div className="flex items-center rounded-[6px] transition-all duration-300 cursor-pointer">
                  <Link
                    href="/current-affairs"
                    onClick={() => setIsCurrentAffairsOpen(false)}
                    className={`pl-1.5 xl:pl-2 pr-0.5 py-1.5 uppercase text-[14px] xl:text-[14px] font-bold active:bg-transparent focus:bg-transparent ${
                      isCurrentAffairsOpen ? 'text-white' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Current Affairs
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setIsCoursesOpen(false);
                      setIsCentersOpen(false);
                      setIsFreeResourcesOpen(false);
                      setIsBlogLangOpen(false);
                      setIsAboutOpen(false);

                      setIsCurrentAffairsOpen((prev) => !prev);
                    }}
                    className={`pr-1.5 pl-0.5 py-1.5 flex items-center justify-center cursor-pointer active:bg-transparent focus:bg-transparent ${
                      isCurrentAffairsOpen ? 'text-white' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isCurrentAffairsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </div>

              <Link href="/books" className={secondNavItemClass}>
                Books
              </Link>

              <div ref={aboutMenuRef} className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setIsCoursesOpen(false);
                    setIsCentersOpen(false);
                    setIsFreeResourcesOpen(false);
                    setIsCurrentAffairsOpen(false);
                    setIsBlogLangOpen(false);

                    setIsAboutOpen((prev) => !prev);
                  }}
                  className={`flex items-center gap-1 ${secondNavItemClass} ${
                    isAboutOpen ? 'text-white' : ''
                  }`}
                >
                  About
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isAboutOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isAboutOpen && (
                  <div className="absolute top-full right-0 mt-10 w-[min(602px,calc(100vw-2rem))] h-[274px] rounded-[22px] bg-white shadow-[0px_18px_50px_rgba(0,0,0,0.18)] overflow-hidden z-50">
                    <div className="about-bg-motion absolute inset-0 pointer-events-none" />
                    <div className="absolute inset-0 bg-white/10 pointer-events-none" />

                    <div className="relative z-20 flex h-full items-center justify-center gap-5 px-16">
                      <Link
                        href="/about"
                        onClick={() => setIsAboutOpen(false)}
                        className="group flex h-[172px] w-[190px] flex-col items-center justify-center rounded-[18px] bg-white shadow-[0px_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_18px_40px_rgba(0,0,0,0.12)]"
                      >
                        <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center">
                          <Image
                            src="/assets/about/about-us-icon.svg"
                            alt="About Us"
                            width={72}
                            height={72}
                            priority
                            unoptimized
                            className="h-[72px] w-[72px] object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        <span className="text-[18px] font-semibold normal-case text-[#B95D63]">
                          About Us
                        </span>
                      </Link>

                      <Link
                        href="/founders-message"
                        onClick={() => setIsAboutOpen(false)}
                        className="group flex h-[172px] w-[258px] flex-col items-center justify-center rounded-[18px] bg-white shadow-[0px_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_18px_40px_rgba(0,0,0,0.12)]"
                      >
                        <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center">
                          <Image
                            src="/assets/about/founder's-message-icon.svg"
                            alt="Founder Message"
                            width={72}
                            height={72}
                            priority
                            unoptimized
                            className="h-[72px] w-[72px] object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        <span className="text-[18px] font-semibold normal-case text-[#6F8E3B]">
                          Founder&apos;s Message
                        </span>
                      </Link>
                    </div>

                    <style jsx global>{`
                      .about-bg-motion {
                        background-image: url("/assets/about/background-animation-about.png");
                        background-size: 125% 125%;
                        background-repeat: no-repeat;
                        background-position: left bottom;
                        opacity: 0.9;
                        animation: aboutWaveMove 3s ease-in-out infinite alternate;
                        will-change: transform, background-position;
                      }

                      @keyframes aboutWaveMove {
                        0% {
                          background-position: left bottom;
                          transform: translateX(-18px) translateY(10px) scale(1.08);
                        }

                        50% {
                          background-position: center bottom;
                          transform: translateX(18px) translateY(-8px) scale(1.14);
                        }

                        100% {
                          background-position: right bottom;
                          transform: translateX(-10px) translateY(8px) scale(1.1);
                        }
                      }
                    `}</style>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>

        {isFreeResourcesOpen && (
          <div ref={freeResourcesDropdownRef} className="absolute top-full left-0 right-0 z-50 mt-4">
            <div className="w-full border-t border-b border-[#E9E9E9] bg-white/95 py-14">
              <div className="mx-auto w-full max-w-[1280px] px-10">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 xl:gap-6">
                  <Link
                    href="/free_resources/ncert-page"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#E8F3C9]">
                      <BookOpen className="h-8 w-8 text-[#6E9331]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[18px] leading-[26px] font-semibold normal-case text-[#6E9331]">
                      NCERT Books
                    </h3>
                  </Link>

                  <Link
                    href="/free_resources/previous-year"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#F7DDE0]">
                      <FileText className="h-8 w-8 text-[#C57A7E]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[17px] leading-[26px] font-semibold normal-case text-[#C57A7E] max-w-[210px]">
                      Previous Year Question Papers
                    </h3>
                  </Link>

                  <Link
                    href="/free_resources/free-mocktests"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#E8F3C9]">
                      <ClipboardCheck className="h-8 w-8 text-[#6E9331]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[18px] leading-[26px] font-semibold normal-case text-[#6E9331]">
                      Free Mock Tests
                    </h3>
                  </Link>

                  <Link
                    href="/free_resources/study-materials"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#F7DDE0]">
                      <LibraryBig className="h-8 w-8 text-[#FF4B55]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[18px] leading-[26px] font-semibold normal-case text-[#FF4B55]">
                      Study Material
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {isCurrentAffairsOpen && (
          <div ref={currentAffairsDropdownRef} className="absolute top-full left-0 right-0 z-50 mt-4">
            <div className="w-full border-t border-b border-[#E9E9E9] bg-white/95 py-14">
              <div className="mx-auto w-full max-w-[1280px] px-10">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                  <Link
                    href="/current-affairs"
                    onClick={() => setIsCurrentAffairsOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#DCEEFF]">
                      <Newspaper className="h-8 w-8 text-[#4A90D9]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[16px] leading-[24px] font-semibold normal-case text-[#4A90D9]">
                      Daily Current Affairs
                    </h3>
                  </Link>

                  <Link
                    href="/current-affairs"
                    onClick={() => setIsCurrentAffairsOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#EDE8F7]">
                      <BookMarked className="h-8 w-8 text-[#7B6FCF]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[16px] leading-[24px] font-semibold normal-case text-[#7B6FCF]">
                      Monthly Magazine
                    </h3>
                  </Link>

                  <Link
                    href="/current-affairs"
                    onClick={() => setIsCurrentAffairsOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#E8F3C9]">
                      <ClipboardList className="h-8 w-8 text-[#6E9331]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[16px] leading-[24px] font-semibold normal-case text-[#6E9331]">
                      Daily Practice Questions
                    </h3>
                  </Link>

                  <Link
                    href="/current-affairs"
                    onClick={() => setIsCurrentAffairsOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#F7DDE0]">
                      <BarChart2 className="h-8 w-8 text-[#C57A7E]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[16px] leading-[24px] font-semibold normal-case text-[#C57A7E]">
                      Infographics
                    </h3>
                  </Link>

                  <Link
                    href="/current-affairs"
                    onClick={() => setIsCurrentAffairsOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#FEF0DC]">
                      <CalendarDays className="h-8 w-8 text-[#D9833A]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[16px] leading-[24px] font-semibold normal-case text-[#D9833A]">
                      Monthly Recap
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          ref={megaMenuRef}
          className={`absolute top-full left-0 right-0 mt-6 bg-[#F2F7F9] rounded-[32px] shadow-2xl border border-white/20 flex overflow-hidden text-left cursor-default transform origin-top transition-all duration-300 z-50 min-h-[460px] ${
            isCoursesOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-[280px] bg-white p-8 shrink-0 border-r border-gray-100 z-10">
            <h3 className="text-[14px] font-[Montserrat] font-bold text-black mb-10 tracking-[0.1em] uppercase">
              COURSES
            </h3>

            <div className="space-y-4">
              {cities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => setActiveCity(city.name)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-[16px] transition-all duration-300 ${
                    activeCity === city.name ? 'text-[#0A73B7]' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  style={
                    activeCity === city.name
                      ? { background: 'linear-gradient(90deg, rgba(0, 159, 238, 0.24) 34.5%, rgba(0, 91, 136, 0.3) 100%)' }
                      : {}
                  }
                >
                  <div className={`transition-colors duration-300 ${activeCity === city.name ? 'text-[#0A73B7]' : 'text-gray-400'}`}>
                    {city.icon}
                  </div>

                  <span
                    className={`font-medium text-[17px] font-[Montserrat] tracking-tight ${
                      activeCity === city.name ? 'text-[#1E86C1]' : 'text-[#2D8CC6]'
                    }`}
                  >
                    {city.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-10 pl-12 bg-[#F7F4F4] relative overflow-hidden">
            {isCoursesOpen && (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.08] mix-blend-darken pointer-events-none"
              >
                <source src="/assets/dropdown-video.mp4" type="video/mp4" />
              </video>
            )}

            <div className="relative z-10">
              <div className="flex justify-between bg-[#E7E3E3] p-2 rounded-full mb-12 border border-[#E3DFDF]">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-7 py-3 rounded-full text-sm font-medium font-[Montserrat] transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab ? 'text-white shadow-sm' : 'text-[#5F5F5F] hover:text-[#333333]'
                    }`}
                    style={activeTab === tab ? { background: 'linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)' } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-[1fr_2px_1fr] gap-x-12 text-left items-start">
                <div className="flex flex-col gap-7">
                  {courseList.slice(0, Math.ceil(courseList.length / 2)).map((course) => (
                    <Link
                      href={course.href}
                      key={`left-${course.slug}`}
                      onClick={() => setIsCoursesOpen(false)}
                      className="flex items-start gap-4 group/left-item w-full"
                    >
                      <span className="group-hover/left-item:opacity-80 transition-opacity shrink-0 pt-[2px]">
                        <BulletArrow />
                      </span>
                      <span className="text-[17px] font-medium text-black font-[Montserrat] group-hover/left-item:text-[#1376B1] transition-colors leading-[1.3] text-left">
                        {course.label}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="h-[240px] w-[3px] bg-gradient-to-b from-transparent via-[#2184B8] to-transparent rounded-full opacity-80 mt-2"></div>

                <div className="flex flex-col gap-7">
                  {courseList.slice(Math.ceil(courseList.length / 2)).map((course) => (
                    <Link
                      href={course.href}
                      key={`right-${course.slug}`}
                      onClick={() => setIsCoursesOpen(false)}
                      className="flex items-start gap-4 group/right-item w-full"
                    >
                      <span className="group-hover/right-item:opacity-80 transition-opacity shrink-0 pt-[2px]">
                        <BulletArrow />
                      </span>
                      <span className="text-[17px] font-medium text-black font-[Montserrat] group-hover/right-item:text-[#1376B1] transition-colors leading-[1.3] text-left">
                        {course.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

 <div
  ref={centersMenuRef}
  className={`absolute top-full left-1/2 mt-6 w-[min(840px,calc(100vw-2rem))] h-[290px] -translate-x-1/2 overflow-hidden rounded-[8px] bg-white shadow-[0px_18px_50px_rgba(0,0,0,0.18)] border border-white/40 text-center cursor-default transform origin-top transition-all duration-300 z-50 ${
    isCentersOpen
      ? 'scale-100 opacity-100 pointer-events-auto'
      : 'scale-95 opacity-0 pointer-events-none'
  }`}
>
  {/* Visible moving background */}
  <div className="our-centers-bg-motion absolute inset-0 z-0 pointer-events-none" />

  {/* Very light overlay only */}
  <div className="absolute inset-0 z-[1] bg-white/10 pointer-events-none" />

  <div className="relative z-10 flex h-full w-full items-center justify-center gap-4 px-4 py-5 sm:gap-6 sm:px-8 overflow-hidden">
    <Link
      href="/centers/delhi"
      onClick={() => setIsCentersOpen(false)}
      className="group flex h-[200px] w-[210px] items-center justify-center transition-all duration-300 hover:-translate-y-1 sm:h-[228px] sm:w-[240px]"
    >
      <Image
        src="/assets/new-delhi-icon.svg"
        alt="New Delhi"
        width={266}
        height={252}
        priority
        unoptimized
        className="h-[200px] w-[210px] object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-[228px] sm:w-[240px]"
      />
    </Link>

    <Link
      href="/centers/hyderabad"
      onClick={() => setIsCentersOpen(false)}
      className="group flex h-[200px] w-[210px] items-center justify-center transition-all duration-300 hover:-translate-y-1 sm:h-[228px] sm:w-[240px]"
    >
      <Image
        src="/assets/hyderabad-icon.svg"
        alt="Hyderabad"
        width={266}
        height={252}
        priority
        unoptimized
        className="h-[200px] w-[210px] object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-[228px] sm:w-[240px]"
      />
    </Link>

    <Link
      href="/centers/pune"
      onClick={() => setIsCentersOpen(false)}
      className="group flex h-[200px] w-[210px] items-center justify-center transition-all duration-300 hover:-translate-y-1 sm:h-[228px] sm:w-[240px]"
    >
      <Image
        src="/assets/pune-icon.svg"
        alt="Pune"
        width={266}
        height={252}
        priority
        unoptimized
        className="h-[200px] w-[210px] object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-[228px] sm:w-[240px]"
      />
    </Link>
  </div>

  <style jsx global>{`
    .our-centers-bg-motion {
      background-image: url('/assets/background-animation-our-centers.png');
      background-size: 135% 135%;
      background-repeat: no-repeat;
      background-position: left center;
      opacity: 0.9;
      animation: ourCentersBgMove 2.8s ease-in-out infinite alternate;
      transform-origin: center center;
      will-change: transform, background-position;
    }

    @keyframes ourCentersBgMove {
      0% {
        background-position: left center;
        transform: translateX(-24px) translateY(8px) scale(1.12);
      }

      50% {
        background-position: center center;
        transform: translateX(22px) translateY(-8px) scale(1.18);
      }

      100% {
        background-position: right center;
        transform: translateX(-18px) translateY(7px) scale(1.14);
      }
    }
  `}</style>
</div>

        <BookFreeDemoModal
          isOpen={isBookDemoOpen}
          onClose={() => setIsBookDemoOpen(false)}
        />

        <SearchPopup
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 w-64 sm:w-80 bg-white z-[70] transform transition-transform duration-300 ease-in-out lg:hidden overflow-hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className="absolute left-0 top-0 w-[150px] h-[400px] pointer-events-none"
          style={{
            background:
              'linear-gradient(181.87deg, rgba(201, 149, 61, 0.4) -157.44%, rgba(192, 138, 44, 0.384) -157.4%, rgba(190, 132, 32, 0.268) 216.94%, rgba(246, 166, 28, 0.32) 216.94%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="absolute -bottom-0 -right-0 w-[140%] pointer-events-none opacity-40">
          <Image
            src="/assets/book_ing.png"
            alt="Book background"
            width={400}
            height={400}
            className="w-full h-auto object-cover object-bottom"
          />
        </div>

        <div className="flex flex-col h-full px-6 py-8 relative z-10 overflow-y-auto">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>

          <div className="mb-10">
            <Image
              src="/assets/SriRam_Ias_Logo.png"
              alt="SRIRAM's IAS"
              width={180}
              height={32}
              className="h-8 object-contain"
            />
          </div>

          <nav className="flex flex-col gap-6 text-[#333333] font-medium text-[15px]">
            <a href="/courses" className="hover:text-primary transition-colors">Courses</a>
            <a href="/free_resources/ncert-books" className="hover:text-primary transition-colors">Free Resources</a>
            <a href="/current-affairs" className="hover:text-primary transition-colors">Current Affairs</a>
            <a href="/books" className="hover:text-primary transition-colors">Books</a>
            <a href="/toppers" className="hover:text-primary transition-colors">Our Toppers</a>
            <a href="/about" className="hover:text-primary transition-colors">About us</a>
            <a href="/founders-message" className="hover:text-primary transition-colors">Founder&apos;s Message</a>
            <a href="/blogs?lang=english" className="hover:text-primary transition-colors">Blogs - English</a>
            <a href="/blogs?lang=marathi" className="hover:text-primary transition-colors">Blogs - Marathi</a>
            <a href="/blogs?lang=telugu" className="hover:text-primary transition-colors">Blogs - Telugu</a>
            <a href="/contact" className="hover:text-primary transition-colors">Contact Us</a>

            <div className="flex flex-col gap-2 mt-2">
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors w-fit"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <span>{selectedLang}</span>
                <ChevronDown
                  size={16}
                  className={`text-black transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isLangOpen && (
                <div className="flex flex-col gap-3 pl-4 mt-1 border-l border-gray-100">
                  {['English', 'Telugu', 'Marathi'].map((lang) => (
                    <div
                      key={lang}
                      className={`text-sm cursor-pointer transition-colors ${
                        selectedLang === lang ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'
                      }`}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;