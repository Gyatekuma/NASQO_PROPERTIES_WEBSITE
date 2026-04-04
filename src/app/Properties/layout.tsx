import type { Metadata } from "next";
import { SITE, absoluteUrl } from "../lib/seo/site-config";
import { metaDescription } from "../lib/seo/meta-description";
import { homeKeywords } from "../lib/seo/page-keywords";

const desc = metaDescription(
  "Browse NASQO Properties listings—residential and commercial developments across Ghana with expert guidance.",
);

export const metadata: Metadata = {
  title: "Properties",
  description: desc,
  keywords: [...homeKeywords, "property listings Ghana"],
  alternates: { canonical: "/Properties" },
  openGraph: {
    title: `${SITE.name} | Properties`,
    description: desc,
    url: "/Properties",
    images: [{ url: absoluteUrl(SITE.defaultOgImagePath), width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Properties`,
    description: desc,
    images: [absoluteUrl(SITE.defaultOgImagePath)],
  },
};

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
