'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSubmitEnquiry } from '@/features/course/hooks/useCourses';
import { useEnquiryCourses } from '@/features/enquiry/hooks/useEnquiryLookups';
import CourseCenterSelect from '@/components/common/CourseCenterSelect';
import DemoFormSelect from '@/components/common/DemoFormSelect';
import type { CourseCenter } from '@/features/enquiry/hooks/useCourseCenters';
import { toast } from '@/store/toastStore';

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

const EnquiryFormModal: React.FC<EnquiryFormModalProps> = ({
  isOpen,
  onClose,
  defaultCourseTitle,
  defaultCenterName,
}) => {
  const { mutateAsync: submitEnquiry, isPending } = useSubmitEnquiry();

  const [form, setForm] = useState<FormState>(initialState);
  const [selectedCenter, setSelectedCenter] = useState<CourseCenter | undefined>();
  const [error, setError] = useState<string | null>(null);

  const { data: coursesData } = useEnquiryCourses(selectedCenter?.centerName, {
    enabled: isOpen,
  });
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
        centerName: selectedCenter?.centerName ?? defaultCenterName,
      });

      const message =
        res.message ?? 'Enquiry submitted. We will reach out soon.';

      setForm(initialState);
      setSelectedCenter(undefined);
      toast(message, 'success');
      onClose();
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
                className="h-11 w-full rounded-[9999px] border-none bg-[#E0F2F9] px-5 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#20A0E0]"
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
                className="h-11 w-full rounded-[9999px] border-none bg-[#E0F2F9] px-5 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#20A0E0]"
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
                className="h-11 w-full rounded-[9999px] border-none bg-[#E0F2F9] px-5 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#20A0E0]"
              />
            </div>

            <CourseCenterSelect
              value={form.centerId}
              enabled={isOpen}
              onChange={(centerId, center) => {
                setForm((f) => ({ ...f, centerId, courseId: '' }));
                setSelectedCenter(center);
              }}
              labelClassName="ml-1 text-sm font-normal text-gray-400"
              placeholder="Choose center"
            />

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

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex h-12 w-full items-center justify-center rounded-[9999px] text-sm font-semibold text-white shadow-md transition-all hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
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