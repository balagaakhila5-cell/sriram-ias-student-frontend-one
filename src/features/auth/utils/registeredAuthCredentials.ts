import type { UserRole } from "../types";

export const DUPLICATE_SIGNUP_MESSAGE =
  "This email or mobile number is already registered. Please log in with the correct portal.";

const STORAGE_KEY = "registered_auth_credentials";

export type RegisteredAuthCredential = {
  role: UserRole;
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
  registeredAt: string;
};

export const INVALID_LOGIN_CREDENTIALS_MESSAGE =
  "Invalid email or password. Please try again.";

const DEFAULT_AUTH_CREDENTIALS: Array<
  Omit<RegisteredAuthCredential, "registeredAt">
> = [
  {
    role: "parent",
    name: "Parent User",
    mobile: "9876543210",
  },
  {
    role: "faculty",
    name: "Faculty User",
    email: "faculty@sriramias.com",
    mobile: "9123456780",
    password: "Faculty@123",
  },
];

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeMobile(mobile: string) {
  return mobile.replace(/\D/g, "");
}

function readStoredCredentials(): RegisteredAuthCredential[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RegisteredAuthCredential[]) : [];
  } catch {
    return [];
  }
}

function writeStoredCredentials(credentials: RegisteredAuthCredential[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
}

function migrateLegacyStudentRegistry(): RegisteredAuthCredential[] {
  if (typeof window === "undefined") return [];

  const legacyRaw = window.localStorage.getItem("registered_students");
  if (!legacyRaw) return [];

  try {
    const legacy = JSON.parse(legacyRaw) as Array<{
      name: string;
      email: string;
      mobile: string;
      registeredAt: string;
    }>;

    window.localStorage.removeItem("registered_students");

    return legacy.map((student) => ({
      role: "student" as const,
      name: student.name,
      email: normalizeEmail(student.email),
      mobile: normalizeMobile(student.mobile),
      registeredAt: student.registeredAt,
    }));
  } catch {
    return [];
  }
}

function seedDefaultCredentials() {
  writeStoredCredentials(
    DEFAULT_AUTH_CREDENTIALS.map((credential) => ({
      ...credential,
      email: credential.email ? normalizeEmail(credential.email) : undefined,
      mobile: credential.mobile
        ? normalizeMobile(credential.mobile)
        : undefined,
      registeredAt: new Date().toISOString(),
    })),
  );
}

function ensureFacultyPasswords(credentials: RegisteredAuthCredential[]) {
  let changed = false;

  const updated = credentials.map((credential) => {
    if (credential.role !== "faculty" || credential.password) {
      return credential;
    }

    const defaultCredential = DEFAULT_AUTH_CREDENTIALS.find(
      (entry) =>
        entry.role === "faculty" &&
        entry.email &&
        credential.email &&
        normalizeEmail(entry.email) === normalizeEmail(credential.email),
    );

    if (!defaultCredential?.password) return credential;

    changed = true;
    return { ...credential, password: defaultCredential.password };
  });

  if (changed) {
    writeStoredCredentials(updated);
  }

  return updated;
}

export function getRegisteredAuthCredentials(): RegisteredAuthCredential[] {
  const stored = readStoredCredentials();
  if (stored.length > 0) {
    return ensureFacultyPasswords(stored);
  }

  const migrated = migrateLegacyStudentRegistry();
  if (migrated.length > 0) {
    writeStoredCredentials(migrated);
    return ensureFacultyPasswords(migrated);
  }

  seedDefaultCredentials();
  return readStoredCredentials();
}

export function verifyStaffLogin(credentials: {
  email: string;
  password: string;
}) {
  const email = normalizeEmail(credentials.email);
  const credential = findCredentialByEmail(email);

  if (!credential || credential.role !== "faculty") {
    throw new Error(INVALID_LOGIN_CREDENTIALS_MESSAGE);
  }

  if (!credential.password || credential.password !== credentials.password) {
    throw new Error(INVALID_LOGIN_CREDENTIALS_MESSAGE);
  }

  return credential;
}

export function findCredentialByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);
  return getRegisteredAuthCredentials().find(
    (credential) => credential.email && credential.email === normalizedEmail,
  );
}

