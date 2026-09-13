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
      {
        source: "/resources/:slug",
        destination: "/resources",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
