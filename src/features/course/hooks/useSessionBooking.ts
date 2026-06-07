'use client';

import { useState } from 'react';
import { useCenters, useSubmitEnquiry } from './useCourses';

export interface SessionFormData {
  fullName: string;
  mobile: string;
  email: string;
  targetYear: string;
}

const CENTER_NAME_BY_SLUG: Record<string, string> = {
  delhi: 'New Delhi',
  hyderabad: 'Hyderabad',
  pune: 'Pune',
};

export function normalizeCityToCenterName(city: string): string {
  const slug = city.trim().toLowerCase();

  if (CENTER_NAME_BY_SLUG[slug]) {
    return CENTER_NAME_BY_SLUG[slug];
  }

  if (slug === 'new delhi') {
    return 'New Delhi';
  }

  return city.trim();
}

export function useSessionBooking(options?: { courseTitle?: string }) {
  const { data: centers = [] } = useCenters();
  const submit = useSubmitEnquiry();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const bookSession = async (
    formData: SessionFormData,
    city: string,
    authorized: boolean,
  ): Promise<boolean> => {
    setError(null);
    setSuccess(false);

    if (
      !formData.fullName.trim() ||
      !formData.mobile.trim() ||
      !formData.email.trim() ||
      !formData.targetYear
    ) {
      setError('Please fill in all fields.');
      return false;
    }

    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      setError('Please enter a valid 10-digit mobile number.');
      return false;
    }

    if (!authorized) {
      setError('Please authorize us to contact you.');
      return false;
    }

    const centerName = normalizeCityToCenterName(city);
    const matchedCenter = centers.find(
      (center) => center.name.toLowerCase() === centerName.toLowerCase(),
    );

    try {
      await submit.mutateAsync({
        name: formData.fullName.trim(),
        phone: formData.mobile.trim(),
        email: formData.email.trim(),
        targetYear: formData.targetYear,
        center: matchedCenter?._id,
        centerName,
        courseTitle: options?.courseTitle,
        expectation: 'One to one personalised session booking',
      });
      setSuccess(true);
      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not book your session. Please try again.',
      );
      return false;
    }
  };

  return {
    bookSession,
    error,
    success,
    setError,
    setSuccess,
    isPending: submit.isPending,
  };
}
