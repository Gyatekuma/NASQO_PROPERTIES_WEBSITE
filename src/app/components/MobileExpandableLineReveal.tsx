"use client";

import { useState, useRef, useLayoutEffect } from "react";
import LineRevealText from "./LineRevealText";

export interface MobileExpandableLineRevealProps {
  text: string;
  className?: string;
}

/**
 * Below `lg`: plain text with line clamp + Show more / Show less when content overflows.
 * `lg` and up: full LineRevealText animation (unchanged from desktop).
 */
export default function MobileExpandableLineReveal({
  text,
  className = "",
}: MobileExpandableLineRevealProps) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [showToggle, setShowToggle] = useState(false);

  const normalized = text.trim().replace(/\s+/g, " ");

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      if (expanded) {
        setShowToggle(true);
        return;
      }
      setShowToggle(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [normalized, expanded]);

  if (!normalized) {
    return null;
  }

  return (
    <>
      <div className="lg:hidden flex flex-col gap-1">
        <p
          ref={contentRef}
          className={`${className} !mb-0 ${expanded ? "" : "line-clamp-6"}`}
        >
          {normalized}
        </p>
        {showToggle && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="font-bricolage font-semibold text-[#4361EE] hover:underline text-base self-start leading-snug"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
      <div className="hidden lg:block">
        <LineRevealText text={text} className={className} />
      </div>
    </>
  );
}
