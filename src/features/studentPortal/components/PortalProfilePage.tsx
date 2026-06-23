"use client";

import FormFieldLabel from "@/components/common/FormFieldLabel";
import { ContactLink } from "@/components/common/ContactLinks";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "@/lib/appRouter";
import { Camera, UserRound } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import StudentIdCardModal from "@/features/studentPortal/components/StudentIdCardModal";
import {
  useStudentDetails,
  useUpdateStudentProfile,
} from "@/features/studentPortal/hooks/useStudentProfile";

const PROFILE_PHOTO_INPUT_ID = "portal-profile-photo-upload";

interface ProfileForm {
  name: string;
  mobile: string;
  email: string;
  parentName: string;
  parentMobile: string;
  address: string;
}

interface PortalProfilePageProps {
  showParentFields?: boolean;
  storageKeyPrefix?: string;
  fallbackDisplayName?: string;
  profileSource?: "api" | "local";
}

function profileDetailsKey(prefix: string, userId: string) {
  return `${prefix}-details-${userId}`;
}

function profilePhotoKey(prefix: string, userId: string) {
  return `${prefix}-photo-${userId}`;
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

const FIELD_LIMITS = {
  name: 80,
  email: 120,
  parentName: 80,
  address: 500,
  mobile: 10,
} as const;

function sanitizeMobileInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, FIELD_LIMITS.mobile);
}

function sanitizeNameInput(value: string, maxLength: number): string {
  return value.replace(/[^A-Za-z\s]/g, "").slice(0, maxLength);
}

function clampFieldValue(key: keyof ProfileForm, value: string) {
  if (key === "mobile" || key === "parentMobile") {
    return sanitizeMobileInput(value);
  }

  if (key === "name") {
    return sanitizeNameInput(value, FIELD_LIMITS.name);
  }

  if (key === "parentName") {
    return sanitizeNameInput(value, FIELD_LIMITS.parentName);
  }

  const limit = FIELD_LIMITS[key as keyof typeof FIELD_LIMITS];
  return typeof limit === "number" ? value.slice(0, limit) : value;
}

type ProfileFieldErrors = Partial<Record<keyof ProfileForm, string>>;

const NAME_PATTERN = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

