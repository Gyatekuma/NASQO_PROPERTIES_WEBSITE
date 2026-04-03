"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Button from "../components/button";
import Image from "../components/OptimizedImage";
import SectionTags from "../components/SectionTags";
import Faq from "../components/Faq";
import Testimonial from "../components/Testimonial";
import ScrollRevealSection, {
  FAQ_SECTION_SCROLL_REVEAL,
} from "../components/ScrollRevealSection";
import MobileExpandableLineReveal from "../components/MobileExpandableLineReveal";
import { CheckCircle2, Sparkles, Home } from "lucide-react";
import { faqData, propertiesPageData, testimonialData } from "../Data/AppData";
import { getPropertyCardSummary } from "../lib/getPropertyCardSummary";

const DEFAULT_HERO_IMAGES = [
  "/PropertiesAssets/Img11.webp",
  "/PropertiesAssets/Img22.webp",
  "/PropertiesAssets/Img33.webp",
  "/PropertiesAssets/Img44.webp",
  "/PropertiesAssets/Img55.webp",
  "/PropertiesAssets/Img66.webp",
];

const HERO_AUTO_SLIDE_INTERVAL_MS = 5500;
const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAQEA";

interface PropertyDetailTemplateProps {
  slug: string;
}

/** Bold the discount clause on row hover (e.g. "10% discount", "no discount"). */
function renderPaymentTermWithDiscountHover(term: string) {
  const re = /^(.*?)(\d+%\s*discount|no\s+discount)(\.?)$/i;
  const m = term.match(re);
  if (!m) return term;
  const before = m[1];
  const discount = m[2];
  const after = m[3] ?? "";
  return (
    <>
      {before}
      <span className="transition-all duration-200 group-hover:font-bold">{discount}</span>
      {after}
    </>
  );
}

