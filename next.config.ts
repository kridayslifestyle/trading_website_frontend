/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── During development: keep this commented out ───
  // ─── When ready to deploy: uncomment output: "export" ───
  // output: "export",

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