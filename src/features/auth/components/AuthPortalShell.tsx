'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Users, UserRound } from 'lucide-react';

export type UserRole = 'student' | 'parent' | 'faculty';

interface AuthPortalShellProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  loginMode: boolean;
  title: string;
  children: React.ReactNode;
}

const roles: {
  id: UserRole;
  label: (loginMode: boolean) => string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'student',
    label: (loginMode) => (loginMode ? 'Student' : 'Student Login'),
    icon: <GraduationCap className="h-7 w-7" strokeWidth={2} />,
  },
  {
    id: 'parent',
    label: (loginMode) => (loginMode ? 'Parent' : 'Parent Login'),
    icon: <Users className="h-7 w-7" strokeWidth={2} />,
  },
  {
    id: 'faculty',
    label: (loginMode) => (loginMode ? 'Faculty / Employee' : 'Faculty Login'),
    icon: <UserRound className="h-7 w-7" strokeWidth={2} />,
  },
];

const AuthPortalShell: React.FC<AuthPortalShellProps> = ({
  activeRole,
  onRoleChange,
  loginMode,
  title,
  children,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }
    router.push('/');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-['Montserrat']" style={{ background: 'radial-gradient(ellipse at top, #0F2030 0%, #050B11 70%)' }}>
      <div className="relative z-10 flex min-h-screen items-start justify-center px-4 pb-12 pt-24 md:pt-28 lg:pt-[112px]">
        <div className="relative w-full max-w-[1067px] overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="absolute right-5 top-5 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[24px] font-semibold leading-none text-black shadow hover:bg-white"
          >
            ×
          </button>
          <div className="grid min-h-[476px] grid-cols-1 lg:grid-cols-[315px_1fr]">
            <aside className="flex flex-col gap-2 p-6 md:p-8">
              {roles.map((role) => {
                const isActive = role.id === activeRole;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => onRoleChange(role.id)}
                    className={`flex items-center gap-4 rounded-[8px] px-4 py-4 text-left transition-all duration-200 ${
                      isActive
                        ? 'shadow-sm'
                        : 'hover:bg-gray-50'
                    }`}
                    style={
                      isActive
                        ? {
                            background:
                              'linear-gradient(90deg, rgba(0,159,238,0.24) 34.5%, rgba(0,91,136,0.30) 100%)',
                          }
                        : undefined
                    }
                  >
                    <span className="text-[#1B1B1B]">{role.icon}</span>
                    <span className="text-[16px] font-semibold text-[#28769D]">
                      {role.label(loginMode)}
                    </span>
                  </button>
                );
              })}
            </aside>

            <section
              className="relative flex flex-col items-center justify-center px-6 py-10 md:px-12"
              style={{
                background:
                  'radial-gradient(ellipse at center, #FFFFFF 0%, #EAF4FA 60%, #D6EAF5 100%)',
              }}
            >
              <div className="relative z-10 flex w-full max-w-[445px] flex-col items-center">
                <Link
                  href="/"
                  className="mb-5 flex h-[40px] w-[212px] items-center justify-center"
                  aria-label="Go to home"
                >
                  <Image
                    src="/assets/SRIRAM's-IAS.png"
                    alt="SRIRAM's IAS"
                    width={212}
                    height={40}
                    className="h-auto w-full object-contain"
                    priority
                  />
                </Link>
                {title ? (
                  <h2 className="mb-8 text-[16px] font-semibold text-black">
                    {title}
                  </h2>
                ) : null}

                <div className="flex w-full flex-col gap-5">{children}</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPortalShell;
