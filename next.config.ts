import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // This will ignore ESLint errors during builds
  },
  images: {
    domains: ['eisjbifudfazwntogxhy.supabase.co']
  }
};

export default nextConfig;
