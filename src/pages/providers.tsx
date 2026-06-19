'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLayoutEffect, type ReactNode } from "react";
import ToastContainer from "@/components/common/ToastContainer";
import SiteSectionScope from "@/components/common/SiteSectionScope";
import { useCartStore } from "@/store/cartStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 0,
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  useLayoutEffect(() => {
    if (!useCartStore.persist.hasHydrated()) {
      void useCartStore.persist.rehydrate();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteSectionScope />
      {children}
      <ToastContainer />
    </QueryClientProvider>
  );
}
