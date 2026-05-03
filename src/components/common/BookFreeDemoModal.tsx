'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import {
  useCategories,
  useCenters,
  useCourses,
  useSubmitEnquiry,
} from '@/features/course/hooks/useCourses';

interface BookFreeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
  centerId: '',
  categoryId: '',
  courseId: '',
  targetYear: '2026',
  expectation: '',
};

const BookFreeDemoModal: React.FC<BookFreeDemoModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: centers = [] } = useCenters();
  const { data: categories = [] } = useCategories();

  const selectedCenter = useMemo(
    () => centers.find((c) => c._id === form.centerId),
    [centers, form.centerId],
  );
  const selectedCategory = useMemo(
    () => categories.find((c) => c._id === form.categoryId),
    [categories, form.categoryId],
  );

  const { data: courses = [], isFetching: coursesLoading } = useCourses(
    selectedCenter && selectedCategory
      ? { centerName: selectedCenter.name, categoryName: selectedCategory.name }
      : {},
  );

  // Reset course when center/category changes
  useEffect(() => {
    setForm((prev) => ({ ...prev, courseId: '' }));
  }, [form.centerId, form.categoryId]);

  const submit = useSubmitEnquiry();

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

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.centerId ||
      !form.categoryId ||
      !form.courseId
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await submit.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        center: form.centerId,
        category: form.categoryId,
        course: form.courseId,
        targetYear: form.targetYear,
        expectation: form.expectation,
      });
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not book your demo. Please try again.',
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={resetAndClose}
      />

      <div className="relative bg-white rounded-[32px] w-full max-w-[1300px] flex overflow-hidden shadow-2xl z-10 font-['Montserrat'] min-h-[600px] max-h-[95vh] overflow-y-auto">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/assets/free-demo-bgs.png"
            alt="Background styling"
            fill
            className="object-cover opacity-80"
          />
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

        <div className="w-[45%] relative z-10 hidden md:flex items-center justify-center pl-4 py-8">
          <div className="relative w-[380px] h-[480px]">
            <div className="absolute top-[30px] left-[10px] w-[170px] h-[170px] rounded-[35px] overflow-hidden shadow-lg z-10 bg-gray-200">
              <Image src="/assets/why-choose/how-will-3.png" alt="Student writing" fill className="object-cover" />
            </div>
            <div className="absolute top-[20px] right-[-20%] w-[275px] h-[248px] rounded-[132px] overflow-hidden shadow-md z-20 bg-gray-200">
              <Image src="/assets/why-choose/how-will-1.png" alt="Students discussing" fill className="object-cover" />
            </div>
            <div className="absolute bottom-[-10%] left-[30px] w-[400px] h-[300px] rounded-[300px] overflow-hidden shadow-2xl z-30">
              <Image src="/assets/why-choose/how-will-2.png" alt="Student thinking" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-[55%] p-10 md:p-14 relative z-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-8 text-black">
            Book Free Demo
          </h2>

          {success ? (
            <div className="text-center space-y-4">
              <p className="text-[18px] font-semibold text-green-700">
                Thanks! Your demo request has been received.
              </p>
              <p className="text-[14px] text-gray-600">
                Our team will reach out to you shortly.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="mt-2 inline-block text-white font-semibold text-[16px] px-8 py-3 rounded-full"
                style={{ background: 'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-[#00000080] font-medium mb-1.5 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#D7EEF7] border-none rounded-xl px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#1897D8]/50"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-[#00000080] font-medium mb-1.5 ml-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full bg-[#D7EEF7] border-none rounded-xl px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#1897D8]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#00000080] font-medium mb-1.5 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#D7EEF7] border-none rounded-xl px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#1897D8]/50"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 min-w-0">
                  <label className="block text-sm text-[#00000080] font-medium mb-1.5 ml-1">Center</label>
                  <div className="relative">
                    <select
                      name="centerId"
                      value={form.centerId}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#D7EEF7] border-none rounded-xl px-4 py-3 text-gray-800 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#1897D8]/50"
                    >
                      <option value="" disabled>Choose Center</option>
                      {centers.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-800">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <label className="block text-sm text-[#00000080] font-medium mb-1.5 ml-1">Category</label>
                  <div className="relative">
                    <select
                      name="categoryId"
                      value={form.categoryId}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#D7EEF7] border-none rounded-xl px-4 py-3 text-gray-800 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#1897D8]/50"
                    >
                      <option value="" disabled>Choose Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-800">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-[2] min-w-0">
                  <label className="block text-sm text-[#00000080] font-medium mb-1.5 ml-1">Course</label>
                  <div className="relative">
                    <select
                      name="courseId"
                      value={form.courseId}
                      onChange={handleChange}
                      required
                      disabled={!selectedCenter || !selectedCategory || coursesLoading}
                      className="w-full bg-[#D7EEF7] border-none rounded-xl px-4 py-3 text-gray-800 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#1897D8]/50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="" disabled>
                        {!selectedCenter || !selectedCategory
                          ? 'Select Center & Category first'
                          : coursesLoading
                            ? 'Loading courses...'
                            : courses.length === 0
                              ? 'No courses available'
                              : 'Choose Course'}
                      </option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>{c.title}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-800">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <label className="block text-sm text-[#00000080] font-medium mb-1.5 ml-1 truncate">Target Year For UPSC CSE</label>
                  <div className="relative">
                    <select
                      name="targetYear"
                      value={form.targetYear}
                      onChange={handleChange}
                      className="w-full bg-[#D7EEF7] border-none rounded-xl px-4 py-3 text-gray-800 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#1897D8]/50"
                    >
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-800">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#00000080] font-medium mb-1.5 ml-1">What are your expectation from the Course ?</label>
                <textarea
                  name="expectation"
                  value={form.expectation}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#D7EEF7] border-none rounded-xl px-4 py-3 text-gray-800 outline-none resize-none focus:ring-2 focus:ring-[#1897D8]/50"
                />
              </div>

              {error && (
                <p className="text-center text-[14px] font-semibold text-red-600">
                  {error}
                </p>
              )}

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={submit.isPending}
                  className="text-white font-semibold text-[18px] px-10 py-3.5 rounded-full shadow-[0px_4px_32px_0px_#0000001A] hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
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
