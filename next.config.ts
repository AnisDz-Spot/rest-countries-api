import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   useCache: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
