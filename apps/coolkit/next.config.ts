import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: [
      "@highschool/ui",
      "@highschool/endpoints",
      "@highschool/types",
      "@highschool/hooks",
      "@highschool/env",
      "@highschool/react-query",
      "@highschool/lib",
    ],
  images: {
    domains: [
      "static.wikia.nocookie.net",
      "res.cloudinary.com",
      "play-lh.googleusercontent.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
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
    ],
  },
};

export default nextConfig;
