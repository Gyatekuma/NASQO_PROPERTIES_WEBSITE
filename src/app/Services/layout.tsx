import type { Metadata } from "next";
import { SITE, absoluteUrl } from "../lib/seo/site-config";
import { metaDescription } from "../lib/seo/meta-description";
import { homeKeywords } from "../lib/seo/page-keywords";

const desc = metaDescription(
  "Explore NASQO Properties real estate services—buying, selling, rentals, and advisory support across Ghana.",
);

export const metadata: Metadata = {
  title: "Services",
  description: desc,
  keywords: [...homeKeywords, "real estate services Ghana"],
  alternates: { canonical: "/Services" },
  openGraph: {
    title: `Services | ${SITE.name}`,
    description: desc,
    url: "/Services",
    images: [{ url: absoluteUrl(SITE.defaultOgImagePath), width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Services | ${SITE.name}`,
    description: desc,
    images: [absoluteUrl(SITE.defaultOgImagePath)],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
