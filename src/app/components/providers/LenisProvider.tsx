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

const LenisContext = createContext<InstanceType<typeof Lenis> | null>(null);

const getLenisOptions = (): LenisOptions => {
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return {
    autoRaf: true,
    lerp: prefersReducedMotion ? 1 : 0.08,
    smoothWheel: !prefersReducedMotion,
    wheelMultiplier: 1.1,
    touchMultiplier: 1.5,
    syncTouch: true,
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
    const lenisInstance = new Lenis({
      ...getLenisOptions(),
      ...optionsRef.current,
    });

    setLenis(lenisInstance);

    return () => {
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
