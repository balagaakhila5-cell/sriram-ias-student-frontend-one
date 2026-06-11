import { FOOTER_BRANCHES } from '@/config/footerLinks';

const BRANCH_BY_CITY: Record<string, (typeof FOOTER_BRANCHES)[number]> = {
  delhi: FOOTER_BRANCHES[0],
  hyderabad: FOOTER_BRANCHES[1],
  pune: FOOTER_BRANCHES[2],
};

export function getCenterBranchContact(city: string) {
  return BRANCH_BY_CITY[city.toLowerCase()] ?? FOOTER_BRANCHES[0];
}
