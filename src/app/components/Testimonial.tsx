"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import SectionTags from "./SectionTags";
import Image from "next/image";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";

const AUTO_SLIDE_INTERVAL_MS = 6000;

export interface testimonialProps {
  id: string;
  description: string;
  name: string;
  title: string;
  icon: string;
  imageSrc: string;
}

interface TestimonialComponentProps {
  testimonials: testimonialProps[];
}

const Testimonial: React.FC<TestimonialComponentProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const current = testimonials[currentIndex];

  const goToNext = useCallback(
    () =>
      setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1)),
    [testimonials.length]
  );

  const goToPrev = useCallback(
    () =>
      setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1)),
    [testimonials.length]
  );

  // Auto-slide: advance to next testimonial every N seconds
  useEffect(() => {
    if (!testimonials.length || testimonials.length <= 1) return;

    const startInterval = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDirection("next");
        goToNext();
      }, AUTO_SLIDE_INTERVAL_MS);
    };

    startInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [testimonials.length, goToNext]);

  // When user manually changes slide, reset the auto-slide timer
  const handlePrev = () => {
    setDirection("prev");
    goToPrev();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDirection("next");
        goToNext();
      }, AUTO_SLIDE_INTERVAL_MS);
    }
  };

  const handleNext = () => {
    setDirection("next");
    goToNext();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDirection("next");
        goToNext();
      }, AUTO_SLIDE_INTERVAL_MS);
    }
  };

  if (!current) return null;

  const { description, name, title, icon, imageSrc } = current;

  const contentAnimationClass =
    direction === "next"
      ? "testimonial-content-enter-from-next"
      : "testimonial-content-enter-from-prev";

  return (
    <div className="testimonial_section-container">
      <div className="testimonial_content mx-[5%] 2xl:mx-[10%] flex flex-col gap-8 md:gap-12 xl:flex-row xl:items-center xl:gap-12">
        {/* Left Section - ~60-70% on xl */}
        <div className="left_section xl:flex-[2] xl:mb-[7%] 2xl:mb-[9%] xl:min-w-0">
          <div className="testimonial_tag">
            <SectionTags
              name="testimonials"
              imageSrc="/Main_Assets/Tag_Icon_blue.svg"
              header="What our clients say about us"
            />
          </div>

          <div
            key={`text-${currentIndex}`}
            className={`main_testimonial_description flex flex-col gap-6 xl:flex-row xl:gap-8 mt-6 xl:mt-8 2xl:mt-10 ${contentAnimationClass}`}
          >
            <div className="desc_tag relative xl:flex-shrink-0">
              <Image
                src={icon}
                alt={name}
                width={100}
                height={100}
                className="w-[8%] xl:w-10 2xl:w-10 h-auto"
              />
            </div>
            <div className="name-title_text flex flex-col gap-4 xl:gap-8 xl:w-[80%] ">
              <div className="description font-mona text-base md:text-lg xl:text-base 2xl:text-lg leading-6 md:leading-8">
                {description}
              </div>
              <div className="name_title hidden xl:flex xl:flex-col xl:gap-0">
                <p className="font-bricolage font-semibold xl:text-lg">
                  {name}
                </p>
                <p className="font-mona text-sm text-white/50">{title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - ~30-40% on xl, arrows above image */}
        <div className="right_section flex flex-col xl:flex-col-reverse xl:flex-[1] xl:gap-8 xl:min-w-0 xl:items-end">
          <div
            key={`right-${currentIndex}`}
            className={`idenity_section flex gap-6 items-center xl:flex-col xl:items-stretch xl:w-full ${contentAnimationClass}`}
          >
            <div className="image_section relative overflow-hidden w-full h-[15vh] md:h-[20vh] xl:h-[45vh] 2xl:h-[42vh] z-0 rounded-3xl">
              <div className="relative w-full h-full">
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  sizes="(max-width: 1280px) 100vw, 35vw"
                  className="w-[30%] xl:w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="name_title w-[95%] xl:hidden">
              <p className="font-bricolage text-xl md:text-2xl font-semibold">
                {name}
              </p>
              <p className="font-mona text-sm md:text-base text-white/50">
                {title}
              </p>
            </div>
          </div>
          <div className="arrows flex gap-4 xl:mr-[9%] 2xl:mr-[10%] my-[5%] xl:mb-4 xl:mt-0">
            <button
              type="button"
              onClick={handlePrev}
              className="left_arrow bg-white/30 xl:bg-gray-600 rounded-full p-[3%] xl:p-[15%] 2xl:p-[20%] cursor-pointer hover:bg-white/40 xl:hover:bg-gray-500 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous testimonial"
            >
              <MoveLeftIcon className="w-6 h-auto text-white" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="left_arrow bg-white/30 xl:bg-gray-600 rounded-full p-[3%] xl:p-[15%] 2xl:p-[20%] cursor-pointer hover:bg-white/40 xl:hover:bg-gray-500 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next testimonial"
            >
              <MoveRightIcon className="w-6 h-auto text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
