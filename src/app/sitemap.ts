import type { MetadataRoute } from "next";
import { propertiesPageData, servicesPageData } from "./Data/AppData";
import { getSiteOrigin } from "./lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  const lastMod = new Date();

  const staticPaths = [
    "",
    "/About",
    "/Contact",
    "/Lands",
    "/Properties",
    "/Services",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: lastMod,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const propertyEntries: MetadataRoute.Sitemap = propertiesPageData.map((p) => ({
    url: `${base}/Properties/${p.slug}`,
    lastModified: lastMod,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const serviceEntries: MetadataRoute.Sitemap = servicesPageData.map((s) => ({
    url: `${base}/Services/${s.slug}`,
    lastModified: lastMod,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...propertyEntries, ...serviceEntries];
}
