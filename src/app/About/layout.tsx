import type { Metadata } from "next";
import { SITE, absoluteUrl } from "../lib/seo/site-config";
import { aboutKeywords } from "../lib/seo/page-keywords";
import { metaDescription } from "../lib/seo/meta-description";

const desc = metaDescription(
  "Learn about NASQO Properties—our mission, values, and commitment to transparent real estate services across Ghana.",
);

export const metadata: Metadata = {
  title: "About us",
  description: desc,
  keywords: [...aboutKeywords],
  alternates: { canonical: "/About" },
  openGraph: {
    title: `${SITE.name} | About us`,
    description: desc,
    url: "/About",
    images: [{ url: absoluteUrl("/PropertiesAssets/ImgSC3.webp"), width: 1200, height: 630, alt: "About NASQO Properties" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | About us`,
    description: desc,
    images: [absoluteUrl("/PropertiesAssets/ImgSC3.webp")],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
