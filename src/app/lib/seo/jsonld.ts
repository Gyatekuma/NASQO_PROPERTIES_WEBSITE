import { contactConfig } from "../../Data/AppData";
import { SITE, absoluteUrl, getSiteOrigin } from "./site-config";
import { metaDescription } from "./meta-description";
import type { PropertiesPageItem } from "../../Types/types";
import type { ServicesPageItem } from "../../Types/types";

export function organizationSchema(): Record<string, unknown> {
  const url = getSiteOrigin();
  const logoUrl = absoluteUrl(SITE.organizationLogoPath);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    alternateName: ["Nasqo", "NASQO", "nasqoproperties.com"],
    url,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 453,
      height: 180,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+233${contactConfig.phone.replace(/^0/, "")}`,
      email: contactConfig.email,
      contactType: "sales",
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: ["Nasqo", "NASQO", "nasqo properties ghana"],
    url: getSiteOrigin(),
    description: SITE.defaultDescription,
    publisher: { "@type": "Organization", name: SITE.legalName },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function realEstateListingSchema(property: PropertiesPageItem): Record<string, unknown> {
  const title = property.heroTitle ?? property.title ?? "Property";
  const path = `/Properties/${property.slug}`;
  const desc = metaDescription(property.cardSummary ?? property.description);
  const images = (property.heroImages?.length ? property.heroImages : [property.imageSrc]).filter(
    Boolean,
  ) as string[];
  const imageUrls = images.map((src) => absoluteUrl(src));

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: title,
    description: desc,
    url: absoluteUrl(path),
    image: imageUrls.length === 1 ? imageUrls[0] : imageUrls,
  };

  const loc = property.locationDetails?.locationName ?? property.location;
  if (loc) {
    schema.address = {
      "@type": "PostalAddress",
      addressLocality: loc,
      addressCountry: "GH",
    };
  }

  const price = property.priceRange ?? property.price;
  if (price?.trim()) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "USD",
      description: price.trim(),
    };
  }

  return schema;
}

/** schema.org VideoObject for property promo clips (Google video rich results). */
export function propertyPromoVideoSchema(
  property: PropertiesPageItem,
): Record<string, unknown> | null {
  const v = property.promoVideo;
  if (!v?.contentPath) return null;

  const title = property.heroTitle ?? property.title ?? "Property";
  const name = v.name ?? `${title} — video`;
  const description =
    v.description ?? metaDescription(property.cardSummary ?? property.description);
  const pagePath = `/Properties/${property.slug}`;
  const thumbRel =
    v.thumbnailPath ?? property.heroImages?.[0] ?? property.imageSrc ?? undefined;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    contentUrl: absoluteUrl(v.contentPath),
    embedUrl: absoluteUrl(pagePath),
  };

  if (thumbRel) {
    schema.thumbnailUrl = absoluteUrl(thumbRel);
  }
  if (v.duration) {
    schema.duration = v.duration;
  }
  if (v.uploadDate) {
    schema.uploadDate = v.uploadDate;
  }
  if (typeof v.width === "number") {
    schema.width = v.width;
  }
  if (typeof v.height === "number") {
    schema.height = v.height;
  }

  return schema;
}

export function serviceSchema(service: ServicesPageItem): Record<string, unknown> {
  const title = service.heroTitle ?? "Service";
  const path = `/Services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: metaDescription(service.cardSummary ?? service.description),
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      name: SITE.legalName,
      url: getSiteOrigin(),
    },
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
  };
}
