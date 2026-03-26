import type { PropertiesPageItem } from "../Types/types";

/** Teaser text for property cards: `cardSummary` when set, else first paragraph of `description`. */
export function getPropertyCardSummary(p: PropertiesPageItem): string {
  if (p.cardSummary?.trim()) return p.cardSummary.trim();
  const first = p.description.split(/\n\n+/)[0]?.trim() ?? p.description.trim();
  return first.replace(/\s+/g, " ");
}
