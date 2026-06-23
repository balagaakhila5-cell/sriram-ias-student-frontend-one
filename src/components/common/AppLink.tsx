import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";

interface AppLinkProps extends Omit<RouterLinkProps, "to"> {
  href: string;
  prefetch?: boolean;
}

export default function AppLink({ href, children, prefetch: _prefetch, ...props }: AppLinkProps) {
  return (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  );
}
