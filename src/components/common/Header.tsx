'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  User,
  ChevronDown,
  Menu,
  X,
  Landmark,
  Castle,
  Building2,
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

  const [activeCity, setActiveCity] = useState('New Delhi');
  const [activeTab, setActiveTab] = useState('GS Foundation');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (megaMenuRef.current && !megaMenuRef.current.contains(target) && 
          coursesButtonRef.current && !coursesButtonRef.current.contains(target)) {
        setIsCoursesOpen(false);
      }

      if (centersMenuRef.current && !centersMenuRef.current.contains(target) &&
          centersButtonRef.current && !centersButtonRef.current.contains(target)) {
        setIsCentersOpen(false);
      }

      if (langRef.current && !langRef.current.contains(target)) {
        setIsLangOpen(false);
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
        src="/assets/del-footer.png"
        alt="New Delhi"
        width={28}
        height={28}
        className="w-[28px] h-[28px] object-contain"
      />
    ),
  },
  {
    name: 'Hyderabad',
    icon: (
      <Image
        src="/assets/hyd-footer.png"
        alt="Hyderabad"
        width={28}
        height={28}
        className="w-[28px] h-[28px] object-contain"
      />
    ),
  },
  {
    name: 'Pune',
    icon: (
      <Image
        src="/assets/pune-footer.png"
        alt="Pune"
        width={28}
        height={28}
        className="w-[28px] h-[28px] object-contain"
      />
    ),
  },
];

  const tabs =
    activeCity === 'New Delhi'
      ? ['GS Foundation', 'Mentorship', 'Optional Foundation', 'Test Series', 'CSAT', 'Enrichment Course']
      : ['GS Foundation', 'Mentorship', 'Optional Foundation', 'Test Series', 'Enrichment Courses'];

  const gsFoundationSlug =
    activeCity === 'New Delhi'
      ? '2-years-gs-foundation'
      : `2-years-gs-foundation-${activeCity.toLowerCase()}`;

  let courseList: { label: string; slug: string }[] = [];

  if (activeCity === 'New Delhi') {
    if (activeTab === 'GS Foundation') {
      courseList = [
        { label: '2 Years General Studies Foundation Course', slug: '2-years-gs-foundation' },
        { label: '1 Year General Studies Foundation Course', slug: '1-year-gs-foundation' },
        { label: 'NCERT Foundation Course', slug: 'ncert-foundation' },
      ];
    } else if (activeTab === 'Mentorship') {
      courseList = [{ label: 'STRIDE Mentorship Program', slug: 'stride-mentorship-program' }];
    } else if (activeTab === 'Optional Foundation') {
      courseList = [
        { label: 'Anthropology Optional Foundation Course', slug: 'anthropology-optional-foundation' },
        { label: 'Geography Optional Foundation Course', slug: 'geography-optional-foundation' },
        { label: 'PSIR Optional Foundation Course', slug: 'psir-optional-foundation' },
        { label: 'Sociology Optional Foundation Course', slug: 'sociology-optional-foundation' },
      ];
    } else if (activeTab === 'Test Series') {
      courseList = [
        { label: 'Prelims Test Series + Mentorship', slug: 'prelims-test-series-mentorship' },
        { label: 'Mains Test Series + Mentorship', slug: 'mains-test-series-mentorship' },
      ];
    } else if (activeTab === 'CSAT') {
      courseList = [{ label: 'CSAT Foundation Course', slug: 'csat-foundation' }];
    } else if (activeTab === 'Enrichment Course') {
      courseList = [{ label: 'Interview Guidance Program (IGP)', slug: 'interview-guidance-program' }];
    }
  } else {
    courseList = [
      {
        label: `2 Years GS Foundation Course${activeCity !== 'New Delhi' ? ` - ${activeCity}` : ''}`,
        slug: gsFoundationSlug,
      },
      { label: 'Prelims Test Series 2026', slug: 'prelims-test-series-2026' },
      { label: 'PSIR Optional Foundational Courses', slug: 'psir-optional-foundational' },
      { label: 'Geography Optional Courses', slug: 'geography-optional' },
      { label: 'Mains Enrichment Program 2025', slug: 'mains-enrichment-2025' },
      { label: 'PSIR Value Enrichment Course 2025', slug: 'psir-value-enrichment-2025' },
      { label: 'Mentorship Program', slug: 'mentorship-program' },
    ];
  }

  const BulletArrow = () => (
    <img
      src="/assets/arrow.png"
      alt="arrow"
      className="w-[22px] h-[22px] object-contain shrink-0"
    />
  );

  return (
    <>
      <header
        ref={headerRef}
        className="absolute top-0 left-0 right-0 z-50 mx-auto w-full bg-transparent py-6 lg:py-4 px-4 md:px-6 lg:px-8 xl:px-12 font-['Montserrat']"
      >
        <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center relative">
          <div className="flex items-center cursor-pointer" onClick={() => (window.location.href = '/')}>
            <Image
              src="/assets/40_years_experience.png"
              alt="40 Years of Excellence"
              width={58}
              height={58}
              className="h-10 md:h-12 lg:h-[58px] object-contain hidden md:block transition-transform hover:scale-105 mr-1 md:mr-1.5"
              style={{ width: '58px', height: '58px' }}
            />
            <div className="w-[1px] md:w-[2px] h-8 md:h-10 lg:h-[48px] bg-[#FF6B00] hidden md:block"></div>
            <Image
              src="/assets/Logo.png"
              alt="SRIRAM's IAS"
              width={250}
              height={68}
              className="h-10 md:h-12 lg:h-[68px] object-contain transition-transform hover:scale-105 -ml-1.5 md:-ml-4"
            />
          </div>

          <div className="flex flex-col items-end lg:items-start gap-3 relative">
            <div className="hidden lg:flex items-center gap-3 text-[16px] font-medium leading-[100%] tracking-normal uppercase text-white/80 ml-[-8px]">
              <a
                href="/blogs"
               className="hover:text-white px-3 py-2 rounded-[6px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase text-white/80 font-bold cursor-pointer"
              >
                BLOG
              </a>

             <div className="relative" ref={centersButtonRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCentersOpen((prev) => {
                    if (!prev) {
                      setIsCoursesOpen(false);
                      setIsFreeResourcesOpen(false);
                    }
                    return !prev;
                  });
                }}
                className={`uppercase px-3 py-2 rounded-[6px] transition-all duration-300 hover:text-white text-[14px] xl:text-[14px] text-white/80 font-bold cursor-pointer ${
                  isCentersOpen ? 'text-white' : ''
                }`}
              >
                OUR CENTERS
              </button>
            </div>

             <a
              href="/about"
              className="px-3 py-2 rounded-[6px] transition-all duration-300 hover:text-white active:bg-transparent focus:bg-transparent text-[14px] xl:text-[14px] uppercase text-white/80 font-bold cursor-pointer"
            >
              About us
            </a>

              <div className="relative" ref={langRef}>
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-white px-3 py-2 rounded-[4px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase text-white/80 font-bold"
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
                  <ChevronDown size={12} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </div>

                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 ">
                    {['English', 'Telugu', 'Hindi', 'Marathi'].map((lang) => (
                      <div
                        key={lang}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary cursor-pointer transition-colors font-medium "
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

              <div className="flex items-center gap-2 border rounded-[10px] px-3 py-2.5" style={{ borderColor: '#1897D8' }}>
                <span className="text-white font-semibold text-[16px] leading-[100%] tracking-normal font-[Montserrat] xl:text-[14px] uppercase">
                  +91 8686818384
                </span>
              </div>

             <button
              onClick={() => setIsBookDemoOpen(true)}
              className="text-white font-bold px-3 py-2.5 rounded-[10px] transition-all duration-300 text-[14px] xl:text-[14px] uppercase bg-transparent hover:bg-transparent shadow-none"
            >
              BOOK FREE DEMO
            </button>
            <div
                onClick={() => setIsSearchOpen(true)}
                className="w-[32px] h-[32px] bg-[#FFFFFF40] rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
              >
                <Image src="/assets/Search-Icon.svg" alt="search" width={20} height={20} />
              </div>

              <Link href="/login" aria-label="Login" className="flex items-center justify-center cursor-pointer ml-0">
                <svg width="30" height="30" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.6368 10.4727C19.6368 11.8615 19.0851 13.1934 18.1031 14.1754C17.1211 15.1574 15.7892 15.7091 14.4004 15.7091C13.0117 15.7091 11.6798 15.1574 10.6978 14.1754C9.71575 13.1934 9.16406 11.8615 9.16406 10.4727C9.16406 9.08397 9.71575 7.75208 10.6978 6.77007C11.6798 5.78806 13.0117 5.23638 14.4004 5.23638C15.7892 5.23638 17.1211 5.78806 18.1031 6.77007C19.0851 7.75208 19.6368 9.08397 19.6368 10.4727ZM17.0186 10.4727C17.0186 11.1671 16.7428 11.8331 16.2518 12.3241C15.7608 12.8151 15.0948 13.0909 14.4004 13.0909C13.706 13.0909 13.0401 12.8151 12.5491 12.3241C12.0581 11.8331 11.7822 11.1671 11.7822 10.4727C11.7822 9.77836 12.0581 9.11241 12.5491 8.62141C13.0401 8.1304 13.706 7.85456 14.4004 7.85456C15.0948 7.85456 15.7608 8.1304 16.2518 8.62141C16.7428 9.11241 17.0186 9.77836 17.0186 10.4727Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.4 0C6.44727 0 0 6.44727 0 14.4C0 22.3527 6.44727 28.8 14.4 28.8C22.3527 28.8 28.8 22.3527 28.8 14.4C28.8 6.44727 22.3527 0 14.4 0ZM2.61818 14.4C2.61818 17.136 3.55156 19.6547 5.11593 21.655C6.21483 20.2125 7.6322 19.0435 9.25742 18.2392C10.8826 17.4349 12.6717 17.017 14.4851 17.0182C16.2751 17.0161 18.042 17.4228 19.6509 18.2073C21.2599 18.9918 22.6684 20.1334 23.7692 21.545C24.9034 20.0574 25.6671 18.321 25.9971 16.4796C26.3271 14.6382 26.2138 12.7447 25.6667 10.9558C25.1196 9.16682 24.1543 7.53388 22.8508 6.19205C21.5473 4.85022 19.943 3.83807 18.1707 3.23936C16.3983 2.64064 14.5089 2.47257 12.6587 2.74906C10.8085 3.02554 9.05078 3.73862 7.5309 4.82931C6.01101 5.91999 4.7727 7.35692 3.91841 9.0212C3.06412 10.6855 2.61842 12.5293 2.61818 14.4ZM14.4 26.1818C11.6953 26.1862 9.07219 25.2557 6.97484 23.5479C7.81895 22.3391 8.94265 21.3522 10.2503 20.6711C11.5579 19.9901 13.0107 19.6351 14.4851 19.6364C15.941 19.6351 17.3763 19.9812 18.6715 20.6461C19.9668 21.3109 21.0848 22.2752 21.9325 23.4589C19.8189 25.2223 17.1526 26.1861 14.4 26.1818Z"
                    fill="white"
                  />
                </svg>
              </Link>
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
              <div className="p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all flex items-center justify-center">
                <Search size={18} className="md:w-5 md:h-5" />
              </div>
              <div className="cursor-pointer hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} className="md:w-7 md:h-7" />
              </div>
              <Link href="/login" aria-label="Login" className="cursor-pointer hover:text-primary transition-colors border-2 border-white rounded-full p-0.5 flex items-center justify-center">
                <User size={20} className="md:w-[22px] md:h-[22px]" />
              </Link>
            </div>

          <nav className="hidden lg:flex items-center gap-0 text-[16px] uppercase text-white/80 font-medium">
              <div className="relative group" ref={coursesButtonRef}>
               <button
  onClick={(e) => {
    e.stopPropagation();
    setIsCoursesOpen((prev) => {
      if (!prev) {
        setIsCentersOpen(false);
        setIsFreeResourcesOpen(false);
      }
      return !prev;
    });
  }}
  className={`flex items-center gap-1 transition-all duration-300 px-1 py-2 rounded-[6px] hover:text-white text-[14px] xl:text-[14px] uppercase text-white/80 font-bold cursor-pointer ${
    isCoursesOpen ? 'text-white' : ''
  }`}
>
  Courses
  <ChevronDown
    size={16}
    className={`transition-transform duration-300 ${
      isCoursesOpen ? 'rotate-180' : ''
    }`}
  />
</button>
              </div>

           <div ref={freeResourcesMenuRef} className="flex items-center cursor-pointer">
  <div className="flex items-center rounded-[6px] transition-all duration-300 cursor-pointer">

    <Link
      href="/free_resources/ncert-books"
      onClick={() => setIsFreeResourcesOpen(false)}
      className={`pl-3 pr-1 py-2 uppercase text-[14px] xl:text-[14px] font-bold active:bg-transparent focus:bg-transparent ${
        isFreeResourcesOpen
          ? 'text-white'
          : 'text-white/80 hover:text-white'
      }`}
    >
      Free Resources
    </Link>

   <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFreeResourcesOpen((prev) => {
      if (!prev) {
        setIsCoursesOpen(false);
        setIsCentersOpen(false);
      }
      return !prev;
    });
  }}
  className={`pr-2 pl-1 py-2 flex items-center justify-center cursor-pointer active:bg-transparent focus:bg-transparent ${
    isFreeResourcesOpen
      ? 'text-white'
      : 'text-white/80 hover:text-white'
  }`}
>
  <ChevronDown
    size={16}
    className={`transition-transform duration-300 ${
      isFreeResourcesOpen ? 'rotate-180' : ''
    }`}
  />
</button>

  </div>
</div>
            <div ref={currentAffairsMenuRef} className="flex items-center cursor-pointer">
  <div className="flex items-center rounded-[6px] transition-all duration-300 cursor-pointer">

    <Link
      href="/current-affairs"
      onClick={() => setIsCurrentAffairsOpen(false)}
      className={`pl-2 pr-1 py-2 uppercase text-[14px] xl:text-[14px] font-bold active:bg-transparent focus:bg-transparent ${
        isCurrentAffairsOpen
          ? 'text-white'
          : 'text-white/80 hover:text-white'
      }`}
    >
      Current Affairs
    </Link>

    <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCurrentAffairsOpen((prev) => {
      if (!prev) {
        setIsCoursesOpen(false);
        setIsCentersOpen(false);
        setIsFreeResourcesOpen(false);
      }
      return !prev;
    });
  }}
  className={`pr-3 pl-1 py-2 flex items-center justify-center cursor-pointer active:bg-transparent focus:bg-transparent ${
    isCurrentAffairsOpen
      ? 'text-white'
      : 'text-white/80 hover:text-white'
  }`}
