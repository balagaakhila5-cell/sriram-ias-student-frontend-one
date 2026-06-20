'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import {
  useCategories,
  useSubmitEnquiry,
} from '@/features/course/hooks/useCourses';
import {
  useEnquiryCenters,
  useEnquiryCourses,
} from '@/features/enquiry/hooks/useEnquiryLookups';
import DemoFormSelect from '@/components/common/DemoFormSelect';
import {
  fallbackCategories,
  fallbackCenters,
} from '@/features/course/data/demoFormOptions';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import type { Category, Center } from '@/features/course/services/coursesService';

interface BookFreeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'demo' | 'mentorship';
}

const demoInputClassName =
  'h-11 w-full rounded-full border-none bg-[#D7EEF7] px-5 py-2 text-center text-sm text-gray-800 outline-none placeholder:text-center placeholder:text-[#00000080] focus:ring-2 focus:ring-[#1897D8]/50';

const demoTextareaClassName =
  'w-full resize-none rounded-[28px] border-none bg-[#D7EEF7] px-5 py-2 text-center text-sm text-gray-800 outline-none placeholder:text-center placeholder:text-[#00000080] focus:ring-2 focus:ring-[#1897D8]/50';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  centerId: '',
  categoryId: '',
  courseId: '',
  targetYear: '',
  expectation: '',
};

function normalizeCenters(items: Center[]): Center[] {
  return items
    .map((item) => ({
      _id: item._id || (item as Center & { id?: string }).id || item.name,
      name: item.name,
    }))
    .filter((item) => item._id && item.name);
}

function normalizeCategories(items: Category[]): Category[] {
  return items
    .map((item) => ({
      _id: item._id || (item as Category & { id?: string }).id || item.name,
      name: item.name,
    }))
    .filter((item) => item._id && item.name);
}

