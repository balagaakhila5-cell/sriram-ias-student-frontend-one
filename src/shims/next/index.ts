export type Metadata = Record<string, unknown>;
export type Viewport = Record<string, string>;

export { default as Image } from "./image";
export { default as Link } from "./link";
export { useRouter, useSearchParams, usePathname, useParams, redirect, notFound } from "./navigation";
export { default as dynamic } from "./dynamic";
