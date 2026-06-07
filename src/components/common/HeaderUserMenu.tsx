"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import type { ServerRole } from "@/features/auth/types";

function getProfileRoute(role: ServerRole): string {
  if (role === "parent") return "/parent/course-details";
  return "/student/profile";
}

const HeaderUserMenu: React.FC = () => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!isHydrated) {
    return (
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white/40">
        <User size={18} className="text-white/60" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Link
        href="/login"
        aria-label="Login"
        className="flex cursor-pointer items-center justify-center"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
    );
  }

  const initial = (user.name.trim()[0] ?? user.email?.[0] ?? "S").toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Open profile menu for ${user.name}`}
        className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white text-[13px] font-bold text-[#00679C] transition-colors hover:bg-white/90"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-[100] min-w-[180px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xl">
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-[#021C29]">
              {user.name}
            </p>
            <p className="truncate text-xs text-gray-500">
              {user.email ?? user.mobile}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              router.push(getProfileRoute(user.role));
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <User size={16} />
            My Profile
          </button>

          <button
            type="button"
            onClick={() => {
              clearAuth();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderUserMenu;
