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
    remotePatterns: [
        {
            protocol: "https",
            hostname: "res.cloudinary.com",
            pathname: "/**",
          },
          {
            protocol: "http",
            hostname: "res.cloudinary.com",
            pathname: "/**",
          },{
            protocol: "https",
            hostname:"avatar.iran.liara.run",
            pathname: "/**",
          }
    ],
  },
};

export default nextConfig;
