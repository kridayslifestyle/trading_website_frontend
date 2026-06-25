/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: Do NOT enable `output: "export"` here.
  // This project uses Route Handlers (src/app/api/leads) that read
  // the request body (POST/PATCH) for lead capture, email, and
  // Telegram notifications. Those are unsupported in static export
  // mode (https://nextjs.org/docs/app/guides/static-exports#route-handlers).
  // Deploy this as a regular Next.js server app (Vercel, Railway,
  // Render, etc.) — not as a static export.

  images: {
    unoptimized: true,
  },

  // ─── Leave empty during development ───
  // ─── When you get domain, add it here ───
  // basePath: "",
  // trailingSlash: true,

  env: {
    // ─── Development: uses localhost ───
    // ─── Production: replace with real domain ───
    NEXT_PUBLIC_WP_URL:    process.env.NEXT_PUBLIC_WP_URL    || "",
    NEXT_PUBLIC_WP_API:    process.env.NEXT_PUBLIC_WP_API    || "",
    NEXT_PUBLIC_WA_NUMBER: process.env.NEXT_PUBLIC_WA_NUMBER || "919000000000",
    NEXT_PUBLIC_SITE_URL:  process.env.NEXT_PUBLIC_SITE_URL  || "http://localhost:3000",
    NEXT_PUBLIC_FORM_API:  process.env.NEXT_PUBLIC_FORM_API  || "",
  },
};

module.exports = nextConfig;