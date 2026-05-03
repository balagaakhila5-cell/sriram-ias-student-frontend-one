"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { setStoredToken, TOKEN_STORAGE_KEY } from "@/services/apiClient";
import type { AuthUser } from "@/features/auth/types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  setHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,

      setAuth: (user, token) => {
        setStoredToken(token);
        set({ user, token, isAuthenticated: true });
      },

      clearAuth: () => {
        setStoredToken(null);
        set({ user: null, token: null, isAuthenticated: false });
      },

      setHydrated: (v) => set({ isHydrated: v }),
    }),
    {
      name: "sriram_auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          // Keep apiClient token store in sync on boot.
          if (typeof window !== "undefined") {
            window.localStorage.setItem(TOKEN_STORAGE_KEY, state.token);
          }
          state.isAuthenticated = true;
        }
        state?.setHydrated(true);
      },
    },
  ),
);
