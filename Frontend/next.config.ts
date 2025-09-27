// next.config.js or next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: false,
  images: {
    domains: ["api.bidzy.com", "localhost","example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7194",
        pathname: "/Image/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/Image/:path*",
        destination: process.env.NEXT_PUBLIC_BASE_URL! + "/Image/:path*",
      },
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_BASE_URL! + "/api/:path*",
      },
      {
        source: "/ws/:path*",
        destination: process.env.NEXT_PUBLIC_BASE_URL! + "/ws/:path*",
      },
    ];
  },
};

export default nextConfig;
