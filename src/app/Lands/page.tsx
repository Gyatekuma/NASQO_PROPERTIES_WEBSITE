import type { Metadata } from "next";
import { SITE, absoluteUrl } from "../lib/seo/site-config";
import { landsKeywords } from "../lib/seo/page-keywords";
import { metaDescription } from "../lib/seo/meta-description";

const desc = metaDescription(
  "Explore land opportunities with NASQO Properties—plots and development land in prime Ghana locations with trusted guidance.",
);

export const metadata: Metadata = {
  title: "Lands",
  description: desc,
  keywords: [...landsKeywords],
  alternates: { canonical: "/Lands" },
  openGraph: {
    title: `${SITE.name} | Lands`,
    description: desc,
    url: "/Lands",
    images: [{ url: absoluteUrl(SITE.defaultOgImagePath), width: 1200, height: 630, alt: "Land listings — NASQO Properties" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Lands`,
    description: desc,
    images: [absoluteUrl(SITE.defaultOgImagePath)],
  },
};

export default function LandsPage() {
  return (
    <article
      className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-16"
      aria-labelledby="lands-heading"
    >
      <h1 id="lands-heading" className="scroll-reveal font-bricolage text-3xl sm:text-4xl text-neutral-900 font-semibold tracking-tight">
        Lands
      </h1>
      <p className="mt-4 max-w-lg text-center font-mona text-neutral-600 text-base leading-relaxed">
        Land listings and updates from {SITE.name} will appear here.{" "}
        <a href="/Contact" className="text-[#4361EE] font-semibold underline-offset-4 hover:underline">
          Contact us
        </a>{" "}
        for available plots and estates.
      </p>
    </article>
  );
}
