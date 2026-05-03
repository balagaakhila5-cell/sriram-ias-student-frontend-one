'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCenters, useCourses, useSubmitEnquiry } from '@/features/course/hooks/useCourses';

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
  const { data: centers } = useCenters();
  const { data: courses } = useCourses();
  const { mutateAsync: submitEnquiry, isPending } = useSubmitEnquiry();

  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (field: keyof FormState) =>
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

    const selectedCourse = courses?.find((c) => c._id === form.courseId);
    const selectedCenter = centers?.find((c) => c._id === form.centerId);

    try {
      const res = await submitEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        course: form.courseId || undefined,
        center: form.centerId || undefined,
        courseTitle: selectedCourse?.title ?? defaultCourseTitle,
        centerName: selectedCenter?.name ?? defaultCenterName,
      });
      setSuccess(res.message ?? 'Enquiry submitted. We will reach out soon.');
      setForm(initialState);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit enquiry.';
      setError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col md:flex-row min-h-[500px]">
        <div className="hidden md:block md:w-[45%] relative">
          <img
            src="/assets/modal-img-1.png"
            alt="Sriram's IAS"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-6 md:p-10 flex flex-col justify-center bg-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full text-gray-400 transition-colors z-20"
          >
            <X size={20} />
          </button>

          <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Enquiry Form</h2>
            <span className="text-2xl">📋</span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-normal ml-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                required
                className="w-full bg-[#E0F2F9] border-none rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-[#20A0E0] outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-normal ml-1">Mobile Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                required
                className="w-full bg-[#E0F2F9] border-none rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-[#20A0E0] outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-normal ml-1">Email ID</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
                className="w-full bg-[#E0F2F9] border-none rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-[#20A0E0] outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-normal ml-1">Course</label>
              <div className="relative">
                <select
                  value={form.courseId}
                  onChange={handleChange('courseId')}
                  className="w-full bg-[#E0F2F9] border-none rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-[#20A0E0] outline-none appearance-none transition-all cursor-pointer text-gray-600"
                >
                  <option value="">Choose course</option>
                  {courses?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-normal ml-1">Center</label>
              <div className="relative">
                <select
                  value={form.centerId}
                  onChange={handleChange('centerId')}
                  className="w-full bg-[#E0F2F9] border-none rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-[#20A0E0] outline-none appearance-none transition-all cursor-pointer text-gray-600"
                >
                  <option value="">Choose center</option>
                  {centers?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full text-white font-medium py-3 rounded-xl shadow-md hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(90deg, #37B6E9 0%, #0077B6 100%)' }}
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
