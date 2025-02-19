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
};

export default nextConfig;
