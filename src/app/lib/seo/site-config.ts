/**
 * Central SEO / site identity. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://yoursite.com).
 */
export const SITE = {
  name: "NASQO Properties",
  legalName: "NASQO Properties",
  /** Short default browser title when template is not used */
  defaultTitle: "NASQO Properties — Real estate & property services in Ghana",
  defaultDescription:
    "NASQO Properties helps you buy, rent, and invest in verified residential and commercial property in Ghana—with transparent guidance from search to ownership.",
  /** Relative path used for default Open Graph / Twitter image */
  defaultOgImagePath: "/PropertiesAssets/ImgSC1.webp",
  /** Organization logo for structured data (Google Search / rich results) */
  organizationLogoPath: "/Nasqo_Search_Logo.svg",
  locale: "en_GH",
  twitterSite: process.env.NEXT_PUBLIC_TWITTER_SITE ?? undefined,
} as const;

export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = getSiteOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteOrigin()}/`);
}
