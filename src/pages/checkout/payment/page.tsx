'use client';

import { useEffect } from 'react';
import { useRouter } from '@/lib/appRouter';

export default function PaymentPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/checkout?step=payment');
  }, [router]);

  return null;
}
