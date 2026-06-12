"use client";

import React from "react";

interface AuthSuccessViewProps {
  title: string;
}

const AuthSuccessView: React.FC<AuthSuccessViewProps> = ({ title }) => (
  <div
    className="relative flex min-h-[295px] w-full items-center justify-center overflow-hidden rounded-[12px] px-6 py-10"
    style={{
      background:
        "radial-gradient(ellipse at center, #FFFFFF 0%, #EAF4FA 58%, #D6EAF5 100%)",
    }}
  >
    <div className="pointer-events-none absolute -right-10 -top-10 h-[180px] w-[180px] rounded-full bg-[#2A9FDB]/10" />
    <div className="pointer-events-none absolute -bottom-12 -left-8 h-[200px] w-[200px] rounded-full bg-[#15658D]/8" />

    <div className="relative z-10 flex flex-col items-center justify-center">
      <div className="mb-7 flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#3eb846] bg-white shadow-[0_8px_24px_rgba(62,184,70,0.18)]">
        <svg
          width="58"
          height="58"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3eb846"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h2 className="text-center text-[20px] font-extrabold uppercase tracking-[0.5px] text-[#08b80d]">
        {title}
      </h2>
    </div>
  </div>
);

export default AuthSuccessView;
