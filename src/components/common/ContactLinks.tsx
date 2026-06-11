import type { ComponentProps } from 'react';
import {
  contactHref,
  emailHref,
  isEmailValue,
  phoneHref,
} from '@/utils/contactLinks';

type LinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  value: string;
};

const linkClassName = 'hover:underline';

export function PhoneLink({
  value,
  className = linkClassName,
  children,
  ...props
}: LinkProps) {
  return (
    <a href={phoneHref(value)} className={className} {...props}>
      {children ?? value}
    </a>
  );
}

export function EmailLink({
  value,
  className = linkClassName,
  children,
  ...props
}: LinkProps) {
  return (
    <a href={emailHref(value)} className={className} {...props}>
      {children ?? value}
    </a>
  );
}

export function ContactLink({
  value,
  className = linkClassName,
  children,
  ...props
}: LinkProps) {
  return (
    <a href={contactHref(value)} className={className} {...props}>
      {children ?? value}
    </a>
  );
}

export function EmailOrPhoneLink({
  email,
  phone,
  className = linkClassName,
}: {
  email?: string | null;
  phone?: string | null;
  className?: string;
}) {
  const value = email?.trim() || phone?.trim();
  if (!value) return null;

  if (email?.trim()) {
    return (
      <EmailLink value={email} className={className}>
        {value}
      </EmailLink>
    );
  }

  return (
    <PhoneLink value={phone!} className={className}>
      {value}
    </PhoneLink>
  );
}

export { isEmailValue };
