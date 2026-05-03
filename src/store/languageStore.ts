"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const SUPPORTED_LANGUAGES = ["en", "hi"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
};

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "sriram_language",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
