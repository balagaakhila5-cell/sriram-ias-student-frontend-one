const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailValue(value: string) {
  return EMAIL_REGEX.test(value.trim());
}

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits ? `tel:${digits}` : '#';
}

export function emailHref(email: string) {
  const trimmed = email.trim();
  return trimmed ? `mailto:${trimmed}` : '#';
}

export function contactHref(value: string) {
  return isEmailValue(value) ? emailHref(value) : phoneHref(value);
}
