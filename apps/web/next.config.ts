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
    ],
    experimental: {
        staleTimes: {
            dynamic: 0,
            static: 0,
        },
    },
};

export default nextConfig;
