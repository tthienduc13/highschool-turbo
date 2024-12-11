import type { NextConfig } from "next";
import "./src/env.mjs";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: [
        "@highschool/ui",
        "@highschool/endpoints",
        "@highschool/types",
        "@highschool/hooks",
    ],
};

export default nextConfig;
