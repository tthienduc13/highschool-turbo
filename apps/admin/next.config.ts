import type { NextConfig } from "next";

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
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dni30h5dy/image/upload/**",
        search: "",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dhdyel6be/image/upload/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
