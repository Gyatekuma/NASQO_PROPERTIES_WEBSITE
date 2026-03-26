"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import type { LenisOptions } from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<InstanceType<typeof Lenis> | null>(null);

const getLenisOptions = (): LenisOptions => {
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return {
    autoRaf: false,
    /** Slightly higher lerp = follows input faster; too low feels “stuck” behind the wheel. */
    lerp: prefersReducedMotion ? 1 : 0.12,
    smoothWheel: !prefersReducedMotion,
    wheelMultiplier: 1,
    touchMultiplier: 1.15,
    /** Off: avoids touch “fighting” Lenis at scroll boundaries (common stuck feeling on mobile). */
    syncTouch: false,
    syncTouchLerp: 0.1,
    anchors: true,
    infinite: false,
  };
};

export function LenisProvider({
  children,
  options = {},
}: {
  children: ReactNode;
  options?: Partial<LenisOptions>;
}) {
  const [lenis, setLenis] = useState<InstanceType<typeof Lenis> | null>(null);
  const optionsRef = useRef(options);
  const pathname = usePathname();

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenisInstance = new Lenis({
      ...getLenisOptions(),
      ...optionsRef.current,
    });

    /** GSAP must read scroll position from Lenis, not native window — fixes stuck/janky scroll with ScrollTrigger. */
    const scroller = document.documentElement;
    const previousScroller = ScrollTrigger.defaults({} as never).scroller as
      | Element
      | Window
      | undefined;
    ScrollTrigger.defaults({ scroller } as never);

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return lenisInstance.scroll;
      },
      scrollLeft(value) {
        if (arguments.length && typeof value === "number") {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenisInstance.on("scroll", ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    setLenis(lenisInstance);

    const refresh = () => ScrollTrigger.refresh();
    const handleLoad = refresh;
    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", refresh);
    requestAnimationFrame(() => {
      requestAnimationFrame(refresh);
    });
    setTimeout(refresh, 100);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", refresh);
      gsap.ticker.remove(tickerUpdate);
      lenisInstance.off("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(scroller, undefined);
      ScrollTrigger.defaults({ scroller: previousScroller } as never);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export function useLenis() {
  const context = useContext(LenisContext);
  return context;
}
