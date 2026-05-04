import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ For Vercel deployment, do NOT use output: 'export'
  // output: 'export',

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;