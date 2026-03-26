import type { ServicesPageItem } from "../Types/types";

/** Teaser text for service cards: dedicated `cardSummary`, else first paragraph of `description`. */
export function getServiceCardSummary(s: ServicesPageItem): string {
  if (s.cardSummary?.trim()) return s.cardSummary.trim();
  const first = s.description.split(/\n\n+/)[0]?.trim() ?? s.description.trim();
  return first.replace(/\s+/g, " ");
}
