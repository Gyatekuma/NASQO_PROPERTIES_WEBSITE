import type { Metadata } from "next";
import HomePage from "./HomePage";
import { SITE, absoluteUrl } from "./lib/seo/site-config";
import { homeKeywords } from "./lib/seo/page-keywords";

export const metadata: Metadata = {
  title: { absolute: SITE.defaultTitle },
  description: SITE.defaultDescription,
  keywords: [...homeKeywords],
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    url: "/",
    images: [
      {
        url: absoluteUrl(SITE.defaultOgImagePath),
        width: 1200,
        height: 630,
        alt: `${SITE.name} — real estate in Ghana`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [absoluteUrl(SITE.defaultOgImagePath)],
  },
};

export default function Page() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
