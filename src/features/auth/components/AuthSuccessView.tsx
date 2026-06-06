"use client";

import React from "react";

interface AuthSuccessViewProps {
  title: string;
}

const AuthSuccessView: React.FC<AuthSuccessViewProps> = ({ title }) => (
  <div
    className="relative flex min-h-[295px] w-full items-center justify-center overflow-hidden rounded-[8px] px-6 py-10"
    style={{
      backgroundImage: `
        radial-gradient(circle at 100% 20%, rgba(252,232,187,0.75) 0%, rgba(252,232,187,0.45) 35%, transparent 56%),
        radial-gradient(circle at 80% 100%, rgba(242,216,155,0.45) 0%, rgba(242,216,155,0.35) 36%, transparent 60%),
        linear-gradient(120deg, #ffffff 0%, #fffdf7 45%, #fff1cd 100%)
      `,
    }}
  >
    <div className="absolute bottom-0 right-0 h-[170px] w-[430px] rounded-tl-[100%] bg-[#f5d58a]/30" />

    <div className="relative z-10 flex flex-col items-center justify-center">
      <div className="mb-7 flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#3eb846]">
        <svg
          width="58"
          height="58"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3eb846"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
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
