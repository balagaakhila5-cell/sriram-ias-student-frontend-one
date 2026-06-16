import type { NextConfig } from "next";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { API_PROXY_TARGET } from "./src/config/env";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** Dev cache outside OneDrive — avoids slow filesystem / blank-page waits. */
const localDevCache = path.join(os.homedir(), "AppData", "Local", "sriram-ias-next");
const isDevServer = process.argv.includes("dev");
const distDir = isDevServer ? localDevCache : ".next";

/**
 * Backend the API proxy forwards to. Requests from the browser hit this Next
 * server same-origin (see `rewrites` below) and are proxied server-side.
 * Configured via `.env.uat` / `.env.production` (see src/config/env.ts).
 */
const apiProxyTarget = API_PROXY_TARGET;

const nextConfig: NextConfig = {
  distDir,
  /** Avoid /path <-> /path/ redirect loops on App Router routes */
  skipTrailingSlashRedirect: true,

  async rewrites() {
    if (!apiProxyTarget) return [];
    const proxy = (prefix: string) => ({
      source: `${prefix}/:path*`,
      destination: `${apiProxyTarget}${prefix}/:path*`,
    });
    return [
      proxy("/api/auth"),
      proxy("/api/portal"),
      proxy("/api/enquiries"),
      // Public sources for the enquiry form dropdowns (centers / categories / courses).
      proxy("/api/centers"),
      proxy("/api/categories"),
      proxy("/api/courses"),
    ];
  },
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