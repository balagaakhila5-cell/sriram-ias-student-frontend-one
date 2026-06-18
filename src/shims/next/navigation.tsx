import {
  useLocation as useLocationRR,
  useNavigate,
  useParams as useParamsRR,
  useSearchParams as useSearchParamsRR,
} from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocationRR();

  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    back: () => window.history.back(),
    refresh: () => window.location.reload(),
    pathname: location.pathname,
    search: location.search,
    query: Object.fromEntries(new URLSearchParams(location.search).entries()),
  };
}

export function useSearchParams() {
  const [searchParams] = useSearchParamsRR();
  return searchParams;
}

export function usePathname() {
  return useLocationRR().pathname;
}

export function useParams() {
  return useParamsRR();
}

export function redirect(href: string): void {
  window.location.replace(href);
}

export function notFound(): never {
  throw new Error("notFound");
}
