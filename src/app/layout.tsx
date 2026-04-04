import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Mona_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { LenisProvider } from "./components/providers/LenisProvider";
import CallToActionWrapper from "./components/CallToActionWrapper";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import RoutePrefetcher from "./components/RoutePrefetcher";
import ScrollRevealInit from "./components/ScrollRevealInit";
import JsonLd from "./components/seo/JsonLd";
import GoogleAnalytics from "./components/seo/GoogleAnalytics";
import WebVitalsReporter from "./components/seo/WebVitalsReporter";
import { SITE, absoluteUrl, getMetadataBase } from "./lib/seo/site-config";
import { organizationSchema, websiteSchema } from "./lib/seo/jsonld";
import { homeKeywords } from "./lib/seo/page-keywords";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
  preload: true,
});
const monaSans = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-mona",
  display: "swap",
  preload: true,
});

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: {
    default: SITE.defaultTitle,
    template: `${SITE.name} | %s`,
  },
  description: SITE.defaultDescription,
  keywords: [...homeKeywords],
  authors: [{ name: SITE.name, url: getMetadataBase().toString() }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [
      {
        url: absoluteUrl(SITE.defaultOgImagePath),
        width: 1200,
        height: 630,
        alt: `${SITE.name} — featured property imagery`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [absoluteUrl(SITE.defaultOgImagePath)],
    ...(SITE.twitterSite ? { site: SITE.twitterSite, creator: SITE.twitterSite } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#191723",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${monaSans.variable} antialiased`}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {gaId ? <GoogleAnalytics measurementId={gaId} /> : null}
        <LenisProvider>
          <WebVitalsReporter />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-neutral-900 focus:shadow-lg"
          >
            Skip to main content
          </a>
          <ScrollRevealInit />
          <RoutePrefetcher />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <CallToActionWrapper />
          <Footer />
          <WhatsAppFloatingButton />
        </LenisProvider>
      </body>
    </html>
  );
}
