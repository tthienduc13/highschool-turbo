import type { NextConfig } from "next";

import "./src/env.ts";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    "@highschool/ui",
    "@highschool/endpoints",
    "@highschool/types",
    "@highschool/hooks",
    "@highschool/env",
    "@highschool/react-query",
    "@highschool/lib",
    "@highschool/components",
  ],
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "hinowahimedesu-bucket.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "**/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
