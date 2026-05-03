'use client';

import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  theme: "light" | "dark";
  isModalOpen: boolean;
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark") => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  theme: "light",
  isModalOpen: false,

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setTheme: (theme) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    set({ theme });
  },

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
