/** PYQ card titles — Prelims / Mains (replaces legacy CSAT labels on public site) */
export function buildPyqCardTitle(
  examType: "prelims" | "mains",
  paperNumber: number,
): string {
  const label = examType === "prelims" ? "Prelims" : "Mains";
  return `${label} Exam Paper-${paperNumber} Question Paper`;
}
