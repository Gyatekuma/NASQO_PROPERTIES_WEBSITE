"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PER_ELEMENT_SELECTOR = [
  "[data-scroll-reveal]",
  ".scroll-reveal",
  ".about-reveal",
  ".services-reveal",
  ".properties-reveal",
  ".about-page-reveal",
  ".about-page-metric-reveal",
  ".vision-reveal",
  ".mission-reveal",
].join(", ");

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isManaged(el: Element): boolean {
  return !!el.closest("[data-scroll-reveal-managed]");
}

function isInsideGroup(el: Element): boolean {
  return !!el.closest("[data-scroll-reveal-group]");
}

function isStaggerItem(el: Element): boolean {
  return !!el.closest("[data-stagger-item]");
}

export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const cleanups: (() => void)[] = [];

    const groupContainers = document.querySelectorAll<HTMLElement>("[data-scroll-reveal-group]");
    groupContainers.forEach((container) => {
      const tag = container.querySelector<HTMLElement>(".core-values-tag");
      const cards = container.querySelectorAll<HTMLElement>(".core-values-card");

      if (reduced) {
        if (tag) {
          tag.style.opacity = "1";
          tag.style.transform = "none";
        }
        cards.forEach((c) => {
          c.style.opacity = "1";
          c.style.transform = "none";
        });
        return;
      }

      if (tag) {
        tag.style.opacity = "0";
        tag.style.transform = "translateY(40px)";
        tag.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
      }
      cards.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(48px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
      });

      const staggerMs = 180;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          if (tag) {
            tag.style.opacity = "1";
            tag.style.transform = "translateY(0)";
          }
          cards.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, (i + 1) * staggerMs);
          });
          obs.disconnect();
        },
        { rootMargin: "-12% 0px", threshold: 0 }
      );
      obs.observe(container);
      cleanups.push(() => obs.disconnect());
    });

    const staggerContainers = document.querySelectorAll<HTMLElement>("[data-stagger-reveal]");
    staggerContainers.forEach((container) => {
      const items = container.querySelectorAll<HTMLElement>("[data-stagger-item]");
      if (!items.length) return;

      const staggerMs = Math.max(
        0,
        parseInt(container.getAttribute("data-stagger-ms") ?? "115", 10) || 115
      );

      if (reduced) {
        items.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.transition = "none";
        });
        return;
      }

      items.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transitionProperty = "opacity, transform";
        el.style.transitionDuration = "0.62s";
        el.style.transitionTimingFunction = "cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.transitionDelay = `${i * staggerMs}ms`;
      });

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          items.forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
          obs.disconnect();
        },
        { rootMargin: "-6% 0px", threshold: 0 }
      );
      obs.observe(container);
      cleanups.push(() => obs.disconnect());
    });

    const seen = new Set<HTMLElement>();
    document.querySelectorAll<HTMLElement>(PER_ELEMENT_SELECTOR).forEach((el) => {
      if (isManaged(el) || isInsideGroup(el) || isStaggerItem(el)) return;
      seen.add(el);
    });

    seen.forEach((el) => {
      if (reduced) {
        el.style.opacity = "1";
        el.style.transform = "none";
        return;
      }

      const y = 48;
      const duration = 0.45;
      el.style.opacity = "0";
      el.style.transform = `translateY(${y}px)`;
      el.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.unobserve(el);
        },
        { rootMargin: "-8% 0px", threshold: 0 }
      );
      obs.observe(el);
      cleanups.push(() => obs.disconnect());
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
