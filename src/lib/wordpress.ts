// ─────────────────────────────────────────────────────────
// WordPress API Integration
// Fetches products (WooCommerce) and blog posts (WP REST API)
// ─────────────────────────────────────────────────────────

const WP_API  = process.env.NEXT_PUBLIC_WP_API  || "https://yourdomain.com/wp-json/wp/v2";
const WC_URL  = process.env.NEXT_PUBLIC_WC_URL  || "https://yourdomain.com/wp-json/wc/v3";
const WC_KEY  = process.env.NEXT_PUBLIC_WC_KEY  || "";
const WC_SEC  = process.env.NEXT_PUBLIC_WC_SECRET || "";

// ── Types ────────────────────────────────────────────────
export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  featured_media: number;
  categories: number[];
  _embedded?: any;
}

export interface WPProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  images: { src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  attributes: { name: string; options: string[] }[];
  meta_data: { key: string; value: string }[];
  stock_status: string;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// ── Helper ───────────────────────────────────────────────
async function wpFetch<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 }, // cache 1 hour
    });
    if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("WP API fetch failed:", err);
    return [] as unknown as T;
  }
}

// WooCommerce needs Basic Auth
function wcHeaders() {
  const creds = btoa(`${WC_KEY}:${WC_SEC}`);
  return { Authorization: `Basic ${creds}` };
}

// ── Blog Posts ───────────────────────────────────────────

export async function getBlogPosts(perPage = 12): Promise<WPPost[]> {
  return wpFetch<WPPost[]>(
    `${WP_API}/posts?per_page=${perPage}&_embed=1&status=publish`
  );
}

export async function getBlogPost(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>(
    `${WP_API}/posts?slug=${slug}&_embed=1`
  );
  return posts?.[0] || null;
}

export async function getBlogCategories(): Promise<WPCategory[]> {
  return wpFetch<WPCategory[]>(`${WP_API}/categories?per_page=20`);
}

// ── WooCommerce Products ─────────────────────────────────

export async function getProducts(perPage = 20, category?: string): Promise<WPProduct[]> {
  let url = `${WC_URL}/products?per_page=${perPage}&status=publish`;
  if (category) url += `&category=${category}`;

  try {
    const res = await fetch(url, {
      headers: wcHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`WooCommerce error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("WooCommerce fetch failed:", err);
    return [];
  }
}

export async function getProduct(slug: string): Promise<WPProduct | null> {
  try {
    const res = await fetch(`${WC_URL}/products?slug=${slug}`, {
      headers: wcHeaders(),
    });
    const products = await res.json();
    return products?.[0] || null;
  } catch {
    return null;
  }
}

export async function getProductCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(`${WC_URL}/products/categories?per_page=20`, {
      headers: wcHeaders(),
    });
    return res.json();
  } catch {
    return [];
  }
}

// ── Helper: strip HTML tags from WP content ──────────────
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

// ── Helper: format WP date ───────────────────────────────
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

// ── Helper: get featured image URL ──────────────────────
export function getFeaturedImage(post: WPPost): string {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/placeholder.jpg";
}

// ── Helper: get product meta value ──────────────────────
export function getProductMeta(product: WPProduct, key: string): string {
  return product.meta_data?.find(m => m.key === key)?.value || "";
}