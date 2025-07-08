import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ ini penting!
  },
  typescript: {
    ignoreBuildErrors: true, // ⬅️ jika pakai TS
  },
};

export default nextConfig;