const BookFreeDemoModal: React.FC<BookFreeDemoModalProps> = ({
  isOpen,
  onClose,
  variant = 'demo',
}) => {
  const isMentorship = variant === 'mentorship';
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: centersData = [], isError: centersError } = useEnquiryCenters();
  const { data: categoriesData = [], isError: categoriesError } = useCategories();

  const centers = useMemo(() => {
    const apiCenters = normalizeCenters(centersData);
    if (apiCenters.length && !centersError) return apiCenters;
    return fallbackCenters;
  }, [centersData, centersError]);

  const categories = useMemo(() => {
    const apiCategories = normalizeCategories(categoriesData);
    if (apiCategories.length && !categoriesError) return apiCategories;
    return fallbackCategories;
  }, [categoriesData, categoriesError]);

  const selectedCenter = useMemo(
    () => centers.find((c) => c._id === form.centerId),
    [centers, form.centerId],
  );
  // Courses come from the real public endpoint, filtered by the selected
  // center only (categoryName isn't usable publicly — see lookupService).
  const { data: courses = [], isFetching: coursesLoading } = useEnquiryCourses(
    selectedCenter?.name,
  );

  // Reset course when center/category changes
  useEffect(() => {
    setForm((prev) => ({ ...prev, courseId: '' }));
  }, [form.centerId, form.categoryId]);

  const centerOptions = useMemo(
    () => centers.map((center) => ({ value: center._id, label: center.name })),
    [centers],
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category._id,
        label: category.name,
      })),
    [categories],
  );

  const courseOptions = useMemo(
    () => courses.map((course) => ({ value: course._id, label: course.title })),
    [courses],
  );

  const targetYearOptions = ['2025', '2026', '2027', '2028'].map((year) => ({
    value: year,
    label: year,
  }));

  const submit = useSubmitEnquiry();
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!modalRef.current || prefersReducedMotion) return;

      gsap.fromTo(
        '.book-demo-backdrop',
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
      );

      gsap.fromTo(
        '.book-demo-modal-panel',
        { opacity: 0, scale: 0.95, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.05 },
      );

      gsap.fromTo(
        '.book-demo-bg-motion',
        { xPercent: -5, yPercent: -4, scale: 1.08 },
        {
          xPercent: 5,
          yPercent: 4,
          scale: 1.16,
          duration: 5.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          force3D: true,
        },
      );
    },
    { dependencies: [isOpen, prefersReducedMotion], scope: modalRef },
  );

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetAndClose = () => {
    setForm(initialForm);
    setError(null);
    setSuccess(false);
    submit.reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isMentorship && (!form.centerId || !form.courseId)) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const selectedCourse = courses.find((course) => course._id === form.courseId);

    const payload = isMentorship
      ? {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          targetYear: form.targetYear,
          expectation: form.expectation.trim(),
          courseTitle: 'Book Free 1:1 Mentorship Session',
          source: 'main' as const,
        }
      : {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          center: form.centerId,
          category: form.categoryId,
          course: form.courseId,
          centerName: selectedCenter?.name,
          courseTitle: selectedCourse?.title,
          targetYear: form.targetYear,
          expectation: form.expectation.trim(),
        };

    try {
      await submit.mutateAsync(payload);
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not submit your request. Please try again.',
      );
    }
  };

  return (
    <div ref={modalRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className={`book-demo-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm${prefersReducedMotion ? '' : ' opacity-0'}`}
        onClick={resetAndClose}
      />

      <div className={`book-demo-modal-panel relative z-10 flex max-h-[92vh] w-full max-w-[980px] min-h-0 overflow-y-auto overflow-x-hidden rounded-[24px] font-['Montserrat'] shadow-2xl md:max-h-[min(600px,92vh)]${prefersReducedMotion ? '' : ' opacity-0'}`}>
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[24px]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #20A0E0 0%, #1897D8 50%, #005B88 100%)',
            }}
            aria-hidden
          />
          <div className="book-demo-bg-motion absolute left-[-12%] top-[-12%] h-[124%] w-[124%] will-change-transform">
            <Image
              src="/assets/free-demo-bgs.png"
              alt=""
              fill
              sizes="980px"
              className="object-cover opacity-80"
              aria-hidden
            />
          </div>
        </div>

        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 z-20 text-gray-400 hover:text-gray-800 transition-colors bg-white/50 rounded-full p-1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="relative z-10 hidden w-[40%] items-center justify-center py-6 pl-4 md:flex">
          <div className="relative h-[430px] w-[320px]">
            <div className="absolute left-[8px] top-[12px] z-10 h-[158px] w-[146px] overflow-hidden rounded-[32px] bg-gray-200 shadow-lg">
              <Image src="/assets/why-choose/how-will-3.png" alt="Student writing" fill className="object-cover" />
            </div>
            <div className="absolute left-[108px] top-[6px] z-20 h-[186px] w-[176px] overflow-hidden rounded-[125px] bg-gray-200 shadow-md">
              <Image src="/assets/why-choose/how-will-1.png" alt="Students discussing" fill className="object-cover" />
            </div>
            <div className="absolute bottom-[3%] left-[calc(50%-18px)] z-30 h-[268px] w-[300px] -translate-x-1/2 overflow-hidden rounded-[240px] shadow-2xl">
              <Image src="/assets/why-choose/how-will-2.png" alt="Students reviewing notes" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex w-full flex-col justify-center p-6 md:w-[60%] md:p-8">
          <h2 className="mb-5 text-center text-xl font-bold text-black md:text-[22px]">
            {isMentorship ? 'Book Free 1:1 Mentorship Session' : 'Book Free Demo'}
          </h2>

          {success ? (
            <div className="text-center space-y-4">
              <p className="text-[18px] font-semibold text-green-700">
                Thanks! Your {isMentorship ? 'mentorship' : 'demo'} request has been received.
              </p>
              <p className="text-[14px] text-gray-600">
                Our team will reach out to you shortly.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="mt-2 inline-flex h-12 min-w-[180px] items-center justify-center rounded-[9999px] px-12 text-[16px] font-semibold text-white"
                style={{ background: 'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className={demoInputClassName}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    placeholder="Mobile Number"
                    className={demoInputClassName}
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className={demoInputClassName}
                />
              </div>

              {isMentorship ? (
                <div className="max-w-sm mx-auto w-full">
                  <DemoFormSelect
                    value={form.targetYear}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, targetYear: value }))
                    }
                    options={targetYearOptions}
                    placeholder="Target Year"
                    centerText
                  />
                </div>
              ) : (
                <>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1 min-w-0">
                  <DemoFormSelect
                    value={form.centerId}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, centerId: value }))
                    }
                    options={centerOptions}
                    placeholder="Choose Center"
                    centerText
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <DemoFormSelect
                    value={form.categoryId}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, categoryId: value }))
                    }
                    options={categoryOptions}
                    placeholder="Choose Category"
                    centerText
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="min-w-0 flex-[2]">
                  <DemoFormSelect
                    value={form.courseId}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, courseId: value }))
                    }
                    options={courseOptions}
                    placeholder={
                      !selectedCenter
                        ? 'Select a center first'
                        : coursesLoading && !courses.length
                          ? 'Loading courses...'
                          : courses.length === 0
                            ? 'No courses available'
                            : 'Choose Course'
                    }
                    disabled={
                      !selectedCenter ||
                      (coursesLoading && !courses.length) ||
                      courseOptions.length === 0
                    }
                    centerText
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <DemoFormSelect
                    value={form.targetYear}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, targetYear: value }))
                    }
                    options={targetYearOptions}
                    placeholder="Target Year"
                    centerText
                  />
                </div>
              </div>
                </>
              )}

              <div>
                <textarea
                  name="expectation"
                  value={form.expectation}
                  onChange={handleChange}
                  rows={2}
                  className={demoTextareaClassName}
                  placeholder={
                    isMentorship
                      ? 'What are your expectations from the mentorship session?'
                      : 'What are your expectation from the Course ?'
                  }
                />
              </div>

              {error && (
                <p className="text-center text-[14px] font-semibold text-red-600">
                  {error}
                </p>
              )}

              <div className="flex justify-center pt-1">
                <button
                  type="submit"
                  disabled={submit.isPending}
                  className="inline-flex h-12 min-w-[240px] items-center justify-center rounded-[9999px] px-12 text-[16px] font-semibold text-white shadow-[0px_4px_32px_0px_#0000001A] transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ background: 'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)' }}
                >
                  {submit.isPending ? 'Submitting...' : 'Book Your Session'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookFreeDemoModal;
