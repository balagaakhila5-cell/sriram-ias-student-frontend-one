import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ REQUIRED for Hostinger (static export)
  output: 'export',

  // ⚠️ IMPORTANT: Next/Image doesn't work in static export unless unoptimized
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
