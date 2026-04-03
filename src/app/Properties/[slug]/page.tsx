import type { Metadata } from "next";
import React from "react";
import { propertiesPageData } from "../../Data/AppData";
import PropertyDetailTemplate from "../PropertyDetailTemplate";
import JsonLd from "../../components/seo/JsonLd";
import { SITE, absoluteUrl } from "../../lib/seo/site-config";
import { metaDescription } from "../../lib/seo/meta-description";
import { propertyKeywords } from "../../lib/seo/page-keywords";
import { breadcrumbSchema, realEstateListingSchema } from "../../lib/seo/jsonld";

interface PageProps {
  params: Promise<{ slug: string | string[] }>;
}

export function generateStaticParams() {
  return propertiesPageData.map((item) => ({ slug: item.slug }));
}

function resolveSlug(resolved: { slug: string | string[] }): string {
  const s = resolved.slug;
  if (typeof s === "string") return s;
  if (Array.isArray(s) && s.length > 0) return s[0];
  return "";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const slugStr = resolveSlug(resolved);
  const property = propertiesPageData.find((item) => item.slug === slugStr);

  if (!property) {
    return {
      title: "Property not found",
      description: "The requested property could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = property.heroTitle ?? property.title ?? "Property";
  const description = metaDescription(property.cardSummary ?? property.description);
  const path = `/Properties/${property.slug}`;
  const ogImage =
    property.heroImages?.[0] ?? property.imageSrc ?? SITE.defaultOgImagePath;

  return {
    title,
    description,
    keywords: propertyKeywords(title),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export default async function PropertySlugPage({ params }: PageProps) {
  const resolved = await params;
  const slugStr = resolveSlug(resolved);

  const property = propertiesPageData.find((item) => item.slug === slugStr);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-20">
        <p className="text-neutral-600 text-lg">Property not found: {slugStr || "(empty)"}</p>
      </div>
    );
  }

  const title = property.heroTitle ?? property.title ?? "Property";

  return (
    <>
      <JsonLd
        data={[
          realEstateListingSchema(property),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/Properties" },
            { name: title, path: `/Properties/${property.slug}` },
          ]),
        ]}
      />
      <PropertyDetailTemplate slug={slugStr} />
    </>
  );
}
