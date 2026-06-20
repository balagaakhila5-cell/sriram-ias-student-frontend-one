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
import { PhoneLink } from './ContactLinks';
import { HEADER_SUPPORT_PHONE } from '@/config/supportContact';
import {
  getHeaderCourseLinks,
  getHeaderTabsForCity,
} from '@/features/center/data/centerCourseCategories';
import CoursesMegaMenuBackground from './CoursesMegaMenuBackground';
import CentersDropdownBackground from './CentersDropdownBackground';

const CENTER_CITY_ICONS = {
  delhi: '/assets/our-centers/new-delhi-india-gate-icon-1.png',
  hyderabad: '/assets/our-centers/hyderabad-charminar-icon-1.png',
  pune: '/assets/our-centers/pune-historical-icon-1.png',
} as const;

const CENTER_DROPDOWN_ITEMS = [
  {
    name: 'New Delhi',
    href: '/centers/delhi',
    icon: CENTER_CITY_ICONS.delhi,
    iconBg: 'bg-[#DCEEFF]',
    textColor: 'text-[#4A90D9]',
  },
  {
    name: 'Hyderabad',
    href: '/centers/hyderabad',
    icon: CENTER_CITY_ICONS.hyderabad,
    iconBg: 'bg-[#EDE8F7]',
    textColor: 'text-[#7B6FCF]',
  },
  {
    name: 'Pune',
    href: '/centers/pune',
    icon: CENTER_CITY_ICONS.pune,
    iconBg: 'bg-[#FEF0DC]',
    textColor: 'text-[#D9833A]',
  },
] as const;