function validateProfileForm(
  form: ProfileForm,
  showParentFields: boolean,
  requireAddress: boolean,
  requireParentFields: boolean,
): ProfileFieldErrors {
  const errors: ProfileFieldErrors = {};

  const name = form.name.trim();
  if (!name) {
    errors.name = "Name is required.";
  } else if (!NAME_PATTERN.test(name)) {
    errors.name = "Name can only contain letters and spaces.";
  } else if (name.length > FIELD_LIMITS.name) {
    errors.name = `Name must be ${FIELD_LIMITS.name} characters or fewer.`;
  }

  const mobile = form.mobile.trim();
  if (!mobile) {
    errors.mobile = "Mobile number is required.";
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  }

  const email = form.email.trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (email.length > FIELD_LIMITS.email) {
    errors.email = `Email must be ${FIELD_LIMITS.email} characters or fewer.`;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (showParentFields) {
    const parentName = form.parentName.trim();
    const parentMobile = form.parentMobile.trim();

    if (requireParentFields) {
      if (!parentName) {
        errors.parentName = "Parent name is required.";
      } else if (!NAME_PATTERN.test(parentName)) {
        errors.parentName = "Parent name can only contain letters and spaces.";
      } else if (parentName.length > FIELD_LIMITS.parentName) {
        errors.parentName = `Parent name must be ${FIELD_LIMITS.parentName} characters or fewer.`;
      }

      if (!parentMobile) {
        errors.parentMobile = "Parent mobile number is required.";
      } else if (!/^\d{10}$/.test(parentMobile)) {
        errors.parentMobile = "Enter a valid 10-digit mobile number.";
      }
    } else {
      if (parentName && !NAME_PATTERN.test(parentName)) {
        errors.parentName = "Parent name can only contain letters and spaces.";
      } else if (parentName.length > FIELD_LIMITS.parentName) {
        errors.parentName = `Parent name must be ${FIELD_LIMITS.parentName} characters or fewer.`;
      }

      if (parentMobile && !/^\d{10}$/.test(parentMobile)) {
        errors.parentMobile = "Enter a valid 10-digit mobile number.";
      }
    }
  }

  const address = form.address.trim();
  if (requireAddress) {
    if (!address) {
      errors.address = "Address is required.";
    } else if (address.length > FIELD_LIMITS.address) {
      errors.address = `Address must be ${FIELD_LIMITS.address} characters or fewer.`;
    }
  } else if (address.length > FIELD_LIMITS.address) {
    errors.address = `Address must be ${FIELD_LIMITS.address} characters or fewer.`;
  }

  return errors;
}

export default function PortalProfilePage({
  showParentFields = true,
  storageKeyPrefix = "student-profile",
  fallbackDisplayName = "Student",
  profileSource = "local",
}: PortalProfilePageProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const usesApiProfile = profileSource === "api";

  const studentDetailsQuery = useStudentDetails(
    usesApiProfile && isHydrated && isAuthenticated,
  );
  const updateProfileMutation = useUpdateStudentProfile();

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [isReady, setIsReady] = useState(false);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);
  const initializedForUserRef = useRef<string | null>(null);

  const formInitKey = user ? `${user.id}:${profileSource}:${storageKeyPrefix}` : null;

  const displayName = useMemo(
    () =>
      (form.name.trim() || user?.name || fallbackDisplayName).toUpperCase(),
    [fallbackDisplayName, form.name, user?.name],
  );

  const displaySubtitle =
    form.mobile.trim() || user?.mobile || form.email.trim() || user?.email || "Profile";

  const update =
    (key: keyof ProfileForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldErrors((current) => {
        if (!current[key]) return current;
        const next = { ...current };
        delete next[key];
        return next;
      });
      setForm((f) => ({
        ...f,
        [key]: clampFieldValue(key, e.target.value),
      }));
    };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const normalizedForm: ProfileForm = {
      name: clampFieldValue("name", form.name).trim(),
      mobile: clampFieldValue("mobile", form.mobile),
      email: clampFieldValue("email", form.email).trim(),
      parentName: showParentFields
        ? clampFieldValue("parentName", form.parentName).trim()
        : "",
      parentMobile: showParentFields
        ? clampFieldValue("parentMobile", form.parentMobile)
        : "",
      address: clampFieldValue("address", form.address).trim(),
    };

    const errors = validateProfileForm(
      normalizedForm,
      showParentFields,
      !usesApiProfile,
      !usesApiProfile,
    );
    if (Object.keys(errors).length > 0) {
      setForm(normalizedForm);
      setFieldErrors(errors);
      const firstError = Object.values(errors)[0];
      window.alert(firstError ?? "Please fix the highlighted fields before saving.");
      return;
    }

    setForm(normalizedForm);
    setFieldErrors({});

    if (usesApiProfile) {
      try {
        await updateProfileMutation.mutateAsync({
          name: normalizedForm.name,
          email: normalizedForm.email,
          mobile: normalizedForm.mobile,
          ...(showParentFields
            ? {
                parentName: normalizedForm.parentName,
                parentMobile: normalizedForm.parentMobile,
              }
            : {}),
        });

        try {
          localStorage.setItem(
            profileDetailsKey(storageKeyPrefix, user.id),
            JSON.stringify({ address: normalizedForm.address }),
          );
        } catch {
          /* optional local address */
        }

        window.alert("Profile saved successfully.");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Could not save profile.";
        window.alert(message);
      }
      return;
    }

    try {
      localStorage.setItem(
        profileDetailsKey(storageKeyPrefix, user.id),
        JSON.stringify(normalizedForm),
      );
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
        localStorage.setItem(
          profilePhotoKey(storageKeyPrefix, user.id),
          reader.result,
        );
      } catch {
        /* storage full — preview still works this session */
      }
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
    }
  }, [isAuthenticated, isHydrated, router, user]);

  useEffect(() => {
    if (!formInitKey) {
      initializedForUserRef.current = null;
      setIsReady(false);
      return;
    }

    if (initializedForUserRef.current !== formInitKey) {
      initializedForUserRef.current = null;
      setIsReady(false);
    }
  }, [formInitKey]);

  useEffect(() => {
    if (!isHydrated || !isAuthenticated || !user || !formInitKey) return;
    if (initializedForUserRef.current === formInitKey) return;

    if (usesApiProfile) {
      if (studentDetailsQuery.isLoading) return;

      if (studentDetailsQuery.isError) {
        initializedForUserRef.current = formInitKey;
        setIsReady(true);
        return;
      }

      if (!studentDetailsQuery.data) return;

      const { profile } = studentDetailsQuery.data;
      let savedAddress = "";

      try {
        const raw = localStorage.getItem(profileDetailsKey(storageKeyPrefix, user.id));
        if (raw) {
          const saved = JSON.parse(raw) as Partial<ProfileForm>;
          savedAddress = saved.address ?? "";
        }
      } catch {
        /* ignore invalid saved data */
      }

      setStudentId(profile.studentId);
      setForm({
        name: profile.studentName ?? user.name ?? "",
        mobile: profile.mobileNumber ?? user.mobile ?? "",
        email: profile.email ?? user.email ?? "",
        parentName: showParentFields ? profile.parentName ?? "" : "",
        parentMobile: showParentFields ? profile.parentMobile ?? "" : "",
        address: savedAddress,
      });

      try {
        const savedPhoto = localStorage.getItem(
          profilePhotoKey(storageKeyPrefix, user.id),
        );
        if (savedPhoto) setProfilePhoto(savedPhoto);
      } catch {
        /* ignore */
      }

      initializedForUserRef.current = formInitKey;
      setIsReady(true);
      return;
    }

    let savedDetails: Partial<ProfileForm> = {};
    try {
      const raw = localStorage.getItem(profileDetailsKey(storageKeyPrefix, user.id));
      if (raw) savedDetails = JSON.parse(raw) as Partial<ProfileForm>;
    } catch {
      /* ignore invalid saved data */
    }

    setForm({
      name: savedDetails.name ?? user.name ?? "",
      mobile: savedDetails.mobile ?? user.mobile ?? "",
      email: savedDetails.email ?? user.email ?? "",
      parentName: showParentFields ? savedDetails.parentName ?? "" : "",
      parentMobile: showParentFields ? savedDetails.parentMobile ?? "" : "",
      address: savedDetails.address ?? "",
    });

    try {
      const savedPhoto = localStorage.getItem(
        profilePhotoKey(storageKeyPrefix, user.id),
      );
      if (savedPhoto) setProfilePhoto(savedPhoto);
    } catch {
      /* ignore */
    }

    initializedForUserRef.current = formInitKey;
    setIsReady(true);
  }, [
    formInitKey,
    isAuthenticated,
    isHydrated,
    showParentFields,
    storageKeyPrefix,
    studentDetailsQuery.data,
    studentDetailsQuery.isError,
    studentDetailsQuery.isLoading,
    user,
    usesApiProfile,
  ]);

  useEffect(() => {
    return () => {
      if (profilePhoto?.startsWith("blob:")) URL.revokeObjectURL(profilePhoto);
    };
  }, [profilePhoto]);

  if (!isReady) {
    return (
      <div className="min-w-0 rounded-[24px] bg-[#EBF0FF] p-8 lg:p-10">
        <p
          className="text-center text-[16px] font-medium text-[#00000080]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {usesApiProfile && studentDetailsQuery.isLoading
            ? "Loading your profile..."
            : "Loading your profile..."}
        </p>
      </div>
    );
  }

  if (usesApiProfile && studentDetailsQuery.isError) {
    return (
      <div className="min-w-0 rounded-[24px] bg-[#EBF0FF] p-8 lg:p-10">
        <p
          className="text-center text-[16px] font-medium text-[#E53935]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {studentDetailsQuery.error instanceof Error
            ? studentDetailsQuery.error.message
            : "Could not load your profile. Please try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0 max-w-full rounded-[24px] bg-[#EBF0FF] p-8 lg:p-10">
      <div className="relative z-10 flex justify-end">
        <button
          type="button"
          onClick={() => setIsIdModalOpen(true)}
          className="cursor-pointer rounded-full px-6 py-2 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)] transition-opacity hover:opacity-90"
          style={{
            background: "linear-gradient(90deg, #00679C 0%, #002436 100%)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          View ID
        </button>
      </div>

      <StudentIdCardModal
        isOpen={isIdModalOpen}
        onClose={() => setIsIdModalOpen(false)}
        name={displayName}
        id={studentId ?? user?.id ?? "—"}
        mobile={form.mobile.trim() || user?.mobile}
        email={form.email.trim() || user?.email}
        role={user?.role ?? "student"}
        photoUrl={profilePhoto}
      />

      <div className="mt-2 flex flex-col items-center gap-3 overflow-visible px-2">
        <label
          htmlFor={PROFILE_PHOTO_INPUT_ID}
          className="group relative flex h-[124px] w-[136px] cursor-pointer items-start justify-center overflow-visible"
          title="Click to change profile photo"
        >
          <span className="pointer-events-none flex size-[120px] items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-opacity group-hover:opacity-90">
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

          <span className="pointer-events-none absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full border-2 border-white bg-[#00679C] text-white shadow-[0_4px_12px_rgba(0,36,54,0.3)]">
            <Camera size={16} strokeWidth={2.2} aria-hidden />
          </span>

          <input
            id={PROFILE_PHOTO_INPUT_ID}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            aria-label="Change profile photo"
            className="absolute inset-0 z-[1] m-0 size-full cursor-pointer opacity-0"
          />
        </label>

        <h2 className="student-portal-heading max-w-full truncate px-2 text-center text-[20px]! font-extrabold">
          {displayName}
        </h2>

        <p
          className="max-w-full truncate px-2 text-center text-[18px] font-extrabold text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {displaySubtitle !== "Profile" ? (
            <ContactLink
              value={displaySubtitle}
              className="hover:text-[#00679C] hover:underline"
            />
          ) : (
            displaySubtitle
          )}
        </p>
      </div>

      <form
        onSubmit={handleSave}
        noValidate
        className="mt-10 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2"
      >
        <FormField
          label="Name"
          required
          maxLength={FIELD_LIMITS.name}
          placeholder="Letters and spaces only"
          value={form.name}
          onChange={update("name")}
          error={fieldErrors.name}
        />

        <FormField
          label="Mobile Number"
          required
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          placeholder="10 digit mobile number"
          value={form.mobile}
          onChange={update("mobile")}
          error={fieldErrors.mobile}
        />

        <FormField
          label="Email ID"
          required
          type="email"
          maxLength={FIELD_LIMITS.email}
          value={form.email}
          onChange={update("email")}
          error={fieldErrors.email}
        />

        {showParentFields ? (
          <>
            <FormField
              label="Parent Name"
              required={!usesApiProfile}
              maxLength={FIELD_LIMITS.parentName}
              placeholder="Enter the name"
              value={form.parentName}
              onChange={update("parentName")}
              error={fieldErrors.parentName}
            />

            <FormField
              label="Parents Mobile Number"
              required={!usesApiProfile}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="10 digit mobile number"
              value={form.parentMobile}
              onChange={update("parentMobile")}
              error={fieldErrors.parentMobile}
            />
          </>
        ) : null}

        <FormField
          label="Address"
          required={!usesApiProfile}
          multiline
          maxLength={FIELD_LIMITS.address}
          value={form.address}
          onChange={update("address")}
          error={fieldErrors.address}
          className="md:col-span-2"
        />

        <div className="mt-2 flex justify-center md:col-span-2">
          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="rounded-full px-12 py-3 text-[17px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)] disabled:opacity-60"
            style={{
              background: "linear-gradient(90deg, #00679C 0%, #002436 100%)",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {updateProfileMutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  maxLength?: number;
  placeholder?: string;
  multiline?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
}

const fieldControlClassName =
  "box-border w-full min-w-0 max-w-full rounded-[10px] bg-[#D7E9F0] px-4 text-[16px] font-medium text-[#000000] outline-none focus:shadow-[0_0_0_2px_rgba(24,151,216,0.4)]";

function FormField({
  label,
  required,
  type = "text",
  inputMode,
  pattern,
  maxLength,
  placeholder,
  multiline = false,
  value,
  onChange,
  error,
  className = "",
}: FormFieldProps) {
  const fieldId = label.toLowerCase().replace(/\s+/g, "-");
  const invalidClassName = error ? "ring-2 ring-[#E53935]" : "";

  return (
    <label className={`flex min-w-0 max-w-full flex-col gap-2 ${className}`} htmlFor={fieldId}>
      <FormFieldLabel
        required={required}
        htmlFor={fieldId}
        className="text-[16px] font-medium text-[#00000080]"
      >
        {label}
      </FormFieldLabel>

      {multiline ? (
        <textarea
          id={fieldId}
          value={value}
          onChange={onChange}
          rows={3}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`${fieldControlClassName} min-h-[92px] resize-y overflow-x-hidden overflow-y-auto py-3 break-words ${invalidClassName}`}
          style={{ fontFamily: "Montserrat, sans-serif" }}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          inputMode={inputMode}
          pattern={pattern}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`${fieldControlClassName} h-[46px] overflow-x-auto overflow-y-hidden text-ellipsis whitespace-nowrap ${invalidClassName}`}
          style={{ fontFamily: "Montserrat, sans-serif" }}
        />
      )}

      {error ? (
        <p
          id={`${fieldId}-error`}
          className="break-words text-[13px] font-medium text-[#E53935]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {error}
        </p>
      ) : null}
    </label>
  );
}
