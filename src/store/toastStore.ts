"use client";

import { create } from "zustand";

export type ToastType = "success" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
}

const TOAST_DURATION_MS = 4000;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  showToast: (message, type = "success") => {
    const id = crypto.randomUUID();

    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    window.setTimeout(() => {
      get().dismissToast(id);
    }, TOAST_DURATION_MS);
  },

  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export function toast(message: string, type: ToastType = "success") {
  useToastStore.getState().showToast(message, type);
}
