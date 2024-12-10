import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ["@highschool/ui", "@highschool/endpoints"],
};

export default nextConfig;
