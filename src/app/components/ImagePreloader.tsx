"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  propertiesPageData,
  servicesPageData,
  testimonialData,
} from "../Data/AppData";

const HOME_HERO_IMAGES = [
  "/PropertiesAssets/ImgSC1.webp",
  "/PropertiesAssets/ImgN5.webp",
  "/PropertiesAssets/Img22.webp",
  "/PropertiesAssets/ImgN7.webp",
  "/PropertiesAssets/ImgAY6.webp",
  "/PropertiesAssets/ImgAY8.webp",
];

const OTHER_IMAGES = [
  "/PropertiesAssets/ImgSC3.webp",
  "/PropertiesAssets/ImgAY9.webp",
  "/HomeAssets/Img111.webp",
  "/HomeAssets/Img222.webp",
];

function collectPreloadImages(): string[] {
  const seen = new Set<string>();
  const add = (src: string) => {
    if (src && !seen.has(src) && (src.endsWith(".webp") || src.endsWith(".png") || src.endsWith(".jpg"))) {
      seen.add(src);
    }
  };

  HOME_HERO_IMAGES.forEach(add);
  OTHER_IMAGES.forEach(add);

  propertiesPageData.forEach((p) => {
    if (p.heroImages?.[0]) add(p.heroImages[0]);
    else if (p.imageSrc) add(p.imageSrc);
  });

  servicesPageData.forEach((s) => {
    if (s.heroImages?.[0]) add(s.heroImages[0]);
  });

  testimonialData.forEach((t) => {
    if (t.imageSrc) add(t.imageSrc);
  });

  return Array.from(seen);
}

export default function ImagePreloader() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShouldLoad(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (!shouldLoad) return null;

  const images = collectPreloadImages();

  return (
    <div
      aria-hidden
      className="fixed -top-[9999px] -left-[9999px] w-1 h-1 overflow-hidden opacity-0 pointer-events-none"
    >
      {images.map((src) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={1920}
          height={1080}
          sizes="1920px"
          fetchPriority="low"
          className="object-cover"
        />
      ))}
    </div>
  );
}