export default function PropertyDetailTemplate({ slug }: PropertyDetailTemplateProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const property = useMemo(
    () => propertiesPageData.find((p) => p.slug === slug),
    [slug]
  );

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-20">
        <p className="text-neutral-600 text-lg">Property not found: {slug}</p>
      </div>
    );
  }

  const locationDetails = property.locationDetails;
  const heroImages =
    property.heroImages?.length
      ? property.heroImages
      : property.imageSrc
        ? [property.imageSrc]
        : DEFAULT_HERO_IMAGES;
  const displayTitle = property.heroTitle ?? property.title ?? "Property";
  const displayPrice = property.priceRange ?? property.price;
  const hideHeroPriceTag =
    property.slug === "skycity-dwellings" ||
    property.slug === "abena-yedua-apartments" ||
    property.slug === "rocky-mountains-estate";
  const showPriceTag =
    Boolean((displayPrice ?? "").trim()) && !hideHeroPriceTag;
  const { additionalInfoItems, additionalInfoSingleCard } = (() => {
    if (!property.additionalInfo) return { additionalInfoItems: [], additionalInfoSingleCard: false };
    const raw = property.additionalInfo
      .replace(/\.\s*Special package:/i, "; Special package:")
      .replace(/\s*Special package:/i, "; Special package:");
    if (raw.includes(";")) {
      return {
        additionalInfoItems: raw.split(";").map((item) => item.trim()).filter(Boolean),
        additionalInfoSingleCard: false,
      };
    }
    return { additionalInfoItems: [], additionalInfoSingleCard: true };
  })();
  const otherProperties = propertiesPageData.filter((p) => p.slug !== property.slug);
  const paymentTermsItems = useMemo(() => {
    if (!property.paymentMode) return [];
    // Split on period boundaries and normalize whitespace.
    return property.paymentMode
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [property.paymentMode]);

  /** Matches `propertiesPageData` slug(s) for Nhyira City (Phase 4 agricultural details embedded under Deposit). */
  const usesPhase4EmbeddedDepositDetails =
    property.slug === "nhyira-city-estate" || property.slug === "nhyira-city-prime-lands";

  // Auto-slide hero images
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (heroImages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, HERO_AUTO_SLIDE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [heroImages.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % heroImages.length);
      }, HERO_AUTO_SLIDE_INTERVAL_MS);
    }
  };

  return (
    <div>
      {/* Hero Section - auto-sliding with crossfade + scale transition */}
      <div className="relative h-[100dvh] max-h-[100dvh] min-h-0 w-full max-w-[100vw] overflow-hidden">
        {/* Stacked hero images with crossfade + subtle zoom - Next/Image for optimization */}
        {heroImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              opacity: activeIndex === index ? 1 : 0,
              transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
              zIndex: activeIndex === index ? 1 : 0,
              transition:
                "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            aria-hidden={activeIndex !== index}
          >
            <Image
              src={src}
              alt={`${displayTitle} view ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 z-[2] pointer-events-none bg-black/20" aria-hidden />
        <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/70" aria-hidden />

        <div className="relative z-10 flex h-full min-h-0 flex-col">
          <div className="flex flex-1 flex-col justify-center text-white">
            <div className="hero-texts flex flex-col items-center text-center px-[5%] md:px-[8%] xl:px-0 xl:items-start xl:text-left xl:ml-[5%] 2xl:ml-[10%] font-bricolage">
              <h1 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl xl:mt-[15%] 2xl:mt-[15%] font-semibold tracking-tight">
                {displayTitle}
              </h1>
              <div className="mt-6 md:mt-8 2xl:mt-10 w-full flex justify-center xl:block xl:w-[40%] 2xl:w-[35%]">
                <Button
                  text="Get in touch"
                  variants="secondary"
                  href={property.ctoHref ?? "/Contact"}
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 shrink-0 px-[5%] pb-6 pt-2 max-md:pb-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+1rem))] md:pb-10 xl:px-[5%] xl:pb-12 2xl:px-[10%] 2xl:pb-16">
            <div className="flex -translate-y-16 xl:hidden items-center justify-center gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-6 h-2.5 bg-white"
                      : "w-2.5 h-2.5 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <div className="hidden xl:flex justify-end gap-3">
              {heroImages.map((src, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`relative w-20 h-20 xl:w-20 xl:h-20 2xl:w-22 2xl:h-22 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.35)] overflow-hidden shrink-0 transition-all duration-300 ${
                    activeIndex === index
                      ? "ring-1 ring-white ring-offset-2 ring-offset-transparent scale-105"
                      : "opacity-100"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${displayTitle} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 80px, 96px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Properties Description Section */}
      <div className="description-container pb-8 lg:pb-10 xl:pb-12">
        <div className="content mx-[5%] xl:mt-[5%] 2xl:mx-[10%]">
          <div className="section_TAG scroll-reveal 2xl:w-[40%]">
            <SectionTags
              name={property.SectionTag ?? "Services"}
              imageSrc="/Main_Assets/Tag_Icon_blue.svg"
              header={displayTitle}
              className={showPriceTag ? undefined : "max-lg:!mb-3"}
            />
            {showPriceTag && (
            <div className="price_tag font-bricolage font-bold text-2xl xl:text-4xl text-[#4361EE] mt-[-13%] xl:mt-[-4%]">
              {displayPrice}
            </div>
            )}
          </div>

          <div className="main_desc_container scroll-reveal pb-8 lg:px-[5%] lg:pb-10 xl:pb-12 2xl:px-[3%] 2xl:text-neutral-500 lg:my-[5%] lg:border lg:border-neutral-200 lg:rounded-3xl">
            <MobileExpandableLineReveal
              text={property.description}
              className={
                showPriceTag
                  ? "description_content font-bricolage text-base my-[10%] xl:my-[4%] xl:text-xl"
                  : "description_content font-bricolage text-base max-lg:mt-2 max-lg:mb-[10%] lg:my-[10%] xl:my-[4%] xl:text-xl"
              }
            />

            {property.propertyFeatures && property.propertyFeatures.length > 0 && (
              <div
                className="scroll-reveal mt-8 md:mt-10 xl:mt-12 mb-2 xl:mb-4"
                data-scroll-reveal
              >
                <div className="rounded-2xl bg-[#F3F5F8] p-4 sm:p-5 xl:p-6 border border-neutral-200">
                  <h3 className="font-bricolage font-semibold text-[#191723] text-sm sm:text-base uppercase tracking-wide mb-4 xl:mb-5">
                    Property features
                  </h3>
                  <ul
                    className="flex flex-col gap-2 sm:gap-2.5 xl:gap-3"
                    data-stagger-reveal
                    data-stagger-ms="90"
                  >
                    {property.propertyFeatures.map((feature, index) => (
                      <li
                        key={`${property.id}-feature-${index}`}
                        data-stagger-item
                        className="group flex items-start gap-3 rounded-lg bg-white border border-neutral-200 px-4 py-3.5 sm:px-4 sm:py-3.5 xl:px-5 xl:py-4 shadow-sm transition-all duration-200 hover:border-[#4361EE]/35 hover:shadow-md"
                      >
                        <CheckCircle2
                          className="w-5 h-5 xl:w-[22px] xl:h-[22px] shrink-0 text-[#4361EE] mt-0.5"
                          aria-hidden
                        />
                        <span className="font-mona text-sm sm:text-base text-neutral-800 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="lowerside flex flex-col gap-4 lg:flex-row lg:items-stretch lg:w-full 2xl:gap-12 mt-10 md:mt-12 xl:mt-[10%] xl:mb-[54] 2xl:mt-[5%]">
              <div className="amenities_container scroll-reveal bg-[#191723] p-[5%] xl:p-[3%] lg:w-[50%] rounded-3xl flex flex-col text-center">
                <div className="header text-white font-bricolage font-semibold text-xl pb-[3%] 2xl:text-2xl">
                  Community Amenities
                </div>
                <div className="amenities_list flex flex-col xl:grid xl:grid-cols-2 xl:grid-flow-col xl:grid-rows-5 gap-3 xl:gap-2 border border-[#4361EE] p-[4%] xl:p-[2.5%] rounded-2xl">
                  {property.amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={amenity.id} className="flex items-center gap-2">
                        <div className="amenity_item bg-[#4361EE] w-8 xl:w-7 h-8 xl:h-7 shrink-0 rounded-full flex items-center justify-center">
                          <Icon className="text-white w-5 h-auto xl:w-3.5 xl:h-auto" />
                        </div>
                        <div className="name font-mona text-white text-sm">
                          {amenity.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="maps_container scroll-reveal bg-white lg:w-[50%] rounded-3xl p-[5%] xl:p-[2.5%] 2xl:p-[2%] shadow-lg flex flex-col gap-3 xl:gap-4 lg:h-full">
                <h3 className="text-[#191723] font-bricolage font-semibold text-base sm:text-lg">
                  {locationDetails.sectionTitle}
                </h3>
                <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 flex-1 min-h-[180px]">
                  <iframe
                    title={locationDetails.mapTitle}
                    src={locationDetails.mapEmbedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="flex flex-col items-center gap-3 xl:flex-row xl:justify-between xl:items-center xl:gap-4">
                  <p className="text-[#68647a] font-mona font-semibold text-sm sm:text-base text-center xl:text-left">
                    {locationDetails.locationName}
                  </p>
                  <div className="w-full flex justify-center xl:w-auto xl:flex-initial">
                    <Button
                      text={locationDetails.brochureButtonText}
                      variants="primary"
                      href={locationDetails.brochureHref}
                      download={
                        locationDetails.brochureHref.startsWith("/PropertiesAssets/")
                          ? true
                          : undefined
                      }
                      className="whitespace-nowrap w-auto min-w-[180px] sm:min-w-[200px] xl:min-w-[220px] 2xl:min-w-[240px] xl:px-8 2xl:px-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Prices & Payment - right after amenities and map */}
            {(property.priceTiers?.length || property.paymentMode || property.paymentDeposits?.length) ? (
              <div className="mt-10 xl:mt-12 2xl:mt-0 2xl:my-[5%] pt-10 xl:pt-12 xl:pb-8 2xl:pb-10 border-t border-neutral-200">
                {property.slug === "rocky-mountains-estate" ? (
                  // Original Rocky Mountains Estate layout
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 xl:items-stretch">
                    {property.priceTiers && property.priceTiers.length > 0 && (
                      <div className="flex flex-col h-full scroll-reveal">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="flex h-6 w-1 rounded-full bg-[#4361EE]" aria-hidden />
                          <h3 className="font-bricolage font-semibold text-[#191723] text-base xl:text-lg tracking-tight">
                            Prices
                          </h3>
                        </div>
                        <div className="bg-[#F3F5F8] rounded-2xl p-5 xl:p-6 border border-neutral-200 flex-1">
                          <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full content-between auto-rows-fr"
                            data-stagger-reveal
                            data-stagger-ms="115"
                          >
                            {property.priceTiers.map((tier, i) => (
                              <div
                                key={i}
                                data-stagger-item
                                className="group relative bg-white border border-neutral-200 rounded-xl p-4 xl:p-5 flex flex-col justify-center gap-0.5 hover:border-[#4361EE]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                              >
                                <p className="font-mona text-[#191723] text-xs xl:text-sm capitalize line-clamp-2 leading-snug">
                                  {tier.label}
                                </p>
                                <p className="font-bricolage font-bold text-[#4361EE] text-xl xl:text-2xl leading-tight">
                                  {tier.price}
                                </p>
                                <p className="font-mona text-neutral-400 text-xs leading-tight">Total price</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {(property.paymentMode || (property.paymentDeposits && property.paymentDeposits.length > 0)) && (
                      <div className="flex flex-col h-full scroll-reveal">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="flex h-6 w-1 rounded-full bg-[#4361EE]" aria-hidden />
                          <h3 className="font-bricolage font-semibold text-[#191723] text-base xl:text-lg tracking-tight">
                            Mode of payment
                          </h3>
                        </div>
                        <div className="bg-[#F3F5F8] rounded-2xl p-5 xl:p-6 border border-neutral-200 flex-1">
                          {property.paymentMode && (
                            <div className="bg-white border border-neutral-200 rounded-xl p-4 xl:p-5 mb-4 transition-all duration-200 hover:border-[#4361EE]/40 hover:shadow-md">
                              <p className="font-mona text-[#191723] text-sm xl:text-base leading-relaxed">
                                {property.paymentMode}
                              </p>
                            </div>
                          )}
                          {property.paymentDeposits && property.paymentDeposits.length > 0 && (
                            <div>
                              <p className="font-bricolage font-semibold text-[#191723] text-xs uppercase tracking-wider mb-2">
                                Deposit (30%)
                              </p>
                              <ul
                                className="flex flex-col gap-2"
                                data-stagger-reveal
                                data-stagger-ms="115"
                              >
                                {property.paymentDeposits.map((dep, i) => (
                                  <li
                                    key={i}
                                    data-stagger-item
                                    className="flex flex-wrap justify-between items-center gap-3 px-4 py-3 font-mona text-xs xl:text-sm text-[#191723] bg-white border border-neutral-200 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4361EE]/40 hover:shadow-md"
                                  >
                                    <span>{dep.label}</span>
                                    <span className="font-bold text-[#4361EE] shrink-0">{dep.amount}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // New organized layout for other properties (e.g. Nhyira City Prime Lands)
                  <div>
                    {/* Two columns: Prices + Payment terms (left) | Deposit plans (right) — aligned with Rocky Mountains pricing row */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 xl:items-stretch">
                      {/* LEFT — Prices by phase + Payment terms (stacked) */}
                      <div
                        className={`flex flex-col gap-6 xl:gap-8 h-full min-h-0 w-full min-w-0 ${
                          !(property.paymentDeposits && property.paymentDeposits.length > 0)
                            ? "xl:col-span-2"
                            : ""
                        }`}
                      >
                        {property.priceTiers && property.priceTiers.length > 0 && (
                          <div className="flex flex-col scroll-reveal">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="flex h-6 w-1 rounded-full bg-[#4361EE]" aria-hidden />
                              <h3 className="font-bricolage font-semibold text-[#191723] text-base xl:text-lg tracking-tight">
                                Prices by phase
                              </h3>
                            </div>
                            <div className="bg-[#F3F5F8] rounded-2xl p-5 xl:p-6 border border-neutral-200">
                              <div
                                className="flex flex-col gap-3"
                                data-stagger-reveal
                                data-stagger-ms="115"
                              >
                                {property.priceTiers.map((tier, i) => (
                                  <div
                                    key={i}
                                    data-stagger-item
                                    className="group bg-white border border-neutral-200 rounded-xl p-4 xl:p-5 flex flex-col justify-center gap-0.5 hover:border-[#4361EE]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                                  >
                                    <p className="font-mona text-[#191723] text-xs xl:text-sm uppercase tracking-wide leading-snug">
                                      {tier.label}
                                    </p>
                                    <p className="font-bricolage font-bold text-[#4361EE] text-xl xl:text-2xl leading-tight">
                                      {tier.price}
                                    </p>
                                    <p className="font-mona text-neutral-400 text-xs leading-tight">
                                      Total land price
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {property.paymentMode && paymentTermsItems.length > 0 && (
                          <div
                            className={`flex min-h-0 flex-col scroll-reveal ${
                              property.paymentDeposits?.length && paymentTermsItems.length ? "flex-1" : ""
                            }`}
                          >
                            <div className="mb-4 flex shrink-0 items-center gap-2">
                              <span className="flex h-6 w-1 rounded-full bg-[#4361EE]" aria-hidden />
                              <h3 className="font-bricolage font-semibold text-[#191723] text-base xl:text-lg tracking-tight">
                                Payment terms
                              </h3>
                            </div>
                            <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-neutral-200 bg-[#F3F5F8] p-5 xl:p-6">
                              <ul
                                className="flex min-h-0 flex-1 flex-col gap-2 max-xl:justify-start xl:justify-between xl:gap-3"
                                data-stagger-reveal
                                data-stagger-ms="115"
                              >
                                {paymentTermsItems.map((term, idx) => (
                                  <li
                                    key={`${property.id}-payment-term-${idx}`}
                                    data-stagger-item
                                    className="group bg-white border border-neutral-200 rounded-xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4361EE]/40 hover:shadow-md"
                                  >
                                    <div className="flex items-start gap-2.5">
                                      <CheckCircle2
                                        className="w-4 h-4 mt-0.5 shrink-0 text-[#4361EE]"
                                        aria-hidden
                                      />
                                      <p className="font-mona text-[#191723] text-sm xl:text-base leading-relaxed">
                                        {renderPaymentTermWithDiscountHover(term)}
                                      </p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* RIGHT — Deposit & instalment plans */}
                      {property.paymentDeposits && property.paymentDeposits.length > 0 && (
                        <div
                          className={`flex h-full min-h-0 flex-col w-full min-w-0 scroll-reveal ${
                            !(property.priceTiers?.length || (property.paymentMode && paymentTermsItems.length))
                              ? "xl:col-span-2"
                              : ""
                          }`}
                        >
                          <div className="mb-4 flex shrink-0 items-center gap-2">
                            <span className="flex h-6 w-1 rounded-full bg-[#4361EE]" aria-hidden />
                            <h3 className="font-bricolage font-semibold text-[#191723] text-base xl:text-lg tracking-tight">
                              Deposit & instalment plans
                            </h3>
                          </div>
                          <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-neutral-200 bg-[#F3F5F8] p-5 xl:p-6">
                            <ul
                              className="flex flex-col gap-3"
                              data-stagger-reveal
                              data-stagger-ms="115"
                            >
                              {property.paymentDeposits.map((dep, i) => {
                                const [rawTitle, ...restParts] = dep.label.split(":");
                                const title = rawTitle?.trim();
                                const restText = restParts.join(":").trim();
                                const isPhase4 =
                                  usesPhase4EmbeddedDepositDetails &&
                                  title?.toLowerCase().startsWith("phase 4");
                                const embeddedAdditionalInfo =
                                  isPhase4 && property.additionalInfo && additionalInfoItems.length > 0;
                                return (
                                  <li
                                    key={i}
                                    data-stagger-item
                                    tabIndex={0}
                                    className={`group rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#4361EE]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE]/60 focus-visible:border-[#4361EE]/40 ${
                                      embeddedAdditionalInfo
                                        ? "flex flex-col items-stretch gap-2 px-4 py-3"
                                        : "flex min-h-[4.25rem] items-center px-4 py-4 xl:min-h-[5rem] xl:px-5 xl:py-5"
                                    }`}
                                  >
                                    <p className="font-mona text-[#191723] text-sm xl:text-base leading-relaxed">
                                      {title && (
                                        <span
                                          className="font-bricolage font-semibold mr-1 capitalize transition-colors duration-200 group-hover:font-bold group-hover:text-[#4361EE] group-focus-visible:font-bold group-focus-visible:text-[#4361EE]"
                                        >
                                          {title}:
                                        </span>
                                      )}
                                      {restText}
                                    </p>

                                    {embeddedAdditionalInfo && (
                                      <div className="mt-2 w-full rounded-2xl bg-[#F3F5F8] border border-neutral-200/80 px-3 pt-3 pb-3 xl:px-4 xl:pt-3 xl:pb-3">
                                        <ul
                                          className="flex flex-col gap-2"
                                          data-stagger-reveal
                                          data-stagger-ms="115"
                                        >
                                          {additionalInfoItems.map((item, index) => (
                                            <li
                                              key={`${property.id}-phase4-details-${index}`}
                                              data-stagger-item
                                              className="group rounded-xl border border-neutral-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#4361EE]/30"
                                            >
                                              <div className="flex items-start gap-2.5">
                                                <CheckCircle2
                                                  className="w-4 h-4 mt-0.5 shrink-0 text-[#4361EE]"
                                                  aria-hidden
                                                />
                                                <span className="font-mona text-sm xl:text-base leading-relaxed text-neutral-700">
                                                  {(() => {
                                                    const cleaned = item
                                                      .replace(/^Phase\s*4\s*\(\s*Agricultural\s+zone\s*\)\s*:\s*/i, "")
                                                      .trim();
                                                    const match = cleaned.match(/\([^)]*\)/);
                                                    if (!match || match.index == null) return cleaned;
                                                    const start = match.index;
                                                    const end = start + match[0].length;
                                                    const before = cleaned.slice(0, start);
                                                    const bracket = cleaned.slice(start, end);
                                                    const after = cleaned.slice(end);
                                                    return (
                                                      <>
                                                        {before}
                                                        <span className="transition-all duration-200 group-hover:font-bold">
                                                          {bracket}
                                                        </span>
                                                        {after}
                                                      </>
                                                    );
                                                  })()}
                                                </span>
                                              </div>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Additional info — keep directly below prices/deposit plans */}
            {property.additionalInfo && !usesPhase4EmbeddedDepositDetails && (
              <div className="mt-10 xl:mt-12 pt-8 xl:pt-10 border-t border-neutral-200">
                <div className="font-mona text-base xl:text-lg text-neutral-700 leading-relaxed bg-[#F3F5F8] rounded-2xl p-5 xl:p-6 border border-neutral-200">
                  {additionalInfoSingleCard ? (
                    <div className="rounded-xl bg-white border border-neutral-200 p-4 xl:p-5 transition-all duration-200 hover:border-[#4361EE]/40 hover:shadow-md">
                      <p
                        className={`text-sm xl:text-base leading-relaxed text-neutral-700 ${
                          property.additionalInfoLeadingIcon ? "flex items-start gap-2.5" : ""
                        }`}
                      >
                        {property.additionalInfoLeadingIcon === "home" && (
                          <Home className="w-5 h-5 shrink-0 text-[#4361EE] mt-0.5" aria-hidden />
                        )}
                        {property.additionalInfo}
                      </p>
                    </div>
                  ) : additionalInfoItems.length > 0 ? (
                    <ul className="flex flex-col gap-2 xl:gap-3" data-stagger-reveal data-stagger-ms="115">
                      {additionalInfoItems.map((item, index) => (
                        <li
                          key={`${property.id}-additional-${index}`}
                          data-stagger-item
                          className="group flex items-start gap-3 rounded-xl bg-white border border-neutral-200 p-3 xl:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4361EE]/40 hover:shadow-md"
                        >
                          {item.toLowerCase().startsWith("special package") ? (
                            <Sparkles className="w-5 h-5 mt-0.5 shrink-0 text-[#4361EE]" aria-hidden />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-[#4361EE]" aria-hidden />
                          )}
                          <span className="text-sm xl:text-base leading-relaxed text-neutral-700">
                            {item.startsWith("Phase 4 (Agricultural zone):") ? (
                              <>
                                <span className="font-semibold transition-all duration-200 group-hover:font-bold group-hover:text-[#4361EE]">
                                  Phase 4 (Agricultural zone):
                                </span>{" "}
                                {(() => {
                                  const rest = item.replace("Phase 4 (Agricultural zone):", "").trim();
                                  const includesMatch = rest.match(/\(includes[^)]*\)/i);
                                  if (!includesMatch) return rest;
                                  const includesText = includesMatch[0];
                                  const [beforeIncludes, afterIncludesRaw] = rest.split(includesText);
                                  return (
                                    <>
                                      {beforeIncludes}
                                      <span className="font-semibold transition-all duration-200 group-hover:font-bold">
                                        {includesText}
                                      </span>
                                      {afterIncludesRaw}
                                    </>
                                  );
                                })()}
                              </>
                            ) : item.toLowerCase().startsWith("special package:") ? (
                              (() => {
                                const prefix = "Special package:";
                                const rest = item.replace(/special package:/i, "").trim();
                                const detailsMatch = rest.match(/\(site plan and indenture\)/i);
                                if (!detailsMatch) {
                                  return (
                                    <>
                                      <span className="font-semibold transition-all duration-200 group-hover:font-bold group-hover:text-[#4361EE]">
                                        {prefix}
                                      </span>{" "}
                                      {rest}
                                    </>
                                  );
                                }
                                const detailsText = detailsMatch[0];
                                const [beforeDetails, afterDetailsRaw] = rest.split(detailsText);
                                return (
                                  <>
                                    <span className="font-semibold transition-all duration-200 group-hover:font-bold group-hover:text-[#4361EE]">
                                      {prefix}
                                    </span>{" "}
                                    {beforeDetails}
                                    <span className="font-semibold transition-all duration-200 group-hover:font-bold">
                                      {detailsText}
                                    </span>
                                    {afterDetailsRaw}
                                  </>
                                );
                              })()
                            ) : (
                              (() => {
                                const includesMatch = item.match(/\(includes[^)]*\)/i);
                                if (!includesMatch) return item;
                                const includesText = includesMatch[0];
                                const [beforeIncludes, afterIncludesRaw] = item.split(includesText);
                                return (
                                  <>
                                    {beforeIncludes}
                                    <span className="font-semibold transition-all duration-200 group-hover:font-bold">
                                      {includesText}
                                    </span>
                                    {afterIncludesRaw}
                                  </>
                                );
                              })()
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{property.additionalInfo}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Discover more Properties */}
      <section className="mx-auto mt-16 xl:mt-24 2xl:mt-14 pb-16 xl:pb-24 w-[90%] max-w-full 2xl:w-[80%] min-w-0 overflow-x-hidden box-border">
        <div className="w-full min-w-0">
          <div className="section_tag_container scroll-reveal 2xl:w-[50%]">
            <SectionTags
              name="properties"
              imageSrc="/Main_Assets/Tag_Icon_blue.svg"
              header="Discover more Properties like this"
              subtext="We began with a vision to help you discover premium properties that perfectly match your lifestyle and aspirations."
            />
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 mt-8 xl:mt-10 w-full min-w-0"
            data-stagger-reveal
            data-stagger-ms="120"
          >
            {otherProperties.slice(0, 3).map((p) => {
              const name = p.heroTitle ?? p.title ?? "Property";
              const img = p.heroImages?.[0] ?? p.imageSrc ?? "/PropertiesAssets/Img11.webp";
              return (
                <div
                  key={p.id}
                  data-stagger-item
                  className="services_card_container h-full border border-neutral-300 rounded-3xl w-full min-w-0"
                >
                  <div className="image_container relative overflow-hidden w-full h-[32vh] md:h-[28vh] xl:h-[36vh] 2xl:h-[42vh] z-0 rounded-t-3xl flex items-center justify-center">
                    <Image
                      src={img}
                      alt={name}
                      fill
                      className="w-full h-full object-cover z-10"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="overlay inset-0 absolute bg-black/50 z-10" />
                    <div className="title absolute bottom-[10%] left-0 right-0 px-4 text-center capitalize font-bricolage font-semibold text-white text-lg sm:text-xl md:text-2xl xl:text-2xl z-20 leading-tight">
                      {name}
                    </div>
                  </div>
                  <div className="subtext_button_container p-[6%]">
                    <div className="subtext font-mona text-base xl:text-sm leading-5 line-clamp-3">
                      {getPropertyCardSummary(p)}
                    </div>
                    <div className="button_container mt-[6%]">
                      <Button
                        text="View details"
                        variants="primary"
                        href={`/Properties/${p.slug}`}
                        className="min-w-[140px] xl:min-w-[160px] w-auto shrink-0 text-sm"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <div className="testimonial_section_container scroll-reveal flex items-center text-white bg-[#191723] mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-16 2xl:min-h-[85vh] md:py-[5%]">
        <Testimonial testimonials={testimonialData} />
      </div>

      {/* FAQ Section */}
      <ScrollRevealSection
        {...FAQ_SECTION_SCROLL_REVEAL}
        className="faq_section_container mx-[5%] 2xl:mx-[10%] py-[10%] xl:py-[8%] pb-16 xl:pb-24"
      >
        <Faq
          faqs={faqData}
          imageSrc={heroImages[0] ?? "/PropertiesAssets/Img11.webp"}
        />
      </ScrollRevealSection>
    </div>
  );
}
