'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSubmitEnquiry } from '@/features/course/hooks/useCourses';
import {
  useEnquiryCenters,
  useEnquiryCourses,
} from '@/features/enquiry/hooks/useEnquiryLookups';
import DemoFormSelect from '@/components/common/DemoFormSelect';

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
  const { data: centersData } = useEnquiryCenters();
  const { mutateAsync: submitEnquiry, isPending } = useSubmitEnquiry();

  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const centers = centersData?.length ? centersData : fallbackCenters;
  const selectedCenter = centers.find((c) => c._id === form.centerId);

  // Real courses for the chosen center (no fake fallback — a placeholder course
  // would be rejected by the backend's course lookup).
  const { data: coursesData } = useEnquiryCourses(selectedCenter?.name);
  const courses = coursesData ?? [];

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

    if (!form.centerId) {
      setError('Please choose a center.');
      return;
    }

    if (!form.courseId) {
      setError('Please choose a course.');
      return;
    }

    const selectedCourse = courses.find((c) => c._id === form.courseId);

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

            {/* Center Dropdown */}
            <div className="space-y-0.5">
              <label className="ml-1 text-sm font-normal text-gray-400">
                Center
              </label>

              <DemoFormSelect
                value={form.centerId}
                onChange={(value) =>
                  setForm((f) => ({ ...f, centerId: value, courseId: '' }))
                }
                options={centers.map((center) => ({
                  value: center._id,
                  label: center.name,
                }))}
                placeholder="Choose center"
              />
            </div>

            {/* Course Dropdown */}
            <div className="space-y-0.5">
              <label className="ml-1 text-sm font-normal text-gray-400">
                Course
              </label>

              <DemoFormSelect
                value={form.courseId}
                onChange={(value) => setForm((f) => ({ ...f, courseId: value }))}
                options={courses.map((course) => ({
                  value: course._id,
                  label: course.title,
                }))}
                placeholder={
                  !selectedCenter
                    ? 'Select a center first'
                    : courses.length === 0
                      ? 'No courses available'
                      : 'Choose course'
                }
                disabled={!selectedCenter || courses.length === 0}
              />
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