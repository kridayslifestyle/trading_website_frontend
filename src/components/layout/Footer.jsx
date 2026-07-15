import Link from "next/link";
import { Globe, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const PRODUCT_LINKS = [
  "Agricultural Products", "Textiles & Apparel",
  "Chemicals & Pharma", "Engineering Goods",
  "Seafood & Marine", "Gems & Jewellery",
];

const COMPANY_LINKS = [
  { label: "About Us",     href: "/about"    },
  { label: "Our Services", href: "/services" },
  { label: "Products",     href: "/products" },
  { label: "Blog",         href: "/blog"     },
  { label: "Contact",      href: "/contact"  },
  { label: "Careers",      href: "/careers"  },
];

// Social icons as simple SVGs to avoid lucide version issues
const SOCIAL = [
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-600 text-lg leading-none text-white">TradePro</div>
                <div className="text-[10px] text-brand-300 tracking-widest uppercase">Global</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Connecting global buyers and suppliers since 2010. Professional import &amp; export services across 80+ countries.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-500 flex items-center justify-center transition-colors duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-600 text-sm uppercase tracking-wider text-white mb-5">
              Products
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((p) => (
                <li key={p}>
                  <Link
                    href="/products"
                    className="text-slate-400 hover:text-brand-300 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-600 text-sm uppercase tracking-wider text-white mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-brand-300 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-600 text-sm uppercase tracking-wider text-white mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm">
                  Flat No. 104, padmaja rajas eclave, Bhagya Nagar Colony, Kukatpally,<br />Hyderabad – 500072, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+917673953622" className="text-slate-400 hover:text-white text-sm transition-colors">
                  +91 76739 53622
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:info@tradeproglobal.com" className="text-slate-400 hover:text-white text-sm transition-colors">
                  info.tradeproglobal@gmail.com
                </a>
              </li>
            </ul>

            {/* Certifications */}
            {/* <div className="mt-6 flex items-center gap-2 flex-wrap">
              {["ISO 9001", "IEC Certified", "FIEO Member"].map((cert) => (
                <span key={cert} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400">
                  {cert}
                </span>
              ))}
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TradePro Global. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-slate-300 transition-colors">Terms of Use</Link>
            <Link href="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}