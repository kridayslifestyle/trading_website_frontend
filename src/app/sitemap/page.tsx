import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/common/Reveal";

export const metadata: Metadata = {
  title: "Sitemap | TradePro Global",
  description: "A complete overview of every page on the TradePro Global website.",
};

const GROUPS = [
  {
    title: "Main Pages",
    icon: "🏠",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Countries We Serve", href: "/countries" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Get a Quote / Inquiry", href: "/inquiry" },
    ],
  },
  {
    title: "Product Categories",
    icon: "📦",
    links: [
      { label: "Agricultural Products", href: "/products" },
      { label: "Textiles & Apparel", href: "/products" },
      { label: "Chemicals & Pharma", href: "/products" },
      { label: "Engineering Goods", href: "/products" },
      { label: "Seafood & Marine", href: "/products" },
      { label: "Gems & Jewellery", href: "/products" },
    ],
  },
  {
    title: "Legal",
    icon: "📄",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div style={{ paddingTop: "80px", background: "#fff", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg,#020e47 0%,#0e37b0 55%,#1a5cf2 100%)",
          padding: "4.5rem 0 3.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 14px",
                  borderRadius: 99,
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.15)",
                  color: "rgba(191,219,254,1)",
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase" as const,
                  marginBottom: "1.25rem",
                }}
              >
                🗺️ Sitemap
              </span>
              <h1
                style={{
                  fontFamily: "'Clash Display',sans-serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "1rem",
                  letterSpacing: "-.025em",
                  lineHeight: 1.1,
                }}
              >
                Find Your Way Around
              </h1>
              <p
                style={{
                  color: "rgba(147,197,253,.9)",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  maxWidth: "540px",
                }}
              >
                Every page on the TradePro Global website, in one place.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom" style={{ padding: "4.5rem 1.25rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "1.5rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <div
                style={{
                  background: "#f8faff",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  height: "100%",
                }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>
                  {group.icon}
                </div>
                <h2
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "1.1rem",
                  }}
                >
                  {group.title}
                </h2>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                  }}
                >
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[.9rem] text-slate-600 hover:text-brand-500 no-underline transition-colors duration-200"
                      >
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}