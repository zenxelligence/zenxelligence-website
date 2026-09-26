import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/services/consulting", destination: "/services", permanent: true },
      { source: "/services/implementation", destination: "/services", permanent: true },
      { source: "/services/managed-services", destination: "/services", permanent: true },
      { source: "/services/support", destination: "/services", permanent: true },
      { source: "/products/pulse", destination: "/products", permanent: true },
      { source: "/case-studies/014", destination: "/case-studies", permanent: true },
      { source: "/case-studies/031", destination: "/case-studies", permanent: true },
      { source: "/case-studies/039", destination: "/case-studies", permanent: true },
      { source: "/clients", destination: "/case-studies", permanent: true },
      { source: "/partners", destination: "/about", permanent: true },
      { source: "/machine-lens", destination: "/", permanent: true },
    ];
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
