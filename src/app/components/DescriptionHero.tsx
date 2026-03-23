"use client";

import React, { useRef, useEffect } from "react";
import Image from "./OptimizedImage";
import { useLenis } from "./providers/LenisProvider";

const PARALLAX_SPEED = 0.15;

export interface DescriptionHeroProps {
  /** Image source URL (e.g. /HomeAssets/Img31.jpg) */
  imageSrc: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Main title. Pass a string for one line, or an array of strings for multiple lines (e.g. ["Your Home,", "Simplified"]) */
  title: string | string[];
  /** Body/subtitle paragraph shown on the overlay */
  subtitle: string;
  /** Optional tagline shown at bottom-right (e.g. "Smart, Elegant") */
  tagline?: string;
}

function DescriptionHero({
  imageSrc,
  imageAlt = "Hero",
  title,
  subtitle,
  tagline,
}: DescriptionHeroProps) {
  const titleLines = Array.isArray(title) ? title : [title];
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      const container = containerRef.current;
      const transformEl = transformRef.current;
      if (!container || !transformEl) return;

      const rect = container.getBoundingClientRect();
      const containerCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = viewportCenter - containerCenter;
      const offsetY = distance * PARALLAX_SPEED;
      transformEl.style.transform = `translate3d(0, ${offsetY}px, 0)`;
    };

    lenis.on("scroll", handleScroll);
    handleScroll();

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  return (
    <div className="about_description_hero">
      <div className="content">
        <div
          ref={containerRef}
          className="image_container relative overflow-hidden h-[45vh] z-0 rounded-3xl mb-[10%] xl:h-[75vh] xl:mt-[10%] 2xl:mt-[10%]"
        >
          <div
            ref={transformRef}
            className="absolute top-[-10%] left-0 right-0 bottom-[-10%] will-change-transform"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Overlay text — visible only on lg, xl, 2xl */}
          <div className="absolute inset-0 z-10 hidden lg:flex flex-col justify-between p-6 lg:p-8 xl:p-10 2xl:p-18">
            <div className="flex flex-col gap-4 lg:gap-5 xl:gap-28 2xl:gap-35">
              <h2 className="font-bricolage font-bold text-white text-left leading-tight">
                {titleLines.map((line, i) => (
                  <span
                    key={i}
                    className="block lg:text-2xl xl:text-3xl 2xl:text-4xl"
                  >
                    {line}
                  </span>
                ))}
              </h2>
              <p className="font-mona text-white text-left max-w-4xl lg:text-sm xl:text-sm xl:ml-52 xl:w-[55%] 2xl:text-lg 2xl:ml-60 2xl:w-auto leading-relaxed opacity-95">
                {subtitle}
              </p>
            </div>
            {tagline && (
              <p className="font-bricolage font-bold text-white self-end lg:text-2xl xl:text-3xl 2xl:text-4xl">
                {tagline}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionHero;
