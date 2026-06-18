import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";

interface NextLinkProps extends Omit<RouterLinkProps, "to"> {
  href: string;
  legacyBehavior?: boolean;
  prefetch?: boolean;
}

export default function Link({ href, children, prefetch: _prefetch, ...props }: NextLinkProps) {
  return (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  );
}