const Header: React.FC<{ variant?: 'transparent' | 'light' }> = ({
  variant = 'transparent',
}) => {
  const isLightHeader = variant === 'light';
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isCentersOpen, setIsCentersOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [isBookMentorshipOpen, setIsBookMentorshipOpen] = useState(false);
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
  const centersDropdownRef = useRef<HTMLDivElement>(null);
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

      const clickedInsideCentersButton =
        centersButtonRef.current && centersButtonRef.current.contains(target);
      const clickedInsideCentersDropdown =
        centersDropdownRef.current && centersDropdownRef.current.contains(target);

      if (!clickedInsideCentersButton && !clickedInsideCentersDropdown) {
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
          src={CENTER_CITY_ICONS.delhi}
          alt="New Delhi"
          width={40}
          height={40}
          unoptimized
          className="h-[40px] w-[40px] object-contain"
        />
      ),
    },
    {
      name: 'Hyderabad',
      icon: (
        <Image
          src={CENTER_CITY_ICONS.hyderabad}
          alt="Hyderabad"
          width={40}
          height={40}
          unoptimized
          className="h-[40px] w-[40px] object-contain"
        />
      ),
    },
    {
      name: 'Pune',
      icon: (
        <Image
          src={CENTER_CITY_ICONS.pune}
          alt="Pune"
          width={40}
          height={40}
          unoptimized
          className="h-[40px] w-[40px] object-contain"
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

  const CourseLinkIcon = () => (
    <Image
      src="/assets/why-choose/tdesign_course-filled.png"
      alt=""
      width={22}
      height={22}
      unoptimized
      className="h-[22px] w-[22px] shrink-0 object-contain transition-opacity group-hover/course-item:opacity-80"
    />
  );

  const renderMegaMenuCourseLink = (course: { href: string; slug: string; label: string }) => (
    <Link
      href={course.href}
      key={course.slug}
      onClick={() => setIsCoursesOpen(false)}
      className="group/course-item flex w-full min-w-0 items-center gap-2.5"
    >
      <span className="shrink-0">
        <CourseLinkIcon />
      </span>
      <span className="min-w-0 font-[Montserrat] text-[15px] font-semibold leading-tight text-black transition-colors group-hover/course-item:text-[#1376B1] whitespace-nowrap">
        {course.label}
      </span>
    </Link>
  );

  const topNavItemClass = isLightHeader
    ? 'px-2 xl:px-2.5 py-1.5 rounded-[6px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase text-[#333333] font-bold cursor-pointer hover:text-black active:bg-transparent focus:bg-transparent'
    : 'px-2 xl:px-2.5 py-1.5 rounded-[6px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase text-white/80 font-bold cursor-pointer hover:text-white active:bg-transparent focus:bg-transparent';

  const secondNavItemClass = isLightHeader
    ? 'px-2 xl:px-2.5 py-1.5 rounded-[6px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase text-[#333333] font-bold cursor-pointer hover:text-black active:bg-transparent focus:bg-transparent'
    : 'px-2 xl:px-2.5 py-1.5 rounded-[6px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase text-white/80 font-bold cursor-pointer hover:text-white active:bg-transparent focus:bg-transparent';

  const topNavActiveClass = isLightHeader ? 'text-black' : 'text-white';
  const navMutedClass = isLightHeader
    ? 'text-[#333333]/80 hover:text-black'
    : 'text-white/80 hover:text-white';
  const navActiveClass = isLightHeader ? 'text-black' : 'text-white';

  return (
    <>
      <header
        ref={headerRef}
        className={
          isLightHeader
            ? "sticky top-0 left-0 right-0 z-50 mx-auto w-full border-b border-gray-100 bg-white py-2 shadow-sm lg:py-2 px-3 md:px-4 lg:px-6 font-['Montserrat']"
            : "absolute top-0 left-0 right-0 z-50 mx-auto w-full bg-transparent py-2 lg:py-2 px-3 md:px-4 lg:px-6 font-['Montserrat']"
        }
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
            <div
              className={`relative z-[55] hidden lg:flex items-center gap-1.5 xl:gap-2 text-[16px] font-medium leading-[100%] tracking-normal uppercase ${
                isLightHeader ? 'text-[#333333]' : 'text-white/80'
              }`}
            >
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
                  <div className="absolute top-full left-0 z-50 mt-2 w-36 overflow-hidden rounded-lg border border-white/50 py-2 text-center shadow-xl bg-[linear-gradient(145deg,#B8E4F7_0%,#D8E6F5_42%,#EAC8D0_100%)]">
                    {[
                      { label: 'English', href: '/blogs?lang=english' },
                      { label: 'Marathi', href: '/blogs?lang=marathi' },
                      { label: 'Telugu', href: '/blogs?lang=telugu' },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsBlogLangOpen(false)}
                        className="block w-full px-4 py-2 text-center text-sm font-medium text-gray-800 transition-colors hover:bg-white/40 hover:text-[#1897D8] cursor-pointer normal-case"
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
                  className={`${topNavItemClass} ${isCentersOpen ? topNavActiveClass : ''}`}
                >
                  OUR CENTERS
                </button>

                {isCentersOpen && (
                  <div
                    ref={centersDropdownRef}
                    className="absolute top-full left-0 z-50 mt-3 w-[min(520px,calc(100vw-2rem))] overflow-hidden rounded-[12px] bg-white shadow-[0px_10px_28px_rgba(0,0,0,0.14)]"
                  >
                    <CentersDropdownBackground />

                    <div className="relative z-20 flex flex-col items-stretch justify-center gap-[10px] px-5 py-5 sm:flex-row sm:items-center">
                      {CENTER_DROPDOWN_ITEMS.map((center) => (
                        <Link
                          key={center.href}
                          href={center.href}
                          onClick={() => setIsCentersOpen(false)}
                          className="group flex h-[140px] min-w-0 flex-1 flex-col items-center justify-center rounded-[10px] bg-white px-3 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                        >
                          <div
                            className={`mb-2.5 flex h-[52px] w-[52px] items-center justify-center rounded-[12px] ${center.iconBg}`}
                          >
                            <Image
                              src={center.icon}
                              alt={center.name}
                              width={40}
                              height={40}
                              unoptimized
                              className="h-[40px] w-[40px] object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <h3
                            className={`text-[14px] leading-[20px] font-semibold normal-case ${center.textColor}`}
                          >
                            {center.name}
                          </h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

             <Link href="/our-toppers-gallery" className={topNavItemClass}>
                OUR TOPPERS
              </Link>

              <div className="relative" ref={langRef}>
                <div
                  className={`flex items-center gap-1 cursor-pointer px-1.5 xl:px-2 py-1.5 rounded-[4px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase font-bold ${
                    isLightHeader
                      ? 'text-[#333333] hover:text-black'
                      : 'text-white/80 hover:text-white'
                  }`}
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
                  <div className="absolute top-full right-0 mt-2 w-32 overflow-hidden rounded-lg border border-white/50 py-2 text-center z-50 shadow-xl bg-[linear-gradient(145deg,#B8E4F7_0%,#D8E6F5_42%,#EAC8D0_100%)]">
                    {['English', 'Telugu', 'Marathi'].map((lang) => (
                      <div
                        key={lang}
                        className="block w-full cursor-pointer px-4 py-2 text-center text-sm font-medium text-gray-800 transition-colors hover:bg-white/40 hover:text-[#1897D8]"
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
                <PhoneLink
                  value={HEADER_SUPPORT_PHONE}
                  className={`font-semibold text-[16px] leading-[100%] tracking-normal font-[Montserrat] xl:text-[14px] uppercase hover:underline ${
                    isLightHeader ? 'text-[#1897D8]' : 'text-white'
                  }`}
                />
              </div>

              <button
                onClick={() => setIsBookDemoOpen(true)}
                className={
                  isLightHeader
                    ? 'rounded-full bg-gradient-to-r from-[#00679C] to-[#002436] px-2.5 py-2 text-[14px] font-bold uppercase text-white shadow-sm transition-all duration-300 xl:text-[14px]'
                    : 'rounded-full bg-transparent px-2.5 py-2 text-[14px] font-bold uppercase text-white shadow-none transition-all duration-300 hover:bg-transparent xl:text-[14px]'
                }
              >
                BOOK FREE DEMO
              </button>

              <div
                onClick={() => setIsSearchOpen(true)}
                className={`flex h-[32px] w-[32px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full ${
                  isLightHeader ? 'bg-gray-100' : 'bg-[#FFFFFF40]'
                }`}
              >
                <Image src="/assets/Search-Icon.svg" alt="search" width={20} height={20} />
              </div>

              <HeaderUserMenu theme={isLightHeader ? 'light' : 'dark'} />
            </div>

            <div
              className={`relative z-[55] flex lg:hidden items-center gap-3 md:gap-4 ${
                isLightHeader ? 'text-gray-900' : 'text-white'
              }`}
            >
              <div
                className={`hidden md:flex items-center gap-2 rounded-[4px] border px-3 py-1.5 ${
                  isLightHeader ? 'border-gray-300' : 'border-white/20'
                }`}
              >
                <PhoneLink
                  value={HEADER_SUPPORT_PHONE}
                  className={`font-bold text-sm hover:underline ${
                    isLightHeader ? 'text-[#1897D8]' : 'text-white'
                  }`}
                />
              </div>

              <button
                onClick={() => setIsBookDemoOpen(true)}
                className="hidden sm:block rounded-full px-4 py-2 tracking-wide text-sm whitespace-nowrap shadow-[0px_4px_32px_0px_#0000001A] md:px-6 md:py-2.5 md:text-base"
                style={{ background: 'linear-gradient(90deg, #00679C 0%, #002436 100%)' }}
              >
                BOOK A DEMO
              </button>

              <div
                onClick={() => setIsSearchOpen(true)}
                className={`flex cursor-pointer items-center justify-center rounded-full p-2 transition-all ${
                  isLightHeader
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Search
                  size={18}
                  className={`md:h-5 md:w-5 ${isLightHeader ? 'text-gray-800' : ''}`}
                />
              </div>

              <div
                className="cursor-pointer transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} className="md:h-7 md:w-7" />
              </div>

              <HeaderUserMenu theme={isLightHeader ? 'light' : 'dark'} />
            </div>

            <nav
              className={`hidden lg:flex items-center gap-1.5 xl:gap-2 text-[16px] uppercase font-medium ${
                isLightHeader ? 'text-[#333333]' : 'text-white/80'
              }`}
            >
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
                  className={`flex items-center gap-1 ${secondNavItemClass} ${isCoursesOpen ? navActiveClass : ''}`}
                >
                  Courses
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isCoursesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              <div ref={freeResourcesMenuRef} className="relative flex items-center cursor-pointer">
                <div className="flex items-center rounded-[6px] transition-all duration-300 cursor-pointer">
                  <Link
                    href="/free_resources/ncert-books"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className={`pl-1.5 xl:pl-2 pr-0.5 py-1.5 uppercase text-[14px] xl:text-[14px] font-bold active:bg-transparent focus:bg-transparent ${
                      isFreeResourcesOpen ? navActiveClass : navMutedClass
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
                      isFreeResourcesOpen ? navActiveClass : navMutedClass
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isFreeResourcesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {isFreeResourcesOpen && (
                  <div
                    ref={freeResourcesDropdownRef}
                    className="absolute top-full left-1/2 z-50 mt-3 w-[min(620px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[12px] bg-white shadow-[0px_10px_28px_rgba(0,0,0,0.14)]"
                  >
                    <div className="relative z-20 flex items-center justify-center gap-3 px-6 py-6">
                      <Link
                        href="/free_resources/ncert-page"
                        onClick={() => setIsFreeResourcesOpen(false)}
                        className="group flex h-[108px] w-[118px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#E8F3C9]">
                          <BookOpen className="h-[18px] w-[18px] text-[#6E9331]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[12px] font-semibold leading-[16px] normal-case text-[#6E9331]">
                          NCERT Books
                        </h3>
                      </Link>

                      <Link
                        href="/free_resources/previous-year"
                        onClick={() => setIsFreeResourcesOpen(false)}
                        className="group flex h-[108px] w-[148px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#F7DDE0]">
                          <FileText className="h-[18px] w-[18px] text-[#C57A7E]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[11px] font-semibold leading-[14px] normal-case text-[#C57A7E]">
                          Previous Year Question Papers
                        </h3>
                      </Link>

                      <Link
                        href="/free_resources/free-mocktests"
                        onClick={() => setIsFreeResourcesOpen(false)}
                        className="group flex h-[108px] w-[118px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#E8F3C9]">
                          <ClipboardCheck className="h-[18px] w-[18px] text-[#6E9331]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[12px] font-semibold leading-[16px] normal-case text-[#6E9331]">
                          Free Mock Tests
                        </h3>
                      </Link>

                      <Link
                        href="/free_resources/study-materials"
                        onClick={() => setIsFreeResourcesOpen(false)}
                        className="group flex h-[108px] w-[118px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#F7DDE0]">
                          <LibraryBig className="h-[18px] w-[18px] text-[#FF4B55]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[12px] font-semibold leading-[16px] normal-case text-[#FF4B55]">
                          Study Material
                        </h3>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div ref={currentAffairsMenuRef} className="relative flex items-center cursor-pointer">
                <div className="flex items-center rounded-[6px] transition-all duration-300 cursor-pointer">
                  <Link
                    href="/current-affairs"
                    onClick={() => setIsCurrentAffairsOpen(false)}
                    className={`pl-1.5 xl:pl-2 pr-0.5 py-1.5 uppercase text-[14px] xl:text-[14px] font-bold active:bg-transparent focus:bg-transparent ${
                      isCurrentAffairsOpen ? navActiveClass : navMutedClass
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
                      isCurrentAffairsOpen ? navActiveClass : navMutedClass
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isCurrentAffairsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {isCurrentAffairsOpen && (
                  <div
                    ref={currentAffairsDropdownRef}
                    className="absolute top-full left-1/2 z-50 mt-3 w-[min(830px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[12px] bg-white shadow-[0px_10px_28px_rgba(0,0,0,0.14)]"
                  >
                    <div className="relative z-20 flex flex-wrap items-center justify-center gap-3 px-6 py-6 sm:flex-nowrap">
                      <Link
                        href="/current-affairs/daily-current-affairs"
                        onClick={() => setIsCurrentAffairsOpen(false)}
                        className="group flex h-[108px] w-[118px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#DCEEFF]">
                          <Newspaper className="h-[18px] w-[18px] text-[#4A90D9]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[11px] font-semibold leading-[14px] normal-case text-[#4A90D9]">
                          Daily Current Affairs
                        </h3>
                      </Link>

                      <Link
                        href="/current-affairs/monthly-magazine"
                        onClick={() => setIsCurrentAffairsOpen(false)}
                        className="group flex h-[108px] w-[118px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#EDE8F7]">
                          <BookMarked className="h-[18px] w-[18px] text-[#7B6FCF]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[12px] font-semibold leading-[16px] normal-case text-[#7B6FCF]">
                          Monthly Magazine
                        </h3>
                      </Link>

                      <Link
                        href="/current-affairs/daily-practice-questions"
                        onClick={() => setIsCurrentAffairsOpen(false)}
                        className="group flex h-[108px] w-[132px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#E8F3C9]">
                          <ClipboardList className="h-[18px] w-[18px] text-[#6E9331]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[11px] font-semibold leading-[14px] normal-case text-[#6E9331]">
                          Daily Practice Questions
                        </h3>
                      </Link>

                      <Link
                        href="/current-affairs/infographics"
                        onClick={() => setIsCurrentAffairsOpen(false)}
                        className="group flex h-[108px] w-[118px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#F7DDE0]">
                          <BarChart2 className="h-[18px] w-[18px] text-[#C57A7E]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[12px] font-semibold leading-[16px] normal-case text-[#C57A7E]">
                          Infographics
                        </h3>
                      </Link>

                      <Link
                        href="/current-affairs/monthly-recap"
                        onClick={() => setIsCurrentAffairsOpen(false)}
                        className="group flex h-[108px] w-[118px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#FEF0DC]">
                          <CalendarDays className="h-[18px] w-[18px] text-[#D9833A]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[12px] font-semibold leading-[16px] normal-case text-[#D9833A]">
                          Monthly Recap
                        </h3>
                      </Link>

                      <Link
                        href="/current-affairs/daily-learning"
                        onClick={() => setIsCurrentAffairsOpen(false)}
                        className="group flex h-[108px] w-[118px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white px-2 text-center shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#E3F4FC]">
                          <BookOpen className="h-[18px] w-[18px] text-[#349EE3]" strokeWidth={2} />
                        </div>
                        <h3 className="text-[12px] font-semibold leading-[16px] normal-case text-[#349EE3]">
                          Daily Learning
                        </h3>
                      </Link>
                    </div>
                  </div>
                )}
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
                    isAboutOpen ? navActiveClass : ''
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
                  <div className="absolute top-full right-0 z-50 mt-3 h-[138px] w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-[12px] bg-white shadow-[0px_10px_28px_rgba(0,0,0,0.14)]">
                    <div className="about-bg-motion absolute inset-0 pointer-events-none" />
                    <div className="absolute inset-0 bg-white/10 pointer-events-none" />

                    <div className="relative z-20 flex h-full items-center justify-center gap-2.5 px-5">
                      <Link
                        href="/about"
                        onClick={() => setIsAboutOpen(false)}
                        className="group flex h-[96px] w-[118px] flex-col items-center justify-center rounded-[10px] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center">
                          <Image
                            src="/assets/about/about-us-icon.svg"
                            alt="About Us"
                            width={36}
                            height={36}
                            priority
                            unoptimized
                            className="h-[36px] w-[36px] object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        <span className="text-[12px] font-semibold normal-case text-[#B95D63]">
                          About Us
                        </span>
                      </Link>

                      <Link
                        href="/founders-message"
                        onClick={() => setIsAboutOpen(false)}
                        className="group flex h-[96px] w-[148px] flex-col items-center justify-center rounded-[10px] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_10px_22px_rgba(0,0,0,0.1)]"
                      >
                        <div className="mb-1.5 flex h-[36px] w-[36px] items-center justify-center">
                          <Image
                            src="/assets/about/founder's-message-icon.svg"
                            alt="Founder Message"
                            width={36}
                            height={36}
                            priority
                            unoptimized
                            className="h-[36px] w-[36px] object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        <span className="text-[12px] font-semibold normal-case text-[#6F8E3B]">
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

        <div
          ref={megaMenuRef}
          className={`absolute top-full left-1/2 z-50 mt-3 w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 flex min-h-[300px] origin-top transform cursor-default overflow-hidden rounded-[24px] border border-gray-100/80 bg-white text-left shadow-2xl transition-all duration-300 ${
            isCoursesOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          <CoursesMegaMenuBackground />

          <div className="relative z-10 isolate flex min-h-[300px] w-full">
            <div className="relative flex w-[240px] shrink-0 flex-col items-center overflow-hidden px-3 pb-4 pt-4">
              <h3 className="courses-mega-menu-title relative z-10 mb-5 w-full border-0 text-center uppercase">
                <span className="courses-mega-menu-title__text bg-gradient-to-r from-[#20A0E0] to-[#E16165] bg-clip-text text-transparent">
                  COURSES
                </span>
              </h3>

              <div className="relative z-10 mx-auto w-full max-w-[210px] space-y-2">
                {cities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => setActiveCity(city.name)}
                    className={`grid w-full grid-cols-[44px_1fr] items-center gap-2.5 rounded-[14px] px-2.5 py-2 transition-all duration-300 ${
                      activeCity === city.name
                        ? 'bg-[#E3F2F9]/90 text-[#0A73B7] shadow-sm ring-2 ring-[#20A0E0]/30'
                        : 'text-gray-500 hover:bg-[#E8F4FC] hover:text-[#1E86C1]'
                    }`}
                  >
                    <div className="flex h-[44px] w-[44px] items-center justify-center overflow-hidden bg-transparent">
                      {city.icon}
                    </div>

                    <span
                      className={`text-left font-[Montserrat] text-[16px] font-semibold leading-tight tracking-tight ${
                        activeCity === city.name ? 'text-[#1E86C1]' : 'text-[#2D8CC6]'
                      }`}
                    >
                      {city.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden p-4 md:p-5 md:pl-6">
              <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col">
                <div className="relative mb-4 shrink-0 overflow-hidden rounded-full border border-[#D6EBF5] bg-[#F0F8FD]/95 p-1 backdrop-blur-sm">
                  <div className="relative z-10 flex w-full justify-between gap-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 rounded-full px-3 py-2 text-[13px] font-semibold font-[Montserrat] transition-all duration-300 whitespace-nowrap ${
                          activeTab === tab
                            ? 'text-white shadow-sm'
                            : 'bg-transparent text-[#333333] hover:text-[#15658D]'
                        }`}
                        style={activeTab === tab ? { background: 'linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)' } : {}}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid flex-1 grid-cols-1 content-start gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
                  {courseList.map((course) => renderMegaMenuCourseLink(course))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <BookFreeDemoModal
          isOpen={isBookDemoOpen}
          onClose={() => setIsBookDemoOpen(false)}
        />
        <BookFreeDemoModal
          isOpen={isBookMentorshipOpen}
          onClose={() => setIsBookMentorshipOpen(false)}
          variant="mentorship"
        />

        <SearchPopup
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onBookMentorship={() => {
            setIsSearchOpen(false);
            setIsBookMentorshipOpen(true);
          }}
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
            <a href="/our-toppers-gallery" className="hover:text-primary transition-colors">Our Toppers&apos;</a>
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
                <div className="mt-1 flex flex-col gap-1 overflow-hidden rounded-lg border border-white/50 py-2 pl-0 text-center shadow-md bg-[linear-gradient(145deg,#B8E4F7_0%,#D8E6F5_42%,#EAC8D0_100%)]">
                  {['English', 'Telugu', 'Marathi'].map((lang) => (
                    <div
                      key={lang}
                      className={`block w-full cursor-pointer px-4 py-2 text-center text-sm transition-colors hover:bg-white/40 hover:text-primary ${
                        selectedLang === lang ? 'font-bold text-primary' : 'font-medium text-gray-800'
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