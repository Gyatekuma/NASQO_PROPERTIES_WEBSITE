"use client";

import React, { useRef, type ReactNode, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealSectionProps {
  /** CSS selector for elements to animate (e.g. ".faq-reveal") */
  selector: string;
  /** Content to wrap - elements matching selector within will be animated */
  children: ReactNode;
  /** Additional className for the wrapper div */
  className?: string;
  /** Vertical offset for the "from" state in px */
  y?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay between staggered elements in seconds */
  staggerDelay?: number;
  /** ScrollTrigger start position (e.g. "top 88%") */
  triggerStart?: string;
  /** If true, trigger a single group reveal for all matched elements when the section enters view */
  groupReveal?: boolean;
}

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  selector,
  children,
  className = "",
  y = 48,
  duration = 0.8,
  staggerDelay = 0.08,
  triggerStart = "top 88%",
  groupReveal = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const scope = sectionRef.current;
      if (!scope) return;

      const reveals = gsap.utils.toArray<HTMLElement>(selector, scope);
      if (!reveals.length) return;

      if (groupReveal) {
        // Hide all elements first, then reveal them together when the section is in view
        gsap.set(reveals, { opacity: 0, y });

        gsap.to(reveals, {
          opacity: 1,
          y: 0,
          duration,
          ease: "power3.out",
          stagger: staggerDelay,
          scrollTrigger: {
            trigger: scope,
            start: triggerStart,
            toggleActions: "play none none reverse",
          },
        });
      } else {
        // Per-element scroll triggers (original behavior)
        reveals.forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y,
            duration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              toggleActions: "play none none reverse",
            },
            delay: i * staggerDelay,
          });
        });
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selector, groupReveal, y, duration, staggerDelay, triggerStart]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollRevealSection;
