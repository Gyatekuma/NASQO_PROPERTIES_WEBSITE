export interface coreValueProps {
    id: string;
    title: string;
    subtext: string;
    icon: React.ElementType;
}

export type amenityProps = {
    id:string;
    name:string;
    icon:React.ElementType;
}

export interface propertiesProps {
    id:string;
    title:string;
    location:string;
    description:string;
    imageSrc:string;
    amenities:amenityProps[];
    href:string;
    price:string;
    /** When set, shown on the home carousel instead of `price` (matches detail `priceRange`) */
    priceRange?: string;
}

/** Location details for the Properties page map/brochure section */
export interface LocationDetails {
    sectionTitle: string;
    locationName: string;
    mapEmbedUrl: string;
    mapTitle: string;
    brochureButtonText: string;
    brochureHref: string;
}

/** Optional price tier (e.g. "2 bedroom semi-detached" / "$50,000") */
export interface PriceTier {
    label: string;
    price: string;
}

/** Optional payment deposit line (e.g. "30% of $50,000" / "$15,000") */
export interface PaymentDeposit {
    label: string;
    amount: string;
}

/** On-page promo clip; drives VideoObject JSON-LD and Open Graph video tags. */
export interface PropertyPromoVideo {
    /** Public path, e.g. /PropertiesAssets/nasqo_video.mp4 */
    contentPath: string;
    /** ISO 8601 duration, e.g. PT2M42S (recommended for video rich results). */
    duration?: string;
    /** Schema / social title */
    name?: string;
    /** Short description for schema and previews */
    description?: string;
    /** Poster frame, relative path */
    thumbnailPath?: string;
    /** First published date, ISO 8601 date (YYYY-MM-DD) */
    uploadDate?: string;
    width?: number;
    height?: number;
}

/** Single item in properties page data (hero variant has heroTitle/priceRange; card variant has title/location/imageSrc) */
export interface PropertiesPageItem {
    id: string;
    /** URL slug for routing (e.g. grace-city-prime-lands) */
    slug: string;
    /** Hero-style property (e.g. Nhyira City Prime Lands) */
    heroTitle?: string;
    /** Hero carousel images (at least 6 for the hero section) */
    heroImages?: string[];
    ctoHref?: string;
    SectionTag?: string;
    priceRange?: string;
    /** Card-style property (e.g. Rocky Mountains) */
    title?: string;
    location?: string;
    imageSrc?: string;
    /** Short teaser for cards; if omitted, first paragraph of `description` is used. */
    cardSummary?: string;
    description: string;
    amenities: amenityProps[];
    href: string;
    price: string;
    locationDetails: LocationDetails;
    /** Optional: multiple price tiers (e.g. 2-bed $50,000, 3-bed $75,000) */
    priceTiers?: PriceTier[];
    /** Optional: payment mode description */
    paymentMode?: string;
    /** Optional: deposit breakdown (e.g. 30% of $50,000 is $15,000) */
    paymentDeposits?: PaymentDeposit[];
    /** Optional: extra info (e.g. "All rooms ensuite...") */
    additionalInfo?: string;
    /** Optional: bullet list for property-specific features (e.g. Rocky Mountains) */
    propertyFeatures?: string[];
    /** Optional: show a Lucide icon before single-card additionalInfo (e.g. home for rentals) */
    additionalInfoLeadingIcon?: "home";
    /** Optional: embedded promo video on the detail page + SEO (VideoObject, og:video) */
    promoVideo?: PropertyPromoVideo;
}

/** Single item in services page data */
export interface ServicesPageItem {
  id: string;
  slug: string;
  heroTitle?: string;
  heroImages?: string[];
  imageSrc?: string;
  ctoHref?: string;
  SectionTag?: string;
  /** Short teaser for cards; if omitted, first paragraph of `description` is used. */
  cardSummary?: string;
  description: string;
  additionalInfo?: string;
}
