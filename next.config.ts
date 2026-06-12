import type { NextConfig } from "next";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** Dev cache outside OneDrive — avoids slow filesystem / blank-page waits. */
const localDevCache = path.join(os.homedir(), "AppData", "Local", "sriram-ias-next");
const isDevServer = process.argv.includes("dev");
const distDir = isDevServer ? localDevCache : ".next";

/**
 * Backend the API proxy forwards to. Requests from the browser hit this Next
 * server same-origin (see `rewrites` below) and are proxied server-side, which
 * sidesteps browser CORS entirely. Override with API_PROXY_TARGET if needed.
 */
const apiProxyTarget =
  process.env.API_PROXY_TARGET ?? process.env.NEXT_PUBLIC_API_URL;

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