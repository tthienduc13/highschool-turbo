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
    ],
};

export default nextConfig;
