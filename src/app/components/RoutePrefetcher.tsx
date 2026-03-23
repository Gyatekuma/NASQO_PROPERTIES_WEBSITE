"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { propertiesPageData, servicesPageData } from "../Data/AppData";

const STATIC_ROUTES = ["/", "/About", "/Services", "/Properties", "/Contact"];

export default function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    const prefetchAll = () => {
      STATIC_ROUTES.forEach((route) => router.prefetch(route));
      propertiesPageData.forEach((p) =>
        router.prefetch(`/Properties/${p.slug}`)
      );
      servicesPageData.forEach((s) =>
        router.prefetch(`/Services/${s.slug}`)
      );
    };

    const id = setTimeout(prefetchAll, 2000);
    return () => clearTimeout(id);
  }, [router]);

  return null;
}
