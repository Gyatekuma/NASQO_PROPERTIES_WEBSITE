"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Button from "../components/button";
import Image from "next/image";
import SectionTags from "../components/SectionTags";
import Faq from "../components/Faq";
import Testimonial from "../components/Testimonial";
import { faqData, servicesPageData, testimonialData } from "../Data/AppData";
import type { ServicesPageItem } from "../Types/types";

const DEFAULT_HERO_IMAGES = [
  "/PropertiesAssets/Img1.jpg",
  "/PropertiesAssets/Img2.jpg",
  "/PropertiesAssets/Img3.jpg",
  "/PropertiesAssets/Img4.jpg",
  "/PropertiesAssets/Img5.jpg",
  "/PropertiesAssets/Img6.jpg",
];

const HERO_AUTO_SLIDE_INTERVAL_MS = 5500;

const DISCOVER_DESCRIPTION =
  "NASQO Properties offers a full suite of professional services to support your real estate and construction needs. From land acquisition to interior design, we bring expertise, transparency, and quality to every project.";

interface ServiceDetailTemplateProps {
  slug: string;
}

export default function ServiceDetailTemplate({ slug }: ServiceDetailTemplateProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const service = useMemo(
    () => servicesPageData.find((s) => s.slug === slug),
    [slug]
  );

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center p-20">
        <p className="text-neutral-600 text-lg">Service not found: {slug}</p>
      </div>
    );
  }

  const heroImages =
    service.heroImages?.length
      ? service.heroImages
      : service.imageSrc
        ? [service.imageSrc]
        : DEFAULT_HERO_IMAGES;
  const displayTitle = service.heroTitle ?? "Service";
  const otherServices = servicesPageData.filter((s) => s.slug !== service.slug);

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
      <div className="relative w-full max-w-[100vw] h-screen min-h-[500px] overflow-hidden">
        {/* Stacked hero images with crossfade + subtle zoom */}
        {heroImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${src})`,
              opacity: activeIndex === index ? 1 : 0,
              transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
              zIndex: activeIndex === index ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            aria-hidden={activeIndex !== index}
          />
        ))}
        <div className="absolute inset-0 z-[2] pointer-events-none bg-black/20" aria-hidden />
        <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/70" aria-hidden />

        <div className="relative z-10 flex flex-col h-full min-h-[500px]">
          <div className="flex flex-1 flex-col justify-center text-white">
            <div className="hero-texts ml-[5%] md:ml-[5%] 2xl:ml-[10%] font-bricolage">
              <h1 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl xl:mt-[15%] 2xl:mt-[15%] font-semibold tracking-tight">
                {displayTitle}
              </h1>
              <div className="mt-6 md:mt-8 2xl:mt-10 xl:w-[40%] 2xl:w-[35%]">
                <Button
                  text="Get in touch"
                  variants="secondary"
                  href={service.ctoHref ?? "/Contact"}
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex justify-end gap-3 px-[5%] pb-8 md:pb-10 xl:pb-12 2xl:px-[10%] 2xl:pb-16">
            {heroImages.map((src, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`relative w-20 h-20 md:w-24 md:h-24 xl:w-20 xl:h-20 2xl:w-22 2xl:h-22 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.35)] overflow-hidden shrink-0 transition-all duration-300 ${
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
                  sizes="(max-width: 768px) 96px, (max-width: 1280px) 112px, 128px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Description Section */}
      <div className="description-container w-full overflow-x-hidden">
        <div className="content mx-4 sm:mx-[5%] lg:mx-[6%] 2xl:mx-[10%] max-w-full">
          <div className="section_TAG w-full sm:w-[90%] 2xl:w-[40%]">
            <SectionTags
              name={service.SectionTag ?? "Services"}
              imageSrc="/Main_Assets/Tag_Icon_blue.svg"
              header={displayTitle}
            />
          </div>

          <div className="main_desc_container px-4 py-6 sm:px-6 sm:py-8 lg:px-[5%] lg:py-[5%] 2xl:px-[3%] 2xl:py-0 2xl:text-neutral-500 lg:my-[5%] lg:border lg:border-neutral-200 lg:rounded-3xl lg:-50">
            <div className="description_content font-mona text-sm sm:text-base lg:text-lg xl:text-xl my-6 sm:my-8 lg:my-[6%] xl:my-[4%] leading-relaxed">
              {service.description}
            </div>

            {/* {service.additionalInfo && (
              <div className="mt-6 sm:mt-8 lg:mt-10 xl:mt-12 pt-6 sm:pt-8 xl:pt-10 border-t border-neutral-200">
                <p className="font-mona text-sm sm:text-base xl:text-lg text-neutral-600 leading-relaxed bg-neutral-100/80 rounded-2xl p-4 sm:p-5 xl:p-6 border border-neutral-200/80">
                  {service.additionalInfo}
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Discover more Services */}
      <section className="mx-auto mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-8 pb-10 sm:pb-12 md:pb-16 xl:pb-24 w-[95%] sm:w-[90%] max-w-full 2xl:w-[80%] min-w-0 overflow-x-hidden box-border">
        <div className="w-full min-w-0">
          <div className="section_tag_container w-full 2xl:w-[50%]">
            <SectionTags
              name="Services"
              imageSrc="/Main_Assets/Tag_Icon_blue.svg"
              header="Discover more Services"
              subtext="From land acquisition to interior design, we offer a complete suite of professional services to support your real estate and construction needs."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 mt-6 sm:mt-8 xl:mt-10 w-full min-w-0">
            {otherServices.slice(0, 5).map((s) => {
              const name = s.heroTitle ?? "Service";
              const img = s.heroImages?.[0] ?? s.imageSrc ?? "/PropertiesAssets/Img1.jpg";
              return (
                <div
                  key={s.id}
                  className="services_card_container h-full border border-neutral-300 rounded-2xl sm:rounded-3xl w-full min-w-0 overflow-hidden"
                >
                  <div className="image_container relative overflow-hidden w-full h-[28vh] min-h-[180px] sm:h-[26vh] md:h-[28vh] xl:h-[36vh] 2xl:h-[42vh] z-0 flex items-center justify-center">
                    <Image
                      src={img}
                      alt={name}
                      fill
                      className="w-full h-full object-cover z-10"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="overlay inset-0 absolute bg-black/50 z-10" />
                    <div className="title absolute bottom-[10%] left-[5%] right-[5%] capitalize font-bricolage font-semibold text-white text-xl sm:text-2xl lg:text-3xl z-20">
                      {name}
                    </div>
                  </div>
                  <div className="subtext_button_container p-4 sm:p-[5%] lg:p-[6%]">
                    <div className="subtext font-mona text-sm sm:text-base leading-5 line-clamp-3">
                      {DISCOVER_DESCRIPTION}
                    </div>
                    <div className="button_container mt-4 sm:mt-[6%]">
                      <Button
                        text="View details"
                        variants="primary"
                        href={`/Services/${s.slug}`}
                        className="min-w-[140px] sm:min-w-[180px] w-auto shrink-0"
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
      <div className="testimonial_section_container flex items-center text-white bg-[#191723] mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-12 2xl:min-h-[85vh] md:py-[5%]">
        <Testimonial testimonials={testimonialData} />
      </div>

      {/* FAQ Section */}
      <div className="faq_section_container mx-4 sm:mx-[5%] 2xl:mx-[10%] py-8 sm:py-[8%] lg:py-[10%] xl:py-[8%] pb-12 sm:pb-16 xl:pb-24">
        <Faq
          faqs={faqData}
          imageSrc={heroImages[2] ?? "/PropertiesAssets/Img1.jpg"}
        />
      </div>
    </div>
  );
}
