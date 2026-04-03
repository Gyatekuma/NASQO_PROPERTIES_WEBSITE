import React from 'react'
import Image from './OptimizedImage'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type CardSize = "small" | "large";

interface PropertyCardsProps {
    title?: string;
    subtext?: string;
    /** Shown on the mobile overlay with title (not the long teaser). */
    location?: string;
    imageSrc: string;
    href: string;
    alt: string;
    cardSize?: CardSize;
    className?: string;
}

const sizeStyles: Record<CardSize, string> = {
    // Slightly taller again on desktop (another ≈5%)
    small: "h-[40vh] md:h-[27vh] xl:h-[29vh] 2xl:h-[31vh]",
    large: "h-[20vh]",
};

const PropertyCards: React.FC<PropertyCardsProps> = ({
    title,
    subtext,
    location,
    imageSrc,
    href,
    alt,
    cardSize = "small",
    className = ""
}) => {
  const locationLine = location?.trim() ?? "";

  return (
    <div
      className={`image_container group relative overflow-hidden w-full ${sizeStyles[cardSize]} rounded-3xl my-[10%] md:my-[5%] ${className}`}
    >
        <Link href={href} className="block h-full w-full">
            <Image
                src={imageSrc}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className='w-full h-full object-cover'
            />

            {/* Mobile: arrow badge — upper right (bounce on card hover via globals.css) */}
            <span
              className="property-card-arrow-bounce-target md:hidden pointer-events-none absolute right-2.5 top-2.5 z-[7] flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
              aria-hidden
            >
              <ArrowRight className="h-4 w-4 shrink-0 text-black" strokeWidth={2.25} />
            </span>

            {/* Mobile: bottom overlay (flush to card edge) + white title + location */}
            <div className="md:hidden pointer-events-none absolute inset-x-0 bottom-0 z-[6] flex min-h-[42%] w-full flex-col justify-end rounded-b-3xl bg-gradient-to-t from-black/85 via-black/55 to-transparent">
              <div className="w-full px-4 pb-9 pt-10 text-center">
                {title ? (
                  <p className="font-bricolage text-lg font-semibold text-white leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                    {title}
                  </p>
                ) : null}
                {locationLine ? (
                  <p className="font-mona mt-1 text-sm font-medium leading-snug text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    {locationLine}
                  </p>
                ) : null}
              </div>
            </div>

            <div className='overlay_section hidden md:block absolute inset-0 bg-black/50 z-[8] opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

            <div className="content_container hidden md:flex absolute inset-0 z-[9] w-full h-full flex-col justify-between px-[6%] pb-[9%] pt-[8%] sm:px-[7%] sm:pb-[10%]">
                <div className="property-card-arrow-bounce-target arrow_container self-end shrink-0 rounded-full bg-white p-2 xl:p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowRight className="h-4 w-4 text-black xl:h-[18px] xl:w-[18px]" strokeWidth={2.25} />
                </div>

                <div className="text_container flex w-full max-w-[92%] flex-col items-start gap-2 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="title font-bricolage text-xl font-semibold text-white leading-snug tracking-tight sm:text-2xl">{title}</p>
                    <p className="subtext line-clamp-3 font-mona text-left text-sm leading-relaxed text-white/95 tracking-tight">{subtext}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default PropertyCards
