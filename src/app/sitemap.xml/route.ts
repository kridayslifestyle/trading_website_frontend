import { NextResponse } from "next/server";
import { pool, ensureProductsTable, ensureBlogsTable } from "@/lib/db";

const SITE_URL = "https://tradeproglobal.com";

interface UrlEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

const STATIC_ROUTES: Array<{
  path: string;
  changefreq: string;
  priority: number;
}> = [
  { path: "", changefreq: "weekly", priority: 1 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
  { path: "/services", changefreq: "monthly", priority: 0.7 },
  { path: "/products", changefreq: "weekly", priority: 0.9 },
  { path: "/countries", changefreq: "monthly", priority: 0.6 },
  { path: "/blog", changefreq: "weekly", priority: 0.7 },
  { path: "/careers", changefreq: "monthly", priority: 0.5 },
  { path: "/contact", changefreq: "yearly", priority: 0.6 },
  { path: "/inquiry", changefreq: "yearly", priority: 0.6 },
  { path: "/privacy", changefreq: "yearly", priority: 0.3 },
  { path: "/terms", changefreq: "yearly", priority: 0.3 },
  { path: "/sitemap", changefreq: "yearly", priority: 0.3 },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildXml(entries: UrlEntry[]): string {
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET() {
  const now = new Date().toISOString();

  const entries: UrlEntry[] = STATIC_ROUTES.map((route) => ({
    loc: `${SITE_URL}${route.path}`,
    lastmod: now,
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  // Dynamic entries are best-effort — if the database is unreachable
  // (e.g. DATABASE_URL not configured in this environment), fall back
  // to just the static routes rather than failing the whole sitemap.
  try {
    await ensureProductsTable();
    const products = await pool.query(
      `SELECT slug, updated_at FROM products WHERE published = true ORDER BY updated_at DESC`,
    );
    for (const p of products.rows as { slug: string; updated_at: string }[]) {
      entries.push({
        loc: `${SITE_URL}/products/${p.slug}`,
        lastmod: p.updated_at ? new Date(p.updated_at).toISOString() : now,
        changefreq: "weekly",
        priority: 0.8,
      });
    }
  } catch (err) {
    console.error("[sitemap.xml] Failed to load products:", err);
  }

  try {
    await ensureBlogsTable();
    const blogs = await pool.query(
      `SELECT slug, updated_at FROM blogs WHERE status='Published' ORDER BY updated_at DESC`,
    );
    for (const b of blogs.rows as { slug: string; updated_at: string }[]) {
      entries.push({
        loc: `${SITE_URL}/blog/${b.slug}`,
        lastmod: b.updated_at ? new Date(b.updated_at).toISOString() : now,
        changefreq: "monthly",
        priority: 0.6,
      });
    }
  } catch (err) {
    console.error("[sitemap.xml] Failed to load blog posts:", err);
  }

  return new NextResponse(buildXml(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}