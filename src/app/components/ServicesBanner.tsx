"use client";

import React, { useRef, useEffect } from "react";
import Image from "./OptimizedImage";
import { useLenis } from "./providers/LenisProvider";

const PARALLAX_SPEED = 0.15;

const ServicesBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      const banner = bannerRef.current;
      const transformEl = transformRef.current;
      if (!banner || !transformEl) return;

      const rect = banner.getBoundingClientRect();
      const bannerCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = viewportCenter - bannerCenter;
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
      ref={bannerRef}
      className="services_banner relative overflow-hidden w-full h-[40vh] xl:h-[70vh] mt-[15%] xl:mt-[5%] 2xl:mt-[5%] rounded-3xl"
    >
      <div
        ref={transformRef}
        className="absolute top-[-10%] left-0 right-0 bottom-[-10%] will-change-transform"
      >
        <Image
          src="/PropertiesAssets/ImgAY9.webp"
          alt="services banner"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAQEA"
          className="object-cover"
        />
      </div>

      <div className="overlay_section absolute inset-0 bg-black/50 z-0" />

      {/* <div className="services_banner_text absolute bottom-10 md:bottom-25 lg:bottom-20 xl:bottom-40 2xl:bottom-40 px-[5%] md:px-[17%] lg:px-[18%] xl:px-[6%] 2xl:px-[6%] text-white z-10 w-full flex flex-col justify-center gap-4 xl:gap-10 2xl:gap-10">
        <p className="font-bricolage font-semibold text-xl md:text-2xl lg:text-4xl md:w-[95%] lg:w-full xl:w-[60%] 2xl:w-[50%] w-[95%] tracking-tigher">
          Your Key to Stress-Free Property
        </p>
        <p className="font-bricolage font-mona text-base md:text-lg lg:text-2xl xl:text-base 2xl:text-lg  leading-5 md:leading-6 lg:leading-7 xl:leading-5  tracking-tigher w-[95%] md:w-[95%] lg:w-full xl:w-[60%] 2xl:w-[44%]">
          From trusted listings to seamless transactions, we make owning
          property simple and secure. Discover spaces designed for comfort,
          value, and long-term peace of mind. Unlock your future today.
        </p>
      </div> */}
    </div>
  );
};

export default ServicesBanner;
