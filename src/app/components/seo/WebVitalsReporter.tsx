"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Logs Core Web Vitals in development. In production, extend this to send metrics
 * to your analytics endpoint or GA4 (e.g. gtag("event", metric.name, { ... })).
 */
export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      console.debug("[Web Vitals]", metric.name, metric.value, metric.rating);
    }
  });
  return null;
}
