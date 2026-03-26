"use client";

import {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";

function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

/** Group inline word spans into visual lines using stable Y positions (not offsetTop). */
function groupWordsByLine(wordEls: HTMLElement[]): string[][] {
  if (wordEls.length === 0) return [];
  const lines: string[][] = [];
  let buf: string[] = [];
  const lineY = (el: HTMLElement) =>
    Math.round(el.getBoundingClientRect().top * 100) / 100;
  let prevY = lineY(wordEls[0]);

  wordEls.forEach((el, i) => {
    const y = lineY(el);
    if (i > 0 && Math.abs(y - prevY) > 1.25) {
      lines.push(buf);
      buf = [];
      prevY = y;
    }
    buf.push((el.textContent ?? "").trim());
  });
  if (buf.length) lines.push(buf);
  return lines;
}

/** Join lines; merge tiny single-word orphans that often come from bad splits. */
function mergeOrphanLines(groups: string[][]): string[][] {
  const merged: string[][] = [];
  for (const parts of groups) {
    const line = parts.join(" ").replace(/\s+/g, " ").trim();
    if (!line) continue;
    const prev = merged[merged.length - 1];
    const singleWord = !line.includes(" ");
    const prevText = prev?.join(" ") ?? "";
    const prevEndsHyphen = /[-–—]\s*$/.test(prevText);
    if (
      prev &&
      (prevEndsHyphen || (singleWord && line.length <= 3))
    ) {
      merged[merged.length - 1] = [...(prev ?? []), ...parts];
    } else {
      merged.push(parts);
    }
  }
  return merged;
}

export interface LineRevealTextProps {
  text: string;
  className?: string;
  /** ms between each line */
  staggerMs?: number;
}

export default function LineRevealText({
  text,
  className = "",
  staggerMs = 55,
}: LineRevealTextProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<number>(0);
  const [lines, setLines] = useState<string[] | null>(null);
  const [layoutTick, setLayoutTick] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const words = splitWords(text);

  useLayoutEffect(() => {
    setReducedMotion(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const measure = useCallback(() => {
    const root = measureRef.current;
    if (!root) return;
    const spans = [...root.querySelectorAll<HTMLElement>("[data-line-word]")];
    if (spans.length === 0) {
      setLines([text.trim().replace(/\s+/g, " ")]);
      return;
    }
    const grouped = mergeOrphanLines(groupWordsByLine(spans));
    setLines(grouped.map((parts) => parts.join(" ").replace(/\s+/g, " ").trim()));
  }, [text]);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      measure();
    });
    return () => cancelAnimationFrame(id);
  }, [measure, layoutTick, text]);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-6% 0px -4% 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion, lines]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w < 1) return;
      const prev = widthRef.current;
      widthRef.current = w;
      if (prev > 0 && Math.abs(w - prev) >= 0.5) {
        setLines(null);
        setLayoutTick((t) => t + 1);
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  if (words.length === 0) {
    return null;
  }

  if (reducedMotion) {
    return (
      <p className={className}>
        {text.trim().replace(/\s+/g, " ")}
      </p>
    );
  }

  const showLines = lines !== null;

  return (
    <div ref={containerRef} className={className}>
      {showLines ? (
        <p className="sr-only">{text.trim().replace(/\s+/g, " ")}</p>
      ) : null}

      {/* Measure pass — full width; same font/leading as final copy */}
      <div
        ref={measureRef}
        className={
          showLines
            ? "sr-only pointer-events-none h-px w-full max-w-full overflow-hidden opacity-0"
            : "w-full max-w-full"
        }
        aria-hidden
      >
        {words.map((w, i) => (
          <span key={`m-${i}-${layoutTick}`} data-line-word className="inline">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </div>

      {showLines && (
        <div className="flex flex-col gap-0" aria-hidden>
          {lines!.map((line, i) => (
            <div
              key={`${layoutTick}-line-${i}`}
              className="overflow-hidden"
              style={{ lineHeight: "inherit" }}
            >
              <span
                className="block font-inherit text-inherit tracking-[inherit]"
                style={{
                  lineHeight: "inherit",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(1.05em)",
                  transition: `opacity 0.55s ease-out ${visible ? i * staggerMs : 0}ms, transform 0.58s cubic-bezier(0.22, 1, 0.36, 1) ${visible ? i * staggerMs : 0}ms`,
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
