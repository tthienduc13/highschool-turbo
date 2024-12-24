import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.wikia.nocookie.net", "res.cloudinary.com"],
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
      }
    ],
  },
};

export default nextConfig;