>
  <ChevronDown
    size={16}
    className={`transition-transform duration-300 ${
      isCurrentAffairsOpen ? 'rotate-180' : ''
    }`}
  />
</button>

  </div>
</div>

              <Link
                href="/books"
                className="px-2.5 py-2 rounded-[6px] transition-all duration-300 hover:text-white text-[14px] xl:text-[14px] text-white/80 font-bold cursor-pointer"
              >
                Books
              </Link>

              <Link
                href="/toppers"
                className="px-2.5 py-2 rounded-[6px] transition-all duration-300 hover:text-white text-[14px] xl:text-[14px] text-white/80 font-bold cursor-pointer"
              >
                Our Toppers
              </Link>
            </nav>
          </div>
        </div>

        {isFreeResourcesOpen && (
          <div ref={freeResourcesDropdownRef} className="absolute top-full left-0 right-0 z-50 mt-4">
            <div className="w-full border-t border-b border-[#E9E9E9] bg-white/95 py-14">
              <div className="mx-auto w-full max-w-[1280px] px-10">
                <div className="grid grid-cols-4 gap-6">
                  <Link
                    href="/free_resources/ncert-books"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#E8F3C9]">
                      <BookOpen className="h-8 w-8 text-[#6E9331]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[18px] leading-[26px] font-semibold normal-case text-[#6E9331]">
                      NCERT Books
                    </h3>
                  </Link>

                  <Link
                    href="/free_resources/ncert-books"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#F7DDE0]">
                      <FileText className="h-8 w-8 text-[#C57A7E]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[17px] leading-[26px] font-semibold normal-case text-[#C57A7E] max-w-[210px]">
                      Previous Year Question Papers
                    </h3>
                  </Link>

                  <Link
                    href="/free_resources/ncert-books"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#E8F3C9]">
                      <ClipboardCheck className="h-8 w-8 text-[#6E9331]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[18px] leading-[26px] font-semibold normal-case text-[#6E9331]">
                      Free Mock Tests
                    </h3>
                  </Link>

                  <Link
                    href="/free_resources/ncert-books"
                    onClick={() => setIsFreeResourcesOpen(false)}
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1"
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
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1"
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
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1"
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
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1"
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
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1"
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
                    className="group h-[188px] rounded-[24px] bg-[#F8F8F8] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-5 transition-all duration-300 hover:-translate-y-1"
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
                  {courseList.slice(0, Math.ceil(courseList.length / 2)).map((course, i) => (
                    <Link
                      href={`/course/${course.slug}`}
                      key={`left-${i}`}
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
                  {courseList.slice(Math.ceil(courseList.length / 2)).map((course, i) => (
                    <Link
                      href={`/course/${course.slug}`}
                      key={`right-${i}`}
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
          className={`absolute top-full left-0 right-0 w-full mt-6 bg-[#F2F7F9] rounded-[32px] shadow-2xl border border-white/20 flex flex-col justify-center items-center overflow-hidden text-center cursor-default transform origin-top transition-all duration-300 z-50 min-h-[340px] ${
            isCentersOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          {isCentersOpen && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.2] mix-blend-darken pointer-events-none"
            >
              <source src="/assets/dropdown-video.mp4" type="video/mp4" />
            </video>
          )}

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-10">
            <h3
              className="text-xl font-[900] tracking-widest uppercase mb-10 font-['Montserrat']"
              style={{
                background: 'linear-gradient(90deg, #D47B83 0%, #908CAF 45%, #46A1D4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              OUR CENTERS
            </h3>

            <div className="flex gap-16 w-full justify-center items-center">
              <Link
                href="/centers/delhi"
                onClick={() => setIsCentersOpen(false)}
                className="flex flex-col items-center gap-5 w-[140px] hover:opacity-90 transition-opacity group"
              >
                <div className="w-[120px] h-[120px] bg-[#FDE9E8] rounded-[28px] flex justify-center items-center group-hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-[#AC6269]/10">
                  <Image
                    src="/assets/del-footer.png"
                    alt="New Delhi"
                    width={52}
                    height={52}
                    className="w-[52px] h-[52px] object-contain"
                  />
                </div>
                <span className="font-bold text-[#AC6269] text-[17px] font-['Montserrat'] whitespace-nowrap">
                  New Delhi
                </span>
              </Link>

              <Link
                href="/centers/hyderabad"
                onClick={() => setIsCentersOpen(false)}
                className="flex flex-col items-center gap-5 w-[140px] hover:opacity-90 transition-opacity group"
              >
                <div className="w-[120px] h-[120px] bg-[#EDFBE3] rounded-[28px] flex justify-center items-center group-hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-[#6F923B]/10">
                  <Image
                    src="/assets/hyd-footer.png"
                    alt="Hyderabad"
                    width={52}
                    height={52}
                    className="w-[52px] h-[52px] object-contain"
                  />
                </div>
                <span className="font-bold text-[#6F923B] text-[17px] font-['Montserrat'] whitespace-nowrap">
                  Hyderabad
                </span>
              </Link>

              <Link
                href="/centers/pune"
                onClick={() => setIsCentersOpen(false)}
                className="flex flex-col items-center gap-5 w-[140px] hover:opacity-90 transition-opacity group"
              >
                <div className="w-[120px] h-[120px] bg-[#EFEFFF] rounded-[28px] flex justify-center items-center group-hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-[#69699A]/10">
                  <Image
                    src="/assets/pune-footer.png"
                    alt="Pune"
                    width={52}
                    height={52}
                    className="w-[52px] h-[52px] object-contain"
                  />
                </div>
                <span className="font-bold text-[#69699A] text-[17px] font-['Montserrat'] whitespace-nowrap">
                  Pune
                </span>
              </Link>
            </div>
          </div>
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
            <a href="/free_resources" className="hover:text-primary transition-colors">Free Resources</a>
            <a href="/current-affairs" className="hover:text-primary transition-colors">Current Affairs</a>
            <a href="/books" className="hover:text-primary transition-colors">Books</a>
            <a href="/toppers" className="hover:text-primary transition-colors">Our Toppers</a>
            <a href="/blogs" className="hover:text-primary transition-colors">Blogs</a>
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
                  {['English', 'Telugu', 'Hindi', 'Marathi'].map((lang) => (
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