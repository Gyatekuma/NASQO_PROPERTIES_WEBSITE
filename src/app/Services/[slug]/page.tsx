import type { Metadata } from "next";
import React from "react";
import { servicesPageData } from "../../Data/AppData";
import ServiceDetailTemplate from "../ServiceDetailTemplate";
import JsonLd from "../../components/seo/JsonLd";
import { SITE, absoluteUrl } from "../../lib/seo/site-config";
import { metaDescription } from "../../lib/seo/meta-description";
import { serviceKeywords } from "../../lib/seo/page-keywords";
import { breadcrumbSchema, serviceSchema } from "../../lib/seo/jsonld";

interface PageProps {
  params: Promise<{ slug: string | string[] }>;
}

export function generateStaticParams() {
  return servicesPageData.map((item) => ({ slug: item.slug }));
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
  const service = servicesPageData.find((item) => item.slug === slugStr);

  if (!service) {
    return {
      title: "Service not found",
      description: "The requested service could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = service.heroTitle ?? "Service";
  const description = metaDescription(service.cardSummary ?? service.description);
  const path = `/Services/${service.slug}`;
  const ogImage = service.heroImages?.[0] ?? service.imageSrc ?? SITE.defaultOgImagePath;

  return {
    title,
    description,
    keywords: serviceKeywords(title),
    alternates: { canonical: path },
    openGraph: {
      title: `${SITE.name} | ${title}`,
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
      title: `${SITE.name} | ${title}`,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export default async function ServiceSlugPage({ params }: PageProps) {
  const resolved = await params;
  const slugStr = resolveSlug(resolved);

  const service = servicesPageData.find((item) => item.slug === slugStr);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center p-20">
        <p className="text-neutral-600 text-lg">Service not found: {slugStr || "(empty)"}</p>
      </div>
    );
  }

  const title = service.heroTitle ?? "Service";

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/Services" },
            { name: title, path: `/Services/${service.slug}` },
          ]),
        ]}
      />
      <ServiceDetailTemplate slug={slugStr} />
    </>
  );
}
