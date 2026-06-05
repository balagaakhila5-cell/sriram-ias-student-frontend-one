'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  useCenters,
  useCourses,
  useSubmitEnquiry,
} from '@/features/course/hooks/useCourses';

interface EnquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseTitle?: string;
  defaultCenterName?: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  courseId: string;
  centerId: string;
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  courseId: '',
  centerId: '',
};

/* Added course options */
const fallbackCourses = [
  { _id: 'gs-foundation', title: 'GS Foundation' },
  { _id: 'mentorship', title: 'Mentorship' },
  { _id: 'optional-foundation', title: 'Optional Foundation' },
  { _id: 'test-series', title: 'Test Series' },
  { _id: 'csat', title: 'CSAT' },
  { _id: 'enrichment-course', title: 'Enrichment Course' },
];

/* Added center options */
const fallbackCenters = [
  { _id: 'new-delhi', name: 'New Delhi' },
  { _id: 'hyderabad', name: 'Hyderabad' },
  { _id: 'pune', name: 'Pune' },
];

const EnquiryFormModal: React.FC<EnquiryFormModalProps> = ({
  isOpen,
  onClose,
  defaultCourseTitle,
  defaultCenterName,
}) => {
  const { data: centersData } = useCenters();
  const { data: coursesData } = useCourses();
  const { mutateAsync: submitEnquiry, isPending } = useSubmitEnquiry();

  /*
    If backend courses/centers are available, it uses backend data.
    If backend data is empty, it shows fallback static options.
  */
  const courses = coursesData?.length ? coursesData : fallbackCourses;
  const centers = centersData?.length ? centersData : fallbackCenters;

  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError('Please fill in name, phone, and email.');
      return;
    }

    if (!form.courseId) {
      setError('Please choose a course.');
      return;
    }

    if (!form.centerId) {
      setError('Please choose a center.');
      return;
    }

    const selectedCourse = courses.find((c) => c._id === form.courseId);
    const selectedCenter = centers.find((c) => c._id === form.centerId);

    try {
      const res = await submitEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        course: form.courseId,
        center: form.centerId,
        courseTitle: selectedCourse?.title ?? defaultCourseTitle,
        centerName: selectedCenter?.name ?? defaultCenterName,
      });

      setSuccess(res.message ?? 'Enquiry submitted. We will reach out soon.');
      setForm(initialState);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to submit enquiry.';
      setError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl duration-300 animate-in fade-in zoom-in-95 md:max-h-[min(520px,90vh)] md:flex-row">
        <div className="relative hidden min-h-[280px] md:block md:w-[42%] md:min-h-0">
          <img
            src="/assets/modal-img-1.png"
            alt="Sriram's IAS"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="relative flex flex-1 flex-col bg-white p-5 md:p-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100"
          >
            <X size={20} />
          </button>

          <div className="mb-4 flex items-center justify-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
              Enquiry Form
            </h2>
            <span className="text-xl">📋</span>
          </div>

          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <div className="space-y-0.5">
              <label className="ml-1 text-sm font-normal text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                required
                className="h-9 w-full rounded-lg border-none bg-[#E0F2F9] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#20A0E0]"
              />
            </div>

            <div className="space-y-0.5">
              <label className="ml-1 text-sm font-normal text-gray-400">
                Mobile Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                required
                className="h-9 w-full rounded-lg border-none bg-[#E0F2F9] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#20A0E0]"
              />
            </div>

            <div className="space-y-0.5">
              <label className="ml-1 text-sm font-normal text-gray-400">
                Email ID
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
                className="h-9 w-full rounded-lg border-none bg-[#E0F2F9] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#20A0E0]"
              />
            </div>

            {/* Course Dropdown */}
            <div className="space-y-0.5">
              <label className="ml-1 text-sm font-normal text-gray-400">
                Course
              </label>

              <div className="relative">
                <select
                  value={form.courseId}
                  onChange={handleChange('courseId')}
                  required
                  className="h-9 w-full cursor-pointer appearance-none rounded-lg border-none bg-[#E0F2F9] px-3 py-2 text-sm text-gray-600 outline-none transition-all focus:ring-1 focus:ring-[#20A0E0]"
                >
                  <option value="">Choose course</option>

                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Center Dropdown */}
            <div className="space-y-0.5">
              <label className="ml-1 text-sm font-normal text-gray-400">
                Center
              </label>

              <div className="relative">
                <select
                  value={form.centerId}
                  onChange={handleChange('centerId')}
                  required
                  className="h-9 w-full cursor-pointer appearance-none rounded-lg border-none bg-[#E0F2F9] px-3 py-2 text-sm text-gray-600 outline-none transition-all focus:ring-1 focus:ring-[#20A0E0]"
                >
                  <option value="">Choose center</option>

                  {centers.map((center) => (
                    <option key={center._id} value={center._id}>
                      {center.name}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="h-10 w-full rounded-xl text-sm font-medium text-white shadow-md transition-all hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background:
                    'linear-gradient(90deg, #37B6E9 0%, #0077B6 100%)',
                }}
              >
                {isPending ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryFormModal;