export const DUPLICATE_SIGNUP_MESSAGE =
  "Already signed up with this email or mobile number, Please login";

const STORAGE_KEY = "registered_students";

export type RegisteredStudent = {
  name: string;
  email: string;
  mobile: string;
  registeredAt: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeMobile(mobile: string) {
  return mobile.replace(/\D/g, "");
}

export function getRegisteredStudents(): RegisteredStudent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RegisteredStudent[]) : [];
  } catch {
    return [];
  }
}

export function isStudentAlreadyRegistered(input: {
  email: string;
  mobile: string;
}): boolean {
  const email = normalizeEmail(input.email);
  const mobile = normalizeMobile(input.mobile);

  return getRegisteredStudents().some(
    (student) =>
      normalizeEmail(student.email) === email ||
      normalizeMobile(student.mobile) === mobile,
  );
}

export function registerStudent(student: {
  name: string;
  email: string;
  mobile: string;
}): void {
  if (typeof window === "undefined") return;

  if (
    isStudentAlreadyRegistered({
      email: student.email,
      mobile: student.mobile,
    })
  ) {
    return;
  }

  const updated: RegisteredStudent[] = [
    ...getRegisteredStudents(),
    {
      name: student.name.trim(),
      email: normalizeEmail(student.email),
      mobile: normalizeMobile(student.mobile),
      registeredAt: new Date().toISOString(),
    },
  ];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
