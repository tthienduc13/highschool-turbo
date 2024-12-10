import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: [
        "@highschool/ui",
        "@highschool/endpoints",
        "@highschool/types",
        "@highschool/hooks",
    ],
};

export default nextConfig;
