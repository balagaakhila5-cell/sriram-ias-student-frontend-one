'use client';

import { Loader2 } from 'lucide-react';

export default function BlogDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-10 space-y-4">
        <div className="h-12 w-4/5 max-w-[720px] rounded bg-slate-200" />
        <div className="flex flex-wrap gap-4">
          <div className="h-5 w-24 rounded bg-slate-200" />
          <div className="h-5 w-28 rounded bg-slate-200" />
          <div className="h-5 w-32 rounded bg-slate-200" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-7 w-20 rounded-full bg-slate-200" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[255px_minmax(0,1fr)]">
        <div className="hidden h-[320px] rounded-[12px] bg-slate-200 xl:block" />
        <div className="space-y-8">
          <div className="h-[440px] rounded-[10px] bg-slate-200" />
          <div className="space-y-3">
            <div className="h-6 w-1/3 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-4/5 rounded bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_335px]">
            <div className="h-[280px] rounded-[10px] bg-slate-200" />
            <div className="hidden h-[420px] rounded-[10px] bg-slate-200 xl:block" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3 text-[#246392] xl:hidden">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        <span className="text-sm font-semibold">Loading blog details…</span>
      </div>
    </div>
  );
}
