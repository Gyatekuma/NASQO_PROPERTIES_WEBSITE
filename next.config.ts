import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  async redirects() {
    return [{ source: "/favicon.ico", destination: "/favicon.png", permanent: true }];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap"],
  },
  images: {
    formats: ["image/webp"],
    qualities: [60, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/Main_Assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/PropertiesAssets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/HomeAssets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