export function findCredentialByMobile(mobile: string) {
  const normalizedMobile = normalizeMobile(mobile);
  if (!normalizedMobile) return undefined;

  return getRegisteredAuthCredentials().find((credential) => {
    if (!credential.mobile) return false;
    return normalizeMobile(credential.mobile) === normalizedMobile;
  });
}

function roleLabel(role: UserRole) {
  if (role === "faculty") return "Faculty";
  if (role === "parent") return "Parent";
  return "Student";
}

export function getWrongPortalMessage(registeredRole: UserRole) {
  return `This email or mobile number is registered for ${roleLabel(registeredRole)} login. Please use the ${roleLabel(registeredRole)} portal.`;
}

export function getAccountNotFoundMessage(role: UserRole) {
  return `No ${roleLabel(role)} account found with this email or mobile number.`;
}

function getConflictingCredential(
  role: UserRole,
  input: { email?: string; mobile?: string },
) {
  if (input.email) {
    const byEmail = findCredentialByEmail(input.email);
    if (byEmail && byEmail.role !== role) return byEmail;
  }

  if (input.mobile) {
    const byMobile = findCredentialByMobile(input.mobile);
    if (byMobile && byMobile.role !== role) return byMobile;
  }

  return undefined;
}

function hasRegisteredCredential(
  role: UserRole,
  input: { email?: string; mobile?: string },
) {
  if (input.email) {
    const byEmail = findCredentialByEmail(input.email);
    if (byEmail?.role === role) return true;
  }

  if (input.mobile) {
    const byMobile = findCredentialByMobile(input.mobile);
    if (byMobile?.role === role) return true;
  }

  return false;
}

export function assertLoginCredentialAllowed(
  role: UserRole,
  input: { email?: string; mobile?: string },
) {
  const email = input.email?.trim();
  const mobile = input.mobile?.trim();

  if (!email && !mobile) {
    throw new Error("Email or mobile number is required.");
  }

  const conflict = getConflictingCredential(role, { email, mobile });
  if (conflict) {
    throw new Error(getWrongPortalMessage(conflict.role));
  }

  if (role === "parent" || role === "faculty") {
    if (!hasRegisteredCredential(role, { email, mobile })) {
      throw new Error(getAccountNotFoundMessage(role));
    }
  }
}

export function isCredentialAlreadyRegistered(input: {
  email?: string;
  mobile?: string;
}) {
  const email = input.email ? normalizeEmail(input.email) : undefined;
  const mobile = input.mobile ? normalizeMobile(input.mobile) : undefined;

  return getRegisteredAuthCredentials().some((credential) => {
    if (
      email &&
      credential.email &&
      normalizeEmail(credential.email) === email
    ) {
      return true;
    }

    if (
      mobile &&
      credential.mobile &&
      normalizeMobile(credential.mobile) === mobile
    ) {
      return true;
    }

    return false;
  });
}

export function registerAuthCredential(
  role: UserRole,
  input: {
    name?: string;
    email?: string;
    mobile?: string;
  },
) {
  if (typeof window === "undefined") return;

  const email = input.email ? normalizeEmail(input.email) : undefined;
  const mobile = input.mobile ? normalizeMobile(input.mobile) : undefined;

  if (!email && !mobile) return;

  const existingByEmail = email ? findCredentialByEmail(email) : undefined;
  const existingByMobile = mobile ? findCredentialByMobile(mobile) : undefined;
  const existing = existingByEmail ?? existingByMobile;

  if (existing) {
    if (existing.role !== role) {
      throw new Error(getWrongPortalMessage(existing.role));
    }
    return;
  }

  if (email && findCredentialByEmail(email)) return;
  if (mobile && findCredentialByMobile(mobile)) return;

  const updated: RegisteredAuthCredential[] = [
    ...getRegisteredAuthCredentials(),
    {
      role,
      name: input.name?.trim(),
      email,
      mobile,
      registeredAt: new Date().toISOString(),
    },
  ];

  writeStoredCredentials(updated);
}
