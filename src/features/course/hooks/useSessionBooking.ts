'use client';

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

export type SessionBookingResult =
  | { ok: true }
  | { ok: false; message: string };

export function useSessionBooking(options?: { courseTitle?: string }) {
  const { data: centers = [] } = useCenters();
  const submit = useSubmitEnquiry();

  const bookSession = async (
    formData: SessionFormData,
    city: string,
    authorized: boolean,
  ): Promise<SessionBookingResult> => {
    if (
      !formData.fullName.trim() ||
      !formData.mobile.trim() ||
      !formData.email.trim() ||
      !formData.targetYear
    ) {
      return { ok: false, message: 'Please fill in all fields.' };
    }

    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      return { ok: false, message: 'Please enter a valid 10-digit mobile number.' };
    }

    if (!authorized) {
      return { ok: false, message: 'Please authorize us to contact you.' };
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
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        message:
          err instanceof Error
            ? err.message
            : 'Could not book your session. Please try again.',
      };
    }
  };

  return {
    bookSession,
    isPending: submit.isPending,
  };
}
