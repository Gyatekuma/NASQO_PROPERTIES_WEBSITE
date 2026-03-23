"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useLenis } from "./providers/LenisProvider";

const PARALLAX_SPEED = 0.15;

interface ParallaxPropertyImageProps {
  imageSrc: string;
  alt: string;
}

const ParallaxPropertyImage: React.FC<ParallaxPropertyImageProps> = ({
  imageSrc,
  alt,
}) => {
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
    <div
      ref={containerRef}
      className="image_container relative overflow-hidden w-full h-[45vh] xl:h-full rounded-3xl"
    >
      <div
        ref={transformRef}
        className="absolute top-[-10%] left-0 right-0 bottom-[-10%] will-change-transform"
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 1280px) 100vw, 42vw"
          className="object-cover z-0"
        />
      </div>
    </div>
  );
};

export default ParallaxPropertyImage;
