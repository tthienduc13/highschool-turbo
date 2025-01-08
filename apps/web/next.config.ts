import type { NextConfig } from "next";

import "./src/env.mjs";

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
    "@highschool/components"
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
