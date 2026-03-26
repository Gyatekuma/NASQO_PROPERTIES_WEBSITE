"use client";

import React, { useRef, useEffect, type ReactNode } from "react";

export interface ScrollRevealSectionProps {
  selector: string;
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  staggerDelay?: number;
  triggerStart?: string;
  groupReveal?: boolean;
}

/** Shared props for `<Faq />` wrappers so Home, About, Services, and Properties behave identically. */
export const FAQ_SECTION_SCROLL_REVEAL: Pick<
  ScrollRevealSectionProps,
  "selector" | "groupReveal" | "y" | "duration" | "staggerDelay" | "triggerStart"
> = {
  selector: ".faq-reveal",
  groupReveal: true,
  y: 40,
  duration: 0.55,
  staggerDelay: 0.115,
  triggerStart: "top 85%",
};

export default function ScrollRevealSection({
  selector,
  children,
  className = "",
  y = 48,
  duration = 0.8,
  staggerDelay = 0.08,
  triggerStart = "top 88%",
  groupReveal = false,
}: ScrollRevealSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const reveals = scope.querySelectorAll<HTMLElement>(selector);
    if (!reveals.length) return;

    const rootMargin = triggerStart.includes("80%") ? "-20% 0px" : "-12% 0px";
    let observer: IntersectionObserver | null = null;

    if (groupReveal) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          reveals.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, i * (staggerDelay * 1000));
          });
        },
        { rootMargin, threshold: 0 }
      );
      observer.observe(scope);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
        },
        { rootMargin, threshold: 0 }
      );
      reveals.forEach((el) => observer!.observe(el));
    }

    reveals.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = `translateY(${y}px)`;
      el.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
    });

    return () => observer?.disconnect();
  }, [selector, groupReveal, y, duration, staggerDelay, triggerStart]);

  return (
    <div ref={sectionRef} className={className} data-scroll-reveal-managed>
      {children}
    </div>
  );
}
