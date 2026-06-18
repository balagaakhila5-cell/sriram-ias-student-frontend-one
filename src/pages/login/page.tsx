import Header from '@/components/common/Header';
import LoginPortal from '@/features/auth/components/LoginPortal';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <LoginPortal />
      </Suspense>
    </>
  );
}
