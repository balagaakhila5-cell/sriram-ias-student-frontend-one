import type { NextConfig } from "next";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** Dev cache outside OneDrive — avoids slow filesystem / blank-page waits. */
const localDevCache = path.join(os.homedir(), "AppData", "Local", "sriram-ias-next");
const isDevServer = process.argv.includes("dev");
const distDir = isDevServer ? localDevCache : ".next";

const nextConfig: NextConfig = {
  distDir,
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