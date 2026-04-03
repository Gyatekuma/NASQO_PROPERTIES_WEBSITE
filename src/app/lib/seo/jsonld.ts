import { contactConfig } from "../../Data/AppData";
import { SITE, absoluteUrl, getSiteOrigin } from "./site-config";
import { metaDescription } from "./meta-description";
import type { PropertiesPageItem } from "../../Types/types";
import type { ServicesPageItem } from "../../Types/types";

export function organizationSchema(): Record<string, unknown> {
  const url = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    url,
    logo: absoluteUrl("/Main_Assets/Main_Logo.svg"),
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
