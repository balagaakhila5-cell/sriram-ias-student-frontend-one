"use client";

import { useState } from "react";
import { UserRound } from "lucide-react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "Kotla Darshan",
    mobile: "9898989898",
    email: "darshan@gmail.com",
    parentName: "Kotla Lakshmana Rao",
    parentMobile: "6767676767",
  });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
  <div className="rounded-[24px] bg-[#EBF0FF] p-8 lg:p-10">

    {/* TOP RIGHT BUTTON */}
    <div className="flex justify-end">
      <button
        className="rounded-full px-6 py-2 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)]"
        style={{
          background:
            "linear-gradient(90deg, #00679C 0%, #002436 100%)",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        View ID
      </button>
    </div>

    {/* PROFILE */}
    <div className="mt-2 flex flex-col items-center gap-3">

      <span className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
        <UserRound
          size={56}
          className="text-[#1F7AB8]"
          strokeWidth={1.5}
        />
      </span>

      <h2 className="student-portal-heading text-[20px]! font-extrabold">
        KOTLA DARSHAN
      </h2>

      <p
        className="text-[18px] font-extrabold text-[#000000]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Mobile Number
      </p>
    </div>

    {/* FORM */}
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
    >

      <FormField
        label="Name"
        required
        value={form.name}
        onChange={update("name")}
      />

      <FormField
        label="Mobile Number"
        required
        value={form.mobile}
        onChange={update("mobile")}
      />

      <FormField
        label="Email ID"
        required
        value={form.email}
        onChange={update("email")}
      />

      <FormField
        label="Parent Name"
        required
        value={form.parentName}
        onChange={update("parentName")}
      />

      <FormField
        label="Parents Mobile Number"
        required
        value={form.parentMobile}
        onChange={update("parentMobile")}
      />

      {/* SAVE BUTTON */}
      <div className="md:col-span-2 mt-2 flex justify-center">

        <button
          type="submit"
          className="rounded-full px-12 py-3 text-[17px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)]"
          style={{
            background:
              "linear-gradient(90deg, #00679C 0%, #002436 100%)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Save
        </button>

      </div>
    </form>
  </div>
);
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({ label, required, value, onChange }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[16px] text-[#00000080] font-medium"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {label}
        {required && " *"}
      </span>
      <input
        value={value}
        onChange={onChange}
        className="h-[46px] w-full rounded-[10px] bg-[#D7E9F0] px-4 font-medium text-[16px] text-[#000000] outline-none focus:shadow-[0_0_0_2px_rgba(24,151,216,0.4)]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      />
    </label>
  );
}
