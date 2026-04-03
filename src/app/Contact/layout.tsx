import type { Metadata } from "next";
import { SITE, absoluteUrl } from "../lib/seo/site-config";
import { contactKeywords } from "../lib/seo/page-keywords";
import { metaDescription } from "../lib/seo/meta-description";

const desc = metaDescription(
  "Contact NASQO Properties for property inquiries, viewings, and support. Reach our team by phone, email, or the contact form.",
);

export const metadata: Metadata = {
  title: "Contact",
  description: desc,
  keywords: [...contactKeywords],
  alternates: { canonical: "/Contact" },
  openGraph: {
    title: `Contact | ${SITE.name}`,
    description: desc,
    url: "/Contact",
    images: [{ url: absoluteUrl(SITE.defaultOgImagePath), width: 1200, height: 630, alt: "Contact NASQO Properties" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${SITE.name}`,
    description: desc,
    images: [absoluteUrl(SITE.defaultOgImagePath)],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
