import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";

interface NextLinkProps extends Omit<RouterLinkProps, "to"> {
  href: string;
  legacyBehavior?: boolean;
}

export default function Link({ href, children, ...props }: NextLinkProps) {
  return (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  );
}
