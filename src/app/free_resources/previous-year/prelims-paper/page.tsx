'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { ChevronDown } from 'lucide-react';

import {
  findCategoryByKey,
  findSubCategoryByName,
  useResourceCategories,
  useResourceFiles,
  useResourceFilters,
  useResourceSubCategories,
} from '@/features/resources/hooks/useResources';

function CustomDropdown({
  placeholder, options, value, onChange,
}: {
  placeholder: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full md:w-[300px]">
      <button type="button" onClick={() => setOpen(p => !p)}
        className="flex h-[56px] w-full items-center justify-between rounded-[22px] bg-[#E8ECFA] px-7 text-[18px] font-semibold text-black shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
        <span>{value || placeholder}</span>
        <ChevronDown size={22} className="text-black" />
      </button>
      {open && (
        <div className="absolute left-0 top-[68px] z-50 w-full rounded-[22px] bg-[#E8ECFA] py-4 shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
          {options.length === 0 && (
            <p className="px-6 py-3 text-center text-[15px] text-[#666]">No options</p>
          )}
          {options.map(o => (
            <button key={o} type="button" onClick={() => { onChange(o); setOpen(false); }}
              className="block w-full px-6 py-3 text-center text-[17px] font-semibold text-black transition-colors hover:bg-[#dce3fb]">
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PrelimsPaperPage() {
  const [selectedPaper, setSelectedPaper] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<{ paperId?: string; yearId?: string }>({});

  const { data: categories } = useResourceCategories();
  const pyqCategory = useMemo(() => findCategoryByKey(categories, 'PYQ'), [categories]);
  const categoryId = pyqCategory?._id;

  const { data: subCategories } = useResourceSubCategories(categoryId);
  const subCategory = useMemo(
    () => findSubCategoryByName(subCategories, 'prelims'),
    [subCategories],
  );
  const subCategoryId = subCategory?._id;

  const { data: allPapers = [] } = useResourceFilters(
    { type: 'PAPER', categoryId },
    !!categoryId,
  );
  const papers = useMemo(() => {
    if (!subCategoryId) return [];
    const filtered = allPapers.filter((p) => {
      const sub = p.subCategory;
      const subId = typeof sub === 'string' ? sub : (sub as { _id?: string } | undefined)?._id;
      return !subId || subId === subCategoryId;
    });
    return filtered.filter((p, i, arr) => arr.findIndex((x) => x.value === p.value) === i);
  }, [allPapers, subCategoryId]);
  const { data: years = [] } = useResourceFilters(
    { type: 'YEAR', categoryId },
    !!categoryId,
  );

  const paperId = useMemo(
    () => papers.find((p) => p.value === selectedPaper)?._id,
    [papers, selectedPaper],
  );
  const yearId = useMemo(
    () => years.find((y) => y.value === selectedYear)?._id,
    [years, selectedYear],
  );

  const { data: files = [], isFetching } = useResourceFiles(
    {
      categoryId,
      subCategoryId,
      paperId: appliedFilters.paperId,
      yearId: appliedFilters.yearId,
    },
    !!categoryId && !!subCategoryId && (!!appliedFilters.paperId || !!appliedFilters.yearId),
  );

  return (
    <>
      <Header />
      <main className="bg-[#f7f7f7] font-['Montserrat',sans-serif]">
        <section className="relative h-[320px] w-full overflow-hidden md:h-[400px] lg:h-[470px]">
          <Image src="/assets/free-resources/previous-year/previous-year.png" alt="Previous Year Banner" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_15.33%,rgba(0,0,0,0.1)_50.97%)]" />
        </section>

        <section className="bg-[#f7f7f7] px-6 py-12 lg:px-16 lg:py-14">
          <div className="mx-auto max-w-[1500px]">
            <h1 className="mb-10 text-center text-[52px] font-extrabold uppercase leading-[0.95] md:text-[62px] lg:text-[74px]">
              <span className="bg-[linear-gradient(90deg,#D57E89_0%,#9A8FB6_40%,#3E9CDB_100%)] bg-clip-text text-transparent">
                PRELIMS QUESTION PAPERS
              </span>
            </h1>

            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_340px]">
              <div>
                <div className="mb-10 flex flex-col items-center gap-5">
                  <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
                    <CustomDropdown placeholder="Select Paper" options={papers.map(p => p.value)} value={selectedPaper} onChange={setSelectedPaper} />
                    <CustomDropdown placeholder="Year" options={years.map(y => y.value)} value={selectedYear} onChange={setSelectedYear} />
                  </div>
                  <button
                    onClick={() => setAppliedFilters({ paperId, yearId })}
                    disabled={!paperId && !yearId}
                    className="h-[50px] min-w-[185px] rounded-full px-10 text-[18px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ background: 'linear-gradient(90deg, #1699E0 0%, #032B3F 100%)' }}>
                    Search
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {isFetching && (
                    <p className="col-span-full text-center text-[16px] text-[#555]">Loading...</p>
                  )}
                  {!isFetching && files.length === 0 && (appliedFilters.paperId || appliedFilters.yearId) && (
                    <p className="col-span-full text-center text-[16px] text-[#555]">No papers found.</p>
                  )}
                  {files.map((paper) => (
                    <div
                      key={paper._id}
                      className="rounded-[16px] bg-[#F3EFE8] px-5 py-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 origin-bottom-left hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#FEF2E5] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center">
                          <img
                            src="/assets/free-resources/previous-year/Pdf-img.png"
                            alt="PDF"
                            style={{ width: '82px', height: '82px', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[18px] font-bold leading-[1.3] text-[#161616]">{paper.title}</h3>
                          <div className="mt-4 flex flex-wrap gap-3">
                            <a href={paper.fileUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="rounded-[8px] border border-[#63B8ED] px-5 py-2 font-semibold text-[#56ADE9] transition-all duration-300 hover:bg-linear-to-r hover:from-[#6CC0ED] hover:to-[#2B5872] hover:text-white">View</a>
                            <a href={paper.fileUrl ?? '#'} download className="rounded-[8px] border border-[#63B8ED] px-5 py-2 font-semibold text-[#56ADE9] transition-all duration-300 hover:bg-linear-to-r hover:from-[#6CC0ED] hover:to-[#2B5872] hover:text-white">Download PDF</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="ml-auto flex w-full max-w-[340px] flex-col items-end gap-6">
                <div className="w-full rounded-[22px] bg-white p-4 shadow-md">
                  <h2 className="mb-4 text-center text-[30px] font-extrabold">
                    <span className="bg-[linear-gradient(90deg,#4D90D2,#B57B95)] bg-clip-text text-transparent">Courses</span>
                  </h2>
                  <div className="relative overflow-hidden rounded-[16px]">
                    <Image src="/assets/free-resources/previous-year/mains-paper/Course card.png" alt="Course card" width={400} height={400} className="h-auto w-full object-cover" />
                  </div>
                </div>

                <div className="w-full rounded-[22px] bg-[#DCE8FB] px-5 py-6 shadow-md">
                  <h3 className="text-center text-[21px] font-extrabold leading-[1.35]">
                    <span className="text-[#3A91D1]">UPSC Prelims 2026 </span>
                    <span className="text-[#D47D86]">Examination</span>
                  </h3>
                  <p className="mt-1 text-center text-[19px] font-bold text-[#7E82A8]">Countdown</p>
                  <div className="mt-5 grid grid-cols-4 gap-3">
                    {[{ value: '360', label: 'DAYS' }, { value: '24', label: 'HOURS' }, { value: '60', label: 'MINUTES' }, { value: '60', label: 'SECONDS' }].map(item => (
                      <div key={item.label} className="rounded-[10px] bg-[#07172D] px-2 py-4 text-center text-white">
                        <div className="text-[20px] font-extrabold leading-none">{item.value}</div>
                        <div className="mt-2 text-[10px] font-extrabold uppercase tracking-wide text-[#A5DEFF]">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 w-full rounded-full py-4 text-[16px] font-bold text-white" style={{ background: 'linear-gradient(90deg, #1699E0 0%, #032B3F 100%)' }}>
                    View Complete Schedule
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
