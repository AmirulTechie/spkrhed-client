import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV === "development";

// Cloudinary is allowed for the hero videos described in CLAUDE.md.
// Vercel Blob (public store "spkrhed-media") hosts the work-page case-study
// videos migrated from the old speakerhead.com site — every public store
// serves from a per-store subdomain of blob.vercel-storage.com, hence the
// wildcard. player.vimeo.com / youtube.com are allowed as frame-src for case
// studies (e.g. Space Whale, HairDreams) that embed the client's existing
// Vimeo/YouTube videos directly rather than a self-hosted file. Widen
// img-src/media-src/connect-src here if more third-party origins are added.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://res.cloudinary.com https://*.public.blob.vercel-storage.com;
  media-src 'self' https://res.cloudinary.com https://*.public.blob.vercel-storage.com;
  font-src 'self' data:;
  connect-src 'self' https://res.cloudinary.com https://*.public.blob.vercel-storage.com https://challenges.cloudflare.com;
  frame-src https://challenges.cloudflare.com https://player.vimeo.com https://www.youtube.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Production deployment configuration */
  reactCompiler: true,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok-free.dev",
    "*.ngrok.io",
    "*.ngrok.app",
    "*.ngrok.dev",
    "192.168.1.101",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      // Prevent search engines from indexing raw asset URLs directly.
      {
        source: "/images/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};
export default nextConfig;