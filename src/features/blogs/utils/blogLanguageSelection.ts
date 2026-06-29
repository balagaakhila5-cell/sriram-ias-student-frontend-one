import type { BlogLanguage } from '@/features/blogs/types/blogLanguage';

const LANGUAGE_PARAM_ALIASES: Record<string, string> = {
  marathi: 'marati',
  marati: 'marati',
  english: 'english',
  telugu: 'telugu',
  hindi: 'hindi',
};

export function normalizeBlogLanguageParam(value: string | null | undefined): string {
  const trimmed = String(value ?? '').trim().toLowerCase();
  if (!trimmed) return '';
  return LANGUAGE_PARAM_ALIASES[trimmed] ?? trimmed;
}

function languageMatchKeys(language: BlogLanguage): string[] {
  const slug = normalizeBlogLanguageParam(language.slug);
  const name = normalizeBlogLanguageParam(
    language.languageName.replace(/\s+/g, '-'),
  );
  const compactName = normalizeBlogLanguageParam(
    language.languageName.replace(/\s+/g, ''),
  );

  return [slug, name, compactName].filter(Boolean);
}

export function resolveBlogLanguageFromParam(
  languages: BlogLanguage[],
  param: string | null | undefined,
): BlogLanguage | null {
  if (!languages.length) return null;

  const normalized = normalizeBlogLanguageParam(param);
  if (!normalized) return languages[0];

  const match = languages.find((language) =>
    languageMatchKeys(language).includes(normalized),
  );

  return match ?? languages[0];
}

export function buildBlogLanguageHref(slug: string, pathname = '/blogs'): string {
  const params = new URLSearchParams();
  params.set('lang', slug);
  return `${pathname}?${params.toString()}`;
}
