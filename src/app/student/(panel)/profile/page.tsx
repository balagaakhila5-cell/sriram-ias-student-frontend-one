"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, UserRound, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const PROFILE_PHOTO_INPUT_ID = "student-profile-photo-upload";

interface ProfileForm {
  name: string;
  mobile: string;
  email: string;
  parentName: string;
  parentMobile: string;
  address: string;
}

function profileDetailsKey(userId: string) {
  return `student-profile-details-${userId}`;
}

function profilePhotoKey(userId: string) {
  return `student-profile-photo-${userId}`;
}

function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  return /\.(jpe?g|png|gif|webp|bmp|heic|heif|avif|svg)$/i.test(file.name);
}

const emptyForm: ProfileForm = {
  name: "",
  mobile: "",
  email: "",
  parentName: "",
  parentMobile: "",
  address: "",
};

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [isReady, setIsReady] = useState(false);

  const displayName = useMemo(
    () => (form.name.trim() || user?.name || "Student").toUpperCase(),
    [form.name, user?.name],
  );

  const displaySubtitle = form.mobile.trim() || user?.mobile || form.email.trim() || user?.email || "Profile";

  const update =
    (key: keyof ProfileForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({
        ...f,
        [key]: e.target.value,
      }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      localStorage.setItem(profileDetailsKey(user.id), JSON.stringify(form));
      window.alert("Profile saved successfully.");
    } catch {
      window.alert("Could not save profile. Please try again.");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isImageFile(file)) {
      window.alert("Please choose a JPG, PNG, or other image file.");
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setProfilePhoto((current) => {
      if (current?.startsWith("blob:")) URL.revokeObjectURL(current);
      return previewUrl;
    });

    const reader = new FileReader();
    reader.onerror = () => {
      window.alert("Could not read the image. Please try another file.");
    };
    reader.onload = () => {
      if (typeof reader.result !== "string" || !user) return;
      try {
        localStorage.setItem(profilePhotoKey(user.id), reader.result);
      } catch {
        /* storage full — preview still works this session */
      }
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProfilePhoto((current) => {
      if (current?.startsWith("blob:")) URL.revokeObjectURL(current);
      return null;
    });
    if (user) localStorage.removeItem(profilePhotoKey(user.id));
  };

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    let savedDetails: Partial<ProfileForm> = {};
    try {
      const raw = localStorage.getItem(profileDetailsKey(user.id));
      if (raw) savedDetails = JSON.parse(raw) as Partial<ProfileForm>;
    } catch {
      /* ignore invalid saved data */
    }

    setForm({
      name: savedDetails.name ?? user.name ?? "",
      mobile: savedDetails.mobile ?? user.mobile ?? "",
      email: savedDetails.email ?? user.email ?? "",
      parentName: savedDetails.parentName ?? "",
      parentMobile: savedDetails.parentMobile ?? "",
      address: savedDetails.address ?? "",
    });

    try {
      const savedPhoto = localStorage.getItem(profilePhotoKey(user.id));
      if (savedPhoto) setProfilePhoto(savedPhoto);
    } catch {
      /* ignore */
    }

    setIsReady(true);
  }, [isAuthenticated, isHydrated, router, user]);

  useEffect(() => {
    return () => {
      if (profilePhoto?.startsWith("blob:")) URL.revokeObjectURL(profilePhoto);
    };
  }, [profilePhoto]);

  if (!isReady) {
    return (
      <div className="rounded-[24px] bg-[#EBF0FF] p-8 lg:p-10">
        <p
          className="text-center text-[16px] font-medium text-[#00000080]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] bg-[#EBF0FF] p-8 lg:p-10">
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-full px-6 py-2 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)]"
          style={{
            background: "linear-gradient(90deg, #00679C 0%, #002436 100%)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          View ID
        </button>
      </div>

      <div className="mt-2 flex flex-col items-center gap-3">
        <div className="relative inline-block size-[128px]">
          <label
            htmlFor={PROFILE_PHOTO_INPUT_ID}
            className="relative block size-full cursor-pointer"
          >
            <span className="pointer-events-none absolute inset-0 z-0 block select-none">
              <span className="absolute left-1/2 top-0 flex size-[120px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="size-full object-cover"
                  />
                ) : (
                  <UserRound
                    size={56}
                    className="text-[#1F7AB8]"
                    strokeWidth={1.5}
                  />
                )}
              </span>

              <span className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full border-2 border-white bg-[#00679C] text-white shadow-[0_4px_12px_rgba(0,36,54,0.3)]">
                <Camera size={16} strokeWidth={2.2} aria-hidden />
              </span>
            </span>

            <input
              id={PROFILE_PHOTO_INPUT_ID}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              title="Click to upload photo"
              aria-label="Upload profile photo"
              className="absolute inset-0 z-[1] m-0 size-full cursor-pointer opacity-0"
            />
          </label>

          {profilePhoto ? (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="absolute -right-0.5 -top-0.5 z-[2] flex size-7 items-center justify-center rounded-full border-2 border-white bg-[#C62828] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              aria-label="Remove profile photo"
              title="Remove photo"
            >
              <X size={14} strokeWidth={2.5} aria-hidden />
            </button>
          ) : null}
        </div>

        <h2 className="student-portal-heading text-[20px]! font-extrabold">
          {displayName}
        </h2>

        <p
          className="text-[18px] font-extrabold text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {displaySubtitle}
        </p>
      </div>

      <form
        onSubmit={handleSave}
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

        <FormField
          label="Address"
          required
          value={form.address}
          onChange={update("address")}
        />

        <div className="mt-2 flex justify-center md:col-span-2">
          <button
            type="submit"
            className="rounded-full px-12 py-3 text-[17px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)]"
            style={{
              background: "linear-gradient(90deg, #00679C 0%, #002436 100%)",
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
        className="text-[16px] font-medium text-[#00000080]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {label}
        {required && " *"}
      </span>

      <input
        value={value}
        onChange={onChange}
        className="h-[46px] w-full rounded-[10px] bg-[#D7E9F0] px-4 text-[16px] font-medium text-[#000000] outline-none focus:shadow-[0_0_0_2px_rgba(24,151,216,0.4)]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      />
    </label>
  );
}
