import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** Avoid /path <-> /path/ redirect loops on App Router routes */
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: projectRoot,
  },
  // ✅ For Vercel deployment, do NOT use output: 'export'
  // output: 'export',

  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react"],
  },

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