export function isPortalTopperDisplayed(value: unknown): boolean {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return value !== undefined && value !== null && value !== "";
}

export function isPortalTop10(value: unknown): boolean {
  if (value === true || value === "true") return true;
  return false;
}
