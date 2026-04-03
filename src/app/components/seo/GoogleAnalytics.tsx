"use client";

import Script from "next/script";

/** Loads GA4 when NEXT_PUBLIC_GA_MEASUREMENT_ID is set (e.g. G-XXXXXXXXXX). */
export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
