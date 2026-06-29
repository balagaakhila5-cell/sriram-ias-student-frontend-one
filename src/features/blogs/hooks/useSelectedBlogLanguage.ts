'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type { BlogLanguage } from '@/features/blogs/types/blogLanguage';
import { resolveBlogLanguageFromParam } from '@/features/blogs/utils/blogLanguageSelection';

type UseSelectedBlogLanguageOptions = {
  languages?: BlogLanguage[];
  syncUrl?: boolean;
};

export function useSelectedBlogLanguage({
  languages = [],
  syncUrl = true,
}: UseSelectedBlogLanguageOptions = {}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const langParam = searchParams.get('lang');

  const selectedLanguage = useMemo(
    () =>
      syncUrl
        ? resolveBlogLanguageFromParam(languages, langParam)
        : (languages[0] ?? null),
    [languages, langParam, syncUrl],
  );

  const setSelectedLanguage = useCallback(
    (language: BlogLanguage) => {
      if (!syncUrl) return;

      const params = new URLSearchParams(searchParams);
      params.set('lang', language.slug);
      const query = params.toString();
      navigate(query ? `${location.pathname}?${query}` : location.pathname, {
        replace: true,
      });
    },
    [location.pathname, navigate, searchParams, syncUrl],
  );

  useEffect(() => {
    if (!syncUrl || languages.length === 0 || langParam || !selectedLanguage) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set('lang', selectedLanguage.slug);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [
    langParam,
    languages.length,
    location.pathname,
    navigate,
    searchParams,
    selectedLanguage,
    syncUrl,
  ]);

  return {
    selectedLanguage,
    selectedLanguageId: selectedLanguage?._id ?? null,
    selectedLanguageSlug: selectedLanguage?.slug ?? null,
    setSelectedLanguage,
  };
}
