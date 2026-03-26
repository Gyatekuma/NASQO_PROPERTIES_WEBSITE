"use client";

import Image from "./OptimizedImage";
import Link from "next/link";

interface CallToActionProps {
  imageSrc?: string;
  text?: string;
  buttonText?: string;
  href?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  imageSrc = "/HomeAssets/Img12.jpg",
  text = "Begin your path to success—contact us today.",
  buttonText = "Contact us",
  href = "/Contact",
}) => {
  return (
    <section
      className="cta_section relative w-full overflow-hidden"
      aria-label="Call to action"
    >
      <div className="relative w-full min-h-[50vh] md:min-h-[60vh] xl:h-screen 2xl:h-screen flex flex-col items-center justify-center py-20 md:py-28 px-6">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            priority={false}
            sizes="100vw"
          />
          {/* Dark overlay for readability */}
          <div
            className="absolute inset-0 bg-black/70 z-1"
            aria-hidden
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center max-w-4xl mx-auto">
          <h2 className="font-bricolage font-semibold text-2xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {text}
          </h2>
          <Link
            href={href}
            className="inline-flex items-center justify-center bg-white text-[#5F73DD] font-bricolage font-medium text-base md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
