/** Trim and clamp meta descriptions for search snippets (~155–160 chars). */
export function metaDescription(raw: string, maxLen = 158): string {
  const single = raw.replace(/\s+/g, " ").trim();
  if (single.length <= maxLen) return single;
  const cut = single.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 40 ? cut.slice(0, lastSpace) : cut;
  return `${base.trim()}…`;
}
